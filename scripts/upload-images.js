const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const serviceAccount = require("../syndic-website-firebase-adminsdk-fbsvc-8e30630536.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const bucket = admin.storage().bucket("syndic-website.firebasestorage.app");
const db = admin.firestore();

const PUBLIC_DIR = path.join(__dirname, "..", "public");

function walkDir(dir, basePath = "") {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath, relativePath));
    } else if (/\.(jpg|jpeg|png|webp|svg|ico)$/i.test(entry.name)) {
      results.push({ fullPath, relativePath });
    }
  }
  return results;
}

async function uploadImages() {
  const images = walkDir(PUBLIC_DIR);
  console.log(`Found ${images.length} images to upload...\n`);

  for (const img of images) {
    const destPath = `images/${img.relativePath}`;
    console.log(`Uploading: ${img.relativePath}`);

    try {
      // Check if already exists
      const [exists] = await bucket.file(destPath).exists();
      if (exists) {
        console.log(`  ✓ Already exists, skipping`);
        continue;
      }

      await bucket.upload(img.fullPath, {
        destination: destPath,
        metadata: {
          contentType: `image/${path.extname(img.fullPath).slice(1)}`,
        },
      });

      // Make public
      await bucket.file(destPath).makePublic();

      const url = `https://storage.googleapis.com/syndic-website.firebasestorage.app/${destPath}`;

      // Save metadata to Firestore
      await db.collection("images").add({
        name: img.relativePath,
        url,
        size: fs.statSync(img.fullPath).size,
        type: `image/${path.extname(img.fullPath).slice(1)}`,
        uploadedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`  ✓ Uploaded: ${url}`);
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
    }
  }

  console.log("\n✅ All images uploaded!");
}

uploadImages().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
