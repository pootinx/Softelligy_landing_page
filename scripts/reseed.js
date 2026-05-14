const admin = require("firebase-admin");
const serviceAccount = require("../syndic-website-firebase-adminsdk-fbsvc-8e30630536.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();
const BUCKET_URL = "https://storage.googleapis.com/syndic-website.firebasestorage.app/images";

async function reseed() {
  // ── Clear existing data ──
  console.log("Clearing existing data...");
  const collections = ["pages", "content"];
  for (const col of collections) {
    const snap = await db.collection(col).get();
    const deletions = snap.docs.map((d) => d.ref.delete());
    await Promise.all(deletions);
    console.log(`  ✓ Cleared ${col}`);
  }

  // ── Pages ──
  const pages = {
    home: {
      name: "Home",
      sections: {
        hero: {
          tagline: "Pilotez votre immeuble en toute sérénité",
          titlePrefix: "La gestion de copropriété",
          titleSuffix: "enfin simplifiée",
          description: "Une plateforme moderne qui connecte syndics, conseils syndicaux et copropriétaires pour une gestion immobilière transparente et efficace.",
          backgroundImage: `${BUCKET_URL}/hero-bg.png`,
        },
        stats: {
          projects: "200+",
          projectsLabel: "Projets",
          projectsSub: "Certifiés",
          buildings: "150+",
          buildingsLabel: "Bâtiments",
          buildingsSub: "Gérés",
          residents: "5,000+",
          residentsLabel: "Résidents",
          residentsSub: "Actifs",
          satisfaction: "98%",
          satisfactionLabel: "Satisfaction",
          satisfactionSub: "Clients",
        },
        syndicFlow: {
          steps: [
            {
              title: "Gestion Financière",
              desc: "Budgetisation transparente, comptabilité et reporting financier pour votre copropriété.",
              icon: "HandCoins",
            },
            {
              title: "Maintenance & Travaux",
              desc: "Coordination des réparations et travaux avec suivi en temps réel.",
              icon: "Hammer",
            },
            {
              title: "Communication",
              desc: "Plateforme de communication centralisée entre syndics et copropriétaires.",
              icon: "Megaphone",
            },
            {
              title: "Reporting & Analyse",
              desc: "Tableaux de bord et rapports détaillés sur la performance de votre immeuble.",
              icon: "BarChart3",
            },
          ],
        },
        staff: {
          badge: "Nos Équipes",
          titlePrefix: "Des professionnels",
          titleSuffix: "à votre service",
          description: "Une équipe dédiée et qualifiée pour assurer la gestion quotidienne de votre copropriété.",
          members: [
            { key: "security", title: "Agent de Sécurité", desc: "Surveillance 24h/24 et 7j/7", image: `${BUCKET_URL}/Staff/security_guarde.png` },
            { key: "cleaning", title: "Personnel d'Entretien", desc: "Nettoyage professionnel régulier", image: `${BUCKET_URL}/Staff/cleaning_women.png` },
            { key: "camera", title: "Technicien Vidéo", desc: "Installation et maintenance CCTV", image: `${BUCKET_URL}/Staff/camera_technicien.png` },
            { key: "elevator", title: "Technicien Ascenseur", desc: "Maintenance des équipements", image: `${BUCKET_URL}/Staff/elevator_technicien.png` },
          ],
        },
        cities: {
          badge: "Villes Actives",
          titlePrefix: "Présents dans les",
          titleSuffix: "grandes villes",
          description: "Nous couvrons les principales villes du Maroc pour être proches de nos clients.",
          list: [
            { key: "beniMellal", name: "Béni Mellal", image: `${BUCKET_URL}/residences/Residence1.jpg` },
            { key: "temara", name: "Témara", image: `${BUCKET_URL}/residences/Residence2.png` },
            { key: "casablanca", name: "Casablanca", image: `${BUCKET_URL}/residences/Residence3.jpg` },
            { key: "marrakech", name: "Marrakech", image: `${BUCKET_URL}/residences/Residence4.jpg` },
          ],
        },
        platform: {
          badge: "Plateforme",
          titlePrefix: "Une plateforme",
          titleSuffix: "tout-en-un",
          description: "Gérez l'ensemble de votre copropriété depuis une interface unique, moderne et intuitive.",
          features: [
            { title: "Interface Moderne", desc: "Design épuré et intuitif pour une prise en main rapide." },
            { title: "Sécurité & Conformité", desc: "Données sécurisées et conformes à la loi 18-00." },
            { title: "Base de Données", desc: "Tous vos documents et historiques centralisés." },
          ],
        },
      },
      lastUpdated: timestamp,
    },
    about: {
      name: "About",
      sections: {
        intro: {
          title: "Notre Histoire",
          content: "Fondée avec la vision de transformer la gestion immobilière grâce à la technologie et la transparence.",
          image: `${BUCKET_URL}/logo-horizontal-dark.png`,
        },
        mission: {
          title: "Notre Mission",
          content: "Fournir des services de gestion immobilière exceptionnels qui améliorent la valeur des biens et la satisfaction des résidents.",
        },
      },
      lastUpdated: timestamp,
    },
  };

  console.log("\nSeeding pages...");
  for (const [id, data] of Object.entries(pages)) {
    await db.collection("pages").doc(id).set(data);
    console.log(`  ✓ Page: ${id}`);
  }

  // ── Content Blocks ──
  const contentBlocks = [
    { key: "company-phone", value: "+212 670 977 483", type: "text" },
    { key: "company-phone-2", value: "+212 682 086 521", type: "text" },
    { key: "company-email", value: "contact@softelligy.com", type: "email" },
    { key: "company-address", value: "Casablanca, Morocco", type: "text" },
    { key: "footer-copyright", value: "SOFTELIGY. ALL RIGHTS RESERVED.", type: "text" },
    { key: "social-facebook", value: "https://facebook.com/softelligy", type: "url" },
    { key: "social-linkedin", value: "https://linkedin.com/company/softelligy", type: "url" },
  ];

  console.log("Seeding content blocks...");
  for (const block of contentBlocks) {
    await db.collection("content").add({ ...block, lastUpdated: timestamp });
    console.log(`  ✓ ${block.key}`);
  }

  console.log("\n✅ Reseed complete!");
  console.log("  - pages: home, about");
  console.log(`  - content: ${contentBlocks.length} blocks`);
}

reseed().catch((err) => {
  console.error("Reseed failed:", err);
  process.exit(1);
});
