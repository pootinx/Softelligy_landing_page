// mockData.ts
export interface Residence {
  id: string;
  name: string;
  address: string;
  apartments: number;
  status: "active" | "maintenance" | "onboarding";
  statusTextFr: string;
  statusTextAr: string;
  satisfaction: number;
  yearJoined: number;
  image: string;
  descriptionFr: string;
  descriptionAr: string;
  images: string[]; // 5 images 
}

export interface Review {
  id: string;
  name: string;
  role: string;
  date: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface CityDetails {
  key: string;
  titleFr: string;
  titleAr: string;
  descriptionFr: string;
  descriptionAr: string;
  managerName: string;
  managerTitleFr: string;
  managerTitleAr: string;
  managerAvatar: string;
  residencesCount: number;
  satisfactionRate: number;
  avgResponseTimeFr: string;
  avgResponseTimeAr: string;
  residences: Residence[];
  reviews: Review[];
}

export const citiesDetailData: Record<string, CityDetails> = {
  beniMellal: {
    key: "beniMellal",
    titleFr: "Gestion de Copropriétés à Béni Mellal",
    titleAr: "تدبير الملكية المشتركة ببني ملال",
    descriptionFr: "Notre équipe locale à Béni Mellal assure une gestion de proximité pour préserver la valeur de votre patrimoine immobilier au pied du Moyen Atlas.",
    descriptionAr: "يضمن فريقنا المحلي في بني ملال إدارة قرب للحفاظ على قيمة ممتلكاتكم العقارية عند سفح الأطلس المتوسط.",
    managerName: "Karim Bennani",
    managerTitleFr: "Directeur Régional - Béni Mellal",
    managerTitleAr: "المدير الجهوي - بني ملال",
    managerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    residencesCount: 12,
    satisfactionRate: 98,
    avgResponseTimeFr: "15 minutes",
    avgResponseTimeAr: "15 دقيقة",
    residences: [
      {
        id: "tassemit",
        name: "Résidence Tassemit",
        address: "Avenue Hassan II, Béni Mellal",
        apartments: 24,
        status: "active",
        statusTextFr: "Gérée - Conforme",
        statusTextAr: "مسيّرة - مطابقة",
        satisfaction: 99,
        yearJoined: 2023,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
        descriptionFr: "Située en plein centre-ville, la Résidence Tassemit bénéficie d'une gestion moderne et rigoureuse. Notre syndic y assure l'entretien quotidien de la cage d'escalier, la surveillance continue et le contrôle régulier des équipements techniques.",
        descriptionAr: "تقع إقامة تاسميت في وسط المدينة، وتستفيد من إدارة حديثة وصارمة. يضمن السنديك الصيانة اليومية ومراقبة المعدات التقنية.",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", // Facade
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80", // Lobby
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80", // Garden
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80", // Security
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80"  // Elevator
        ]
      },
      {
        id: "oumerrbia",
        name: "Résidence Oum Er-Rbia",
        address: "Quartier Al Adarissa, Béni Mellal",
        apartments: 32,
        status: "active",
        statusTextFr: "Gérée - Conforme",
        statusTextAr: "مسيّرة - مطابقة",
        satisfaction: 97,
        yearJoined: 2024,
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80",
        descriptionFr: "La Résidence Oum Er-Rbia offre un cadre de vie calme et agréable. La gestion de notre syndic comprend le nettoyage professionnel, la maintenance du système d'alimentation en eau potable et l'éclairage basse consommation.",
        descriptionAr: "توفر إقامة أم الربيع بيئة معيشية هادئة. تشمل إدارة السنديك التنظيف المهني وصيانة نظام إمداد المياه والإنارة الاقتصادية.",
        images: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        id: "jbelrgb",
        name: "Résidence Jbel Rgb",
        address: "Route de Ain Asserdoun, Béni Mellal",
        apartments: 18,
        status: "maintenance",
        statusTextFr: "Maintenance des façades",
        statusTextAr: "صيانة الواجهات",
        satisfaction: 98,
        yearJoined: 2025,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
        descriptionFr: "Actuellement en phase de rénovation des façades extérieures, la Résidence Jbel Rgb bénéficie d'un suivi de chantier rigoureux par nos ingénieurs syndic afin de garantir la qualité des prestations.",
        descriptionAr: "تستفيد إقامة جبل ركب حاليًا من مرحلة تجديد الواجهات الخارجية بمتابعة دقيقة من طرف مهندسي السنديك لضمان جودة الأشغال.",
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80"
        ]
      }
    ],
    reviews: [
      {
        id: "bm1",
        name: "Mohammed A.",
        role: "Copropriétaire - Résidence Tassemit",
        date: "Mai 2026",
        comment: "Excellent service ! Depuis la reprise par ce syndic, la propreté est irréprochable et la sécurité est garantie 24h/24. Très bon suivi des travaux de peinture.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
      },
      {
        id: "bm2",
        name: "Fatim-Zahra L.",
        role: "Membre du Conseil Syndical",
        date: "Mars 2026",
        comment: "La transparence financière est ce que nous apprécions le plus. Les budgets sont clairs et détaillés sur notre espace en ligne. Bravo à toute l'équipe.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
      }
    ]
  },
  temara: {
    key: "temara",
    titleFr: "Gestion de Copropriétés à Témara",
    titleAr: "تدبير الملكية المشتركة بتمارة والهرهورة",
    descriptionFr: "Une gestion rigoureuse et réactive pour vos résidences balnéaires et urbaines à Témara. Nous assurons un entretien de haut standing.",
    descriptionAr: "تدبير صارم وسريع الاستجابة لإقاماتكم الشاطئية والحضرية في تمارة. نحن نضمن صيانة عالية الجودة.",
    managerName: "Amine Slaoui",
    managerTitleFr: "Directeur Régional - Témara",
    managerTitleAr: "المدير الجهوي - تمارة",
    managerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    residencesCount: 24,
    satisfactionRate: 95,
    avgResponseTimeFr: "10 minutes",
    avgResponseTimeAr: "10 دقائق",
    residences: [
      {
        id: "valdor",
        name: "Résidence Val d'Or",
        address: "Boulevard de la Plage, Harhoura",
        apartments: 40,
        status: "active",
        statusTextFr: "Gérée - Conforme",
        statusTextAr: "مسيّرة - مطابقة",
        satisfaction: 96,
        yearJoined: 2022,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        descriptionFr: "La Résidence Val d'Or, située en front de mer à Harhoura, dispose d'un entretien de haut standing. Les équipes de nettoyage et de jardinage maintiennent les extérieurs et la piscine en état impeccable toute l'année.",
        descriptionAr: "تتميز إقامة فال دور الواقعة على البحر في الهرهورة بصيانة رفيعة المستوى. تحافظ فرق النظافة والبستنة على المظهر الخارجي وحمام السباحة في حالة ممتازة.",
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        id: "alwifaq",
        name: "Résidence Al Wifaq",
        address: "Quartier Wifaq, Témara",
        apartments: 54,
        status: "active",
        statusTextFr: "Gérée - Conforme",
        statusTextAr: "مسيّرة - مطابقة",
        satisfaction: 94,
        yearJoined: 2023,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
        descriptionFr: "Avec plus de 50 appartements, la Résidence Al Wifaq demande une gestion rigoureuse. Notre syndic y pilote la gestion financière transparente, les assemblées générales dématérialisées et le contrôle des ascenseurs.",
        descriptionAr: "تطلب إقامة الوفاق إدارة صارمة نظرًا لاحتوائها على أكثر من 50 شقة. يقود السنديك الإدارة المالية الشفافة والجمعيات العمومية الرقمية وصيانة المصاعد.",
        images: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        id: "harhourahills",
        name: "Résidence Harhoura Hills",
        address: "Sidi Abed, Harhoura",
        apartments: 28,
        status: "onboarding",
        statusTextFr: "En phase de démarrage",
        statusTextAr: "في مرحلة البدء",
        satisfaction: 95,
        yearJoined: 2026,
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
        descriptionFr: "Nouvellement intégrée à notre portefeuille, la Résidence Harhoura Hills bénéficie de l'audit technique complet initial de nos experts pour préparer l'année de gestion sous les meilleurs auspices.",
        descriptionAr: "تستفيد إقامة هرهورة هيلز المنضمة حديثًا من تدقيق تقني شامل لتهيئة ظروف التدبير المثلى.",
        images: [
          "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80"
        ]
      }
    ],
    reviews: [
      {
        id: "te1",
        name: "Salma K.",
        role: "Résidente - Val d'Or Harhoura",
        date: "Avril 2026",
        comment: "Depuis que ce syndic gère notre résidence de vacances, nous n'avons plus aucun problème avec la piscine et les espaces verts. L'équipe est très professionnelle.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
      },
      {
        id: "te2",
        name: "Yassine B.",
        role: "Copropriétaire",
        date: "Février 2026",
        comment: "Excellent système de ticketing pour remonter les pannes d'ascenseur. Elles sont réglées très rapidement avec des rapports de passage à l'appui.",
        rating: 4,
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80"
      }
    ]
  },
  casablanca: {
    key: "casablanca",
    titleFr: "Gestion de Copropriétés à Casablanca",
    titleAr: "تدبير الملكية المشتركة بالدار البيضاء",
    descriptionFr: "Leader du syndic professionnel à Casablanca. Nous offrons des solutions digitales et techniques de pointe pour les grands complexes résidentiels.",
    descriptionAr: "رائد السنديك المهني بالدار البيضاء. نحن نقدم حلولاً رقمية وتقنية متطورة للمجمعات السكنية الكبرى.",
    managerName: "Youssef Tazi",
    managerTitleFr: "Directeur Régional - Casablanca",
    managerTitleAr: "المدير الجهوي - الدار البيضاء الكبرى",
    managerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
    residencesCount: 45,
    satisfactionRate: 97,
    avgResponseTimeFr: "10 minutes",
    avgResponseTimeAr: "8 دقائق",
    residences: [
      {
        id: "gauthier",
        name: "Résidence Gauthier",
        address: "Rue Gauthier, Quartier Gauthier, Casablanca",
        apartments: 64,
        status: "active",
        statusTextFr: "Gérée - Conforme",
        statusTextAr: "مسيّرة - مطابقة",
        satisfaction: 98,
        yearJoined: 2021,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
        descriptionFr: "Au cœur du prestigieux quartier Gauthier, cette résidence de 64 appartements exige un niveau de prestation irréprochable. Notre syndic y déploie un système de vidéosurveillance moderne et un gardiennage d'élite.",
        descriptionAr: "في قلب حي غوتيه الراقي، تتطلب هذه الإقامة المكونة من 64 شقة مستوى خدمة ممتاز. ينشر السنديك مراقبة حديثة وحراسة نخبوية.",
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        id: "racine",
        name: "Résidence Racine",
        address: "Rue Jean Jaurès, Racine, Casablanca",
        apartments: 48,
        status: "active",
        statusTextFr: "Gérée - Conforme",
        statusTextAr: "مسيّرة - مطابقة",
        satisfaction: 97,
        yearJoined: 2022,
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80",
        descriptionFr: "La Résidence Racine fait l'objet d'un suivi rigoureux. Nos administrateurs de copropriété pilotent le nettoyage haute fréquence des espaces communs et le suivi mensuel des ascenseurs.",
        descriptionAr: "تخضع إقامة راسين لمتابعة صارمة. يدير مسؤولو الملكية المشتركة التنظيف عالي التردد والمتابعة الشهرية للمصاعد.",
        images: [
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        id: "anfasky",
        name: "Résidence Anfa Sky",
        address: "Avenue de l'Aéropostale, Casa Anfa",
        apartments: 120,
        status: "active",
        statusTextFr: "Gérée - Conforme",
        statusTextAr: "مسيّرة - مطابقة",
        satisfaction: 96,
        yearJoined: 2024,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
        descriptionFr: "Complexe moderne majeur de 120 unités à Casa Anfa. Notre syndic gère une équipe technique permanente sur site, l'entretien des surpresseurs hydrauliques et les parkings connectés.",
        descriptionAr: "مجمع سكني حديث مكون من 120 شقة في كازا أنفا. يدير السنديك فريقًا تقنيًا دائمًا وصيانة المضخات المائية والمواقف الذكية.",
        images: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80"
        ]
      }
    ],
    reviews: [
      {
        id: "casa1",
        name: "Sofia M.",
        role: "Copropriétaire - Anfa Sky",
        date: "Juin 2026",
        comment: "Pour un grand complexe comme Anfa Sky, la gestion est remarquable. Nettoyage impeccable, équipe de gardiennage polie et efficace. L'application de paiement est top.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
      },
      {
        id: "casa2",
        name: "Adil T.",
        role: "Conseil de Copropriété - Résidence Gauthier",
        date: "Avril 2026",
        comment: "Nous sommes passés d'une gestion amateur à ce syndic professionnel et cela a tout changé. Plus de problèmes d'impayés de cotisations, suivi technique parfait.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
      }
    ]
  },
  marrakech: {
    key: "marrakech",
    titleFr: "Gestion de Copropriétés à Marrakech",
    titleAr: "تدبير الملكية المشتركة بمراكش",
    descriptionFr: "Valorisation de vos propriétés à Marrakech. Nous gérons des résidences de haut standing avec jardins paysagers, piscines et services premium.",
    descriptionAr: "تثمين ممتلكاتكم في مراكش. نحن ندير إقامات رفيعة المستوى تتميز بحدائق منسقة، حمامات سباحة وخدمات ممتازة.",
    managerName: "Reda El Alami",
    managerTitleFr: "Directeur Régional - Marrakech",
    managerTitleAr: "المدير الجهوي - مراكش",
    managerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    residencesCount: 30,
    satisfactionRate: 96,
    avgResponseTimeFr: "12 minutes",
    avgResponseTimeAr: "12 دقيقة",
    residences: [
      {
        id: "menara",
        name: "Résidence Menara Premium",
        address: "Boulevard Mohamed VI, Marrakech",
        apartments: 36,
        status: "active",
        statusTextFr: "Gérée - Conforme",
        statusTextAr: "مسيّرة - مطابقة",
        satisfaction: 97,
        yearJoined: 2023,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
        descriptionFr: "Idéalement située sur le Boulevard Mohamed VI, cette prestigieuse résidence bénéficie d'une attention constante : maintenance de la piscine commune, tonte des espaces verts et nettoyage soigné.",
        descriptionAr: "تقع هذه الإقامة المرموقة في موقع مثالي بشارع محمد السادس، وتستفيد من اهتمام مستمر: صيانة المسبح وتنظيف المساحات الخضراء.",
        images: [
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        id: "hivernage",
        name: "Résidence Hivernage Palace",
        address: "Quartier Hivernage, Marrakech",
        apartments: 28,
        status: "active",
        statusTextFr: "Gérée - Conforme",
        statusTextAr: "مسيّرة - مطابقة",
        satisfaction: 95,
        yearJoined: 2022,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        descriptionFr: "Dans l'élégant quartier de l'Hivernage, le suivi technique et administratif de notre syndic garantit un standing résidentiel supérieur avec conciergerie et entretien permanent des jardins.",
        descriptionAr: "في حي الهيفورناج الأنيق، تضمن المتابعة الإدارية والتقنية للسنديك مستوى معيشي ممتاز مع بواب وصيانة للحدائق.",
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        id: "gueliz",
        name: "Résidence Gueliz Premium",
        address: "Rue de la Liberté, Gueliz, Marrakech",
        apartments: 50,
        status: "maintenance",
        statusTextFr: "Nettoyage annuel des citernes",
        statusTextAr: "التنظيف السنوي لخزانات المياه",
        satisfaction: 96,
        yearJoined: 2024,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        descriptionFr: "La Résidence Gueliz Premium subit une opération annuelle d'entretien et de désinfection des réserves d'eau. Notre équipe technique coordonne ces interventions pour éviter toute gêne pour les copropriétaires.",
        descriptionAr: "تخضع إقامة كليز بريميوم لعملية صيانة سنوية وتطهير لخزانات المياه. ينسق فريقنا هذه التدخلات لتجنب إزعاج الملاك.",
        images: [
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80"
        ]
      }
    ],
    reviews: [
      {
        id: "ke1",
        name: "Nora B.",
        role: "Résidente - Hivernage Palace",
        date: "Juin 2026",
        comment: "Un syndic à l'écoute des copropriétaires. Les jardins sont entretenus quotidiennement et les agents de sécurité sont extrêmement courtois. Bravo !",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
      },
      {
        id: "ke2",
        name: "Khalid J.",
        role: "Membre du syndicat",
        date: "Janvier 2026",
        comment: "Excellent travail de gestion administrative et technique. Le processus d'assemblée générale en ligne est super pratique pour les résidents absents.",
        rating: 4,
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80"
      }
    ]
  }
};