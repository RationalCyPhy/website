export const COMPANY = {
  name: "Rational Cyphy",
  shortName: "RCP",
  tagline: "Physical Intelligence",
  location: "Urbana-Champaign, IL",
  email: "rationalcyphy@googlegroups.com",
  funding: "$5M+",
  teamSize: 4,
  founded: 2020,
  description:
    "We build powerful drones, their autonomy stacks, and rigorous tooling to design, verify, and reason about AI-enabled systems — from hardware to formal assurance.",
};

export const FUNDERS = [
  { abbr: "NASA", full: "National Aeronautics and Space Administration" },
  { abbr: "AFRL", full: "Air Force Research Laboratory" },
  { abbr: "NSF", full: "National Science Foundation" },
];

export const TECHNOLOGIES = [
  {
    id: "01",
    name: "RTAEval",
    category: "Safety Assurance",
    description:
      "Formal verification tooling for AI-enabled autonomy. Evaluate and verify safety properties of runtime assurance architectures with mathematical rigor.",
    tags: ["Formal Methods", "AI Safety", "Verification"],
    color: "accent" as const,
  },
];

export const FEATURED_TECHS = [
  {
    name: "MorphOS",
    category: "Development & Test Framework",
    description:
      "MorphOS is our framework for development and testing of aerial autonomous platforms — combining photoreal simulation, multi-agent scenarios, and a full-stack autonomy pipeline that scales from single drones to coordinated swarms.",
    tags: ["Multiagent", "Photoreal", "Full-stack", "Scalable"],
    video: "/website/assets/videos/morphos.mp4",
  },
  {
    name: "Mapping Drone",
    category: "Hardware Platform",
    description:
      "High-performance autonomous drone platform engineered for precision aerial mapping, environmental survey, and data acquisition.",
    tags: ["Hardware", "Autonomy", "Sensing"],
    video: null,
  },
];

export const RESEARCH = [
  {
    title: "RTAEval: A Framework for Evaluating Runtime Assurance Logic",
    authors: "Miller, Zeitler,  Shen,  Mitra, and Viswanathan",
    venue: "21st Intl. Symposium on Automated Technologies for Verification and Analysis (ATVA), pp 302–313, 2023",
    blurb: "Introduces a software tool for evaluating whether runtime assurance monitors correctly enforce safety properties in autonomous systems in a variety of advanced scenarios.",
    funder: "AFRL",
    status: "2023",
  },

  {
    title: "Abstract Rendering: Certified Rendering Under 3D Semantic Uncertainty",
    authors: "Li, Ji, Zhong, Zhang, and Mitra",
    venue: "NeurIPS (spotlight), 2025",
    blurb: "Provides certified rendering guarantees for 3D scenes under semantic uncertainty, bridging formal methods and neural rendering.",
    funder: "NSF",
    status: "2025",
  },
  {
    title: "Optimal Runtime Assurance via Reinforcement Learning",
    authors: "Miller, Zeitler, Shen, Hobbs, Mitra, Schierman, and Viswanathan",
    venue: "IEEE/ACM ICCPS International Conference on Cyberphysical Systems (ICCPS 2024), Hong Kong, 2024",
    blurb: "Uses reinforcement learning to synthesize optimal runtime assurance strategies that maximize performance while guaranteeing safety.",
    funder: "AFRL",
    status: "2024",
  },
];

export const TEAM = [
  {
    name: "Sayan Mitra",
    role: "Co-founder",
    initials: "SM",
    image: "/website/assets/images/SM.png",
    credential: "Ph.D. Computer Science, MIT",
    bio: "Leads the Center for Autonomy at the University of Illinois. Built pioneering open-source verification tools — C2E2 and DryVR — used to prove safety of autonomous vehicles, aerospace systems, and industrial controllers. Author of Introduction to Safe Autonomy (MIT Press, 2021). Professor by day, scientific director prototyping the autonomy stack all night.",
  },
  {
    name: "Mahesh Viswanathan",
    role: "Co-founder",
    initials: "MV",
    image: "/website/assets/images/MV.png",
    credential: "Ph.D. Computer Science, UPenn",
    bio: "Co-created some of the earliest tools for runtime verification (Java-MaC) and learning-based verification (LEVER), helping define the field. Two decades building software that proves autonomous and cyberphysical systems work as designed.",
  },
  {
    name: "Chris Zeitler",
    role: "Software Developer, PI",
    initials: "CZ",
    image: "/website/assets/images/CKZ.png",
    credential: "Ph.D. Physics, UIUC · B.A. Physics, Dartmouth",
    bio: "Built optical systems for space-based quantum communication. Leads development of vision and reasoning systems for safe autonomy. Combines deep numerical modeling with hands-on algorithm design — the rare physicist who ships software.",
  },
  {
    name: "Moksh Shah",
    role: "Software Developer",
    initials: "MS",
    image: "/website/assets/images/MS.png",
    credential: "B.S./M.S. Computer Science, UIUC",
    bio: "Full-stack engineer working across software and hardware integration. Builds perception systems and simulation environments. Works with competitive drone racing teams.",
  },
  {
    name: "Karteek Gandiboyina",
    role: "Hardware Engineer",
    initials: "KG",
    image: "/website/assets/images/KG.png",
    credential: "M.S. Autonomy & Robotics, UIUC · B.Tech Electrical Engineering, IIT Kharagpur",
    bio: "Robotics and computer vision engineer with three years at Konica Minolta building industrial perception systems and collaborating with JAXA on space-station manipulation. Develops vision-based drone control and trajectory planning.",
  },
];

export const NAV_LINKS = [
  { label: "Technology", href: "/technology" },
  { label: "Team", href: "/team" },
  { label: "Research", href: "/research" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];
