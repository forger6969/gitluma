export const STEPS_TREE = {
  1: {
    question: "Who are you?",
    subtitle: "Help us tailor your workspace by selecting the role that fits you best.",
    options: [
      { id: "frontend", label: "Frontend Dev", sub: "UI / Web", icon: "code" },
      { id: "backend", label: "Backend Dev", sub: "API / Systems", icon: "server" },
      { id: "fullstack", label: "Full Stack", sub: "End-to-End", icon: "layers" },
      { id: "lead", label: "Team Lead", sub: "Project Manager", icon: "users" },
      { id: "designer", label: "Designer", sub: "UI / UX / Brand", icon: "pen" },
      { id: "student", label: "Student", sub: "Early Career / Learner", icon: "book" },
    ],
  },
  2: {
    frontend: {
      question: "What's your primary stack?",
      subtitle: "Choose the framework you work with most. This shapes your dashboard.",
      options: [
        { id: "react", label: "React", sub: "Component-based UI", icon: "react" },
        { id: "vue", label: "Vue.js", sub: "Progressive framework", icon: "vue" },
        { id: "angular", label: "Angular", sub: "Enterprise-grade", icon: "shield" },
        { id: "svelte", label: "Svelte", sub: "Compiler-first", icon: "zap" },
        { id: "vanilla", label: "Vanilla JS", sub: "Pure native web", icon: "globe" },
      ],
    },
    backend: {
      question: "Your main language?",
      subtitle: "Pick the language you breathe. We'll tune your environment.",
      options: [
        { id: "node", label: "Node.js", sub: "JavaScript runtime", icon: "node" },
        { id: "python", label: "Python", sub: "Versatile & popular", icon: "python" },
        { id: "go", label: "Go", sub: "Fast & concurrent", icon: "go" },
        { id: "java", label: "Java / Kotlin", sub: "JVM ecosystem", icon: "cpu" },
        { id: "rust", label: "Rust", sub: "Systems & safety", icon: "shield" },
      ],
    },
    fullstack: {
      question: "Your go-to architecture?",
      subtitle: "We'll pre-configure templates and resources around your stack.",
      options: [
        { id: "mern", label: "MERN", sub: "Mongo · Express · React · Node", icon: "layers" },
        { id: "nextjs", label: "Next.js", sub: "Full-stack React", icon: "react" },
        { id: "trpc", label: "tRPC + React", sub: "End-to-end typesafe", icon: "zap" },
        { id: "django", label: "Django + React", sub: "Python full stack", icon: "python" },
        { id: "rails", label: "Rails", sub: "Convention-driven", icon: "go" },
      ],
    },
    lead: {
      question: "How big is your team?",
      subtitle: "Team size shapes how we organize your projects and permissions.",
      options: [
        { id: "solo", label: "Just me", sub: "Solo contributor", icon: "solo" },
        { id: "small", label: "2 – 5 people", sub: "Small squad", icon: "team_sm" },
        { id: "medium", label: "6 – 20 people", sub: "Growing team", icon: "users" },
        { id: "large", label: "20 + people", sub: "Scaled org", icon: "briefcase" },
      ],
    },
    designer: {
      question: "Your design specialty?",
      subtitle: "Tell us what tools and workflows to surface for you.",
      options: [
        { id: "uiux", label: "UI / UX", sub: "Figma, Prototyping", icon: "figma" },
        { id: "motion", label: "Motion", sub: "Animation, Lottie", icon: "zap" },
        { id: "brand", label: "Brand", sub: "Identity, Systems", icon: "star" },
        { id: "threeD", label: "3D / Illustration", sub: "Blender, Spline", icon: "globe" },
      ],
    },
    student: {
      question: "What are you learning?",
      subtitle: "Pick your current focus so we surface the right resources.",
      options: [
        { id: "webdev", label: "Web Dev", sub: "HTML, CSS, JS", icon: "globe" },
        { id: "mobile", label: "Mobile", sub: "React Native, Swift", icon: "zap" },
        { id: "aiml", label: "AI / ML", sub: "Python, PyTorch", icon: "cpu" },
        { id: "gamedev", label: "Game Dev", sub: "Unity, Godot", icon: "star" },
        { id: "systems", label: "Systems", sub: "C, Rust, OS", icon: "shield" },
      ],
    },
  },
  3: {
    question: "Your experience level?",
    subtitle: "This helps us calibrate the complexity of content and suggestions.",
    options: [
      { id: "junior", label: "Junior", sub: "0 – 2 years", icon: "book" },
      { id: "mid", label: "Mid-Level", sub: "2 – 5 years", icon: "code" },
      { id: "senior", label: "Senior", sub: "5 – 10 years", icon: "star" },
      { id: "staff", label: "Staff / Principal", sub: "10+ years", icon: "shield" },
    ],
  },
  4: {
    question: "What's your main goal?",
    subtitle: "We'll highlight the features and workflows most relevant to you.",
    options: [
      { id: "ship", label: "Ship faster", sub: "Productivity & automation", icon: "rocket" },
      { id: "collab", label: "Collaborate better", sub: "Team sync & review", icon: "users" },
      { id: "learn", label: "Level up skills", sub: "Courses & resources", icon: "book" },
      { id: "manage", label: "Manage projects", sub: "Roadmaps & tracking", icon: "target" },
    ],
  },
  5: {
    question: "Preferred workspace style?",
    subtitle: "Choose the interface density and flow that suits how you think.",
    options: [
      { id: "focused", label: "Focused", sub: "Minimal · one thing at a time", icon: "target" },
      { id: "power", label: "Power User", sub: "Dense · keyboard-first", icon: "cpu" },
      { id: "visual", label: "Visual Thinker", sub: "Kanban · drag & drop", icon: "layers" },
      { id: "social", label: "Collaborative", sub: "Shared · real-time", icon: "users" },
    ],
  },
};
