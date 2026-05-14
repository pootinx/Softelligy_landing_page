const admin = require("firebase-admin");
const serviceAccount = require("../syndic-website-firebase-adminsdk-fbsvc-8e30630536.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function seed() {
  const timestamp = admin.firestore.FieldValue.serverTimestamp();

  // ── Pages ──
  const pages = {
    home: {
      name: "Home",
      sections: {
        hero: {
          title: "Welcome to Syndic",
          subtitle: "Professional property management solutions for modern buildings",
          backgroundImage: "",
        },
        about: {
          title: "About Us",
          content: "Syndic is a leading property management company dedicated to providing transparent, efficient, and modern management solutions for residential and commercial properties.",
          image: "",
        },
        services: {
          title: "Our Services",
          items: [
            { title: "Property Management", description: "Full-service property management tailored to your needs" },
            { title: "Financial Oversight", description: "Transparent budgeting, accounting, and financial reporting" },
            { title: "Maintenance Coordination", description: "24/7 maintenance request handling and vendor coordination" },
          ],
        },
        stats: {
          title: "By the Numbers",
          buildings: "150+",
          residents: "5000+",
          years: "10+",
          satisfaction: "98%",
        },
      },
      lastUpdated: timestamp,
    },
    about: {
      name: "About",
      sections: {
        intro: {
          title: "Our Story",
          content: "Founded with a vision to transform property management through technology and transparency.",
          image: "",
        },
        mission: {
          title: "Our Mission",
          content: "To provide exceptional property management services that enhance property values and resident satisfaction.",
        },
        team: {
          title: "Our Team",
          members: [
            { name: "Ahmed Benali", role: "CEO & Founder", image: "" },
            { name: "Sara El Fassi", role: "Operations Director", image: "" },
            { name: "Youssef Idrissi", role: "Technical Lead", image: "" },
          ],
        },
      },
      lastUpdated: timestamp,
    },
    services: {
      name: "Services",
      sections: {
        overview: {
          title: "Our Services",
          content: "Comprehensive property management solutions designed for modern buildings.",
        },
        categories: {
          items: [
            { title: "Residential Management", description: "Complete management for residential buildings and complexes", icon: "" },
            { title: "Commercial Management", description: "Professional management for office buildings and retail spaces", icon: "" },
            { title: "Financial Management", description: "Budgeting, accounting, and financial reporting services", icon: "" },
            { title: "Technical Maintenance", description: "Preventive and corrective maintenance services", icon: "" },
          ],
        },
      },
      lastUpdated: timestamp,
    },
    contact: {
      name: "Contact",
      sections: {
        header: {
          title: "Get in Touch",
          subtitle: "We'd love to hear from you",
        },
        info: {
          address: "Casablanca, Morocco",
          phone: "+212 XXX XXX XXX",
          email: "contact@syndic.com",
        },
      },
      lastUpdated: timestamp,
    },
  };

  console.log("Seeding pages...");
  for (const [id, data] of Object.entries(pages)) {
    await db.collection("pages").doc(id).set(data);
    console.log(`  ✓ Page: ${id}`);
  }

  // ── Content Blocks ──
  const contentBlocks = [
    { key: "company-phone", value: "+212 XXX XXX XXX", type: "text" },
    { key: "company-email", value: "contact@syndic.com", type: "email" },
    { key: "company-address", value: "Casablanca, Morocco", type: "text" },
    { key: "footer-copyright", value: "© 2024 Syndic. All rights reserved.", type: "text" },
    { key: "social-facebook", value: "https://facebook.com/syndic", type: "url" },
    { key: "social-linkedin", value: "https://linkedin.com/company/syndic", type: "url" },
  ];

  console.log("Seeding content blocks...");
  for (const block of contentBlocks) {
    await db.collection("content").add({ ...block, lastUpdated: timestamp });
    console.log(`  ✓ ${block.key}`);
  }

  console.log("\n✅ Seed complete! Collections created:");
  console.log("  - pages (4 documents: home, about, services, contact)");
  console.log("  - content (6 documents)");
  console.log("  - images (empty - upload via admin panel)");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
