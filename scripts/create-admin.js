const admin = require("firebase-admin");
const readline = require("readline");
const serviceAccount = require("../syndic-website-firebase-adminsdk-fbsvc-8e30630536.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function createAdmin() {
  console.log("\n=== Create Admin User ===\n");

  const email = await ask("Email: ");
  const password = await ask("Password (min 6 chars): ");

  if (!email || !password) {
    console.log("Email and password are required.");
    rl.close();
    return;
  }

  if (password.length < 6) {
    console.log("Password must be at least 6 characters.");
    rl.close();
    return;
  }

  try {
    const user = await admin.auth().createUser({
      email,
      password,
      emailVerified: true,
    });
    console.log(`\n✓ Admin user created: ${user.email} (${user.uid})`);
    console.log("\nYou can now log in at http://localhost:3000/admin/login");
  } catch (err) {
    if (err.code === "auth/email-already-exists") {
      console.log("User already exists. Try logging in.");
    } else {
      console.error("Failed to create user:", err.message);
    }
  }

  rl.close();
}

createAdmin();
