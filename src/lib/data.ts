export const COMPANY = {
  name: "Rational Cyphy",
  shortName: "RCP",
  tagline: "Physical Intelligence",
  location: "Urbana-Champaign, IL",
  email: "test@rationalcyphy.ai",
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
  {
    id: "02",
    name: "Mapping Drone",
    category: "Hardware Platform",
    description:
      "High-performance autonomous drone platform engineered for precision aerial mapping, environmental survey, and data acquisition.",
    tags: ["Hardware", "Autonomy", "Sensing"],
    color: "green" as const,
  },
  {
    id: "03",
    name: "Visual Tracking & Mapping",
    category: "Perception System",
    description:
      "Real-time 3D reconstruction using Gaussian Splatting. Onboard visual intelligence for tracking and mapping in complex environments.",
    tags: ["3DGS", "Perception", "SLAM"],
    color: "accent2" as const,
  },
];

export const RESEARCH = [
  {
    title: "Runtime Assurance for AI-Enabled Autonomous Systems",
    funder: "NASA",
    status: "In review",
  },
  {
    title: "3D Gaussian Splatting for Precision Aerial Mapping",
    funder: "AFRL",
    status: "2024",
  },
  {
    title: "Formal Verification of Learning-Enabled Autonomy Stacks",
    funder: "NSF",
    status: "2024",
  },
];

export const TEAM = [
  {
    name: "Sayan Mitra",
    role: "Co-founder",
    initials: "SM",
    image: "/assets/images/SM.png",
    credential: "Ph.D. Computer Science, MIT",
    bio: "Leads the Center for Autonomy at the University of Illinois. Built pioneering open-source verification tools — C2E2 and DryVR — used to prove safety of autonomous vehicles, aerospace systems, and industrial controllers. Author of Introduction to Safe Autonomy (MIT Press, 2021). Professor by day, scientific director prototyping the autonomy stack all night.",
  },
  {
    name: "Mahesh Viswanathan",
    role: "Co-founder",
    initials: "MV",
    image: "/assets/images/MV.png",
    credential: "Ph.D. Computer Science, UPenn",
    bio: "Co-created some of the earliest tools for runtime verification (Java-MaC) and learning-based verification (LEVER), helping define the field. Two decades building software that proves autonomous and cyberphysical systems work as designed.",
  },
  {
    name: "Chris Zeitler",
    role: "Software Developer, PI",
    initials: "CZ",
    image: "/assets/images/CKZ.png",
    credential: "Ph.D. Physics, UIUC · B.A. Physics, Dartmouth",
    bio: "Built optical systems for space-based quantum communication. Leads development of vision and reasoning systems for safe autonomy. Combines deep numerical modeling with hands-on algorithm design — the rare physicist who ships software.",
  },
  {
    name: "Moksh Shah",
    role: "Software Developer",
    initials: "MS",
    image: "/assets/images/MS.png",
    credential: "B.S./M.S. Computer Science, UIUC",
    bio: "Full-stack engineer working across software and hardware integration. Builds perception systems and simulation environments. Works with competitive drone racing teams.",
  },
  {
    name: "Karteek Gandiboyina",
    role: "Hardware Engineer",
    initials: "KG",
    image: "/assets/images/KG.png",
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
