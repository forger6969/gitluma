export const getStepsTree = (t) => ({
  1: {
    question: t("s1_q"),
    subtitle:  t("s1_sub"),
    options: [
      { id: "frontend",  label: t("s1_frontend"),  sub: t("s1_frontend_sub"),  icon: "code"   },
      { id: "backend",   label: t("s1_backend"),   sub: t("s1_backend_sub"),   icon: "server" },
      { id: "fullstack", label: t("s1_fullstack"), sub: t("s1_fullstack_sub"), icon: "layers" },
      { id: "lead",      label: t("s1_lead"),      sub: t("s1_lead_sub"),      icon: "users"  },
      { id: "designer",  label: t("s1_designer"),  sub: t("s1_designer_sub"),  icon: "pen"    },
      { id: "student",   label: t("s1_student"),   sub: t("s1_student_sub"),   icon: "book"   },
    ],
  },
  2: {
    frontend: {
      question: t("s2f_q"),
      subtitle:  t("s2f_sub"),
      options: [
        { id: "react",   label: t("s2f_react"),   sub: t("s2f_react_sub"),   icon: "react"  },
        { id: "vue",     label: t("s2f_vue"),     sub: t("s2f_vue_sub"),     icon: "vue"    },
        { id: "angular", label: t("s2f_angular"), sub: t("s2f_angular_sub"), icon: "shield" },
        { id: "svelte",  label: t("s2f_svelte"),  sub: t("s2f_svelte_sub"),  icon: "zap"    },
        { id: "vanilla", label: t("s2f_vanilla"), sub: t("s2f_vanilla_sub"), icon: "globe"  },
      ],
    },
    backend: {
      question: t("s2b_q"),
      subtitle:  t("s2b_sub"),
      options: [
        { id: "node",   label: t("s2b_node"),   sub: t("s2b_node_sub"),   icon: "node"   },
        { id: "python", label: t("s2b_python"), sub: t("s2b_python_sub"), icon: "python" },
        { id: "go",     label: t("s2b_go"),     sub: t("s2b_go_sub"),     icon: "go"     },
        { id: "java",   label: t("s2b_java"),   sub: t("s2b_java_sub"),   icon: "cpu"    },
        { id: "rust",   label: t("s2b_rust"),   sub: t("s2b_rust_sub"),   icon: "shield" },
      ],
    },
    fullstack: {
      question: t("s2fs_q"),
      subtitle:  t("s2fs_sub"),
      options: [
        { id: "mern",   label: t("s2fs_mern"),   sub: t("s2fs_mern_sub"),   icon: "layers" },
        { id: "nextjs", label: t("s2fs_nextjs"), sub: t("s2fs_nextjs_sub"), icon: "react"  },
        { id: "trpc",   label: t("s2fs_trpc"),   sub: t("s2fs_trpc_sub"),   icon: "zap"    },
        { id: "django", label: t("s2fs_django"), sub: t("s2fs_django_sub"), icon: "python" },
        { id: "rails",  label: t("s2fs_rails"),  sub: t("s2fs_rails_sub"),  icon: "go"     },
      ],
    },
    lead: {
      question: t("s2l_q"),
      subtitle:  t("s2l_sub"),
      options: [
        { id: "solo",   label: t("s2l_solo"),   sub: t("s2l_solo_sub"),   icon: "solo"      },
        { id: "small",  label: t("s2l_small"),  sub: t("s2l_small_sub"),  icon: "team_sm"   },
        { id: "medium", label: t("s2l_medium"), sub: t("s2l_medium_sub"), icon: "users"     },
        { id: "large",  label: t("s2l_large"),  sub: t("s2l_large_sub"),  icon: "briefcase" },
      ],
    },
    designer: {
      question: t("s2d_q"),
      subtitle:  t("s2d_sub"),
      options: [
        { id: "uiux",   label: t("s2d_uiux"),   sub: t("s2d_uiux_sub"),   icon: "figma" },
        { id: "motion", label: t("s2d_motion"), sub: t("s2d_motion_sub"), icon: "zap"   },
        { id: "brand",  label: t("s2d_brand"),  sub: t("s2d_brand_sub"),  icon: "star"  },
        { id: "threeD", label: t("s2d_threed"), sub: t("s2d_threed_sub"), icon: "globe" },
      ],
    },
    student: {
      question: t("s2st_q"),
      subtitle:  t("s2st_sub"),
      options: [
        { id: "webdev",  label: t("s2st_webdev"),  sub: t("s2st_webdev_sub"),  icon: "globe"  },
        { id: "mobile",  label: t("s2st_mobile"),  sub: t("s2st_mobile_sub"),  icon: "zap"    },
        { id: "aiml",    label: t("s2st_aiml"),    sub: t("s2st_aiml_sub"),    icon: "cpu"    },
        { id: "gamedev", label: t("s2st_gamedev"), sub: t("s2st_gamedev_sub"), icon: "star"   },
        { id: "systems", label: t("s2st_systems"), sub: t("s2st_systems_sub"), icon: "shield" },
      ],
    },
  },
  3: {
    question: t("s3_q"),
    subtitle:  t("s3_sub"),
    options: [
      { id: "junior", label: t("s3_junior"), sub: t("s3_junior_sub"), icon: "book"   },
      { id: "mid",    label: t("s3_mid"),    sub: t("s3_mid_sub"),    icon: "code"   },
      { id: "senior", label: t("s3_senior"), sub: t("s3_senior_sub"), icon: "star"   },
      { id: "staff",  label: t("s3_staff"),  sub: t("s3_staff_sub"),  icon: "shield" },
    ],
  },
  4: {
    question: t("s4_q"),
    subtitle:  t("s4_sub"),
    options: [
      { id: "ship",   label: t("s4_ship"),   sub: t("s4_ship_sub"),   icon: "rocket" },
      { id: "collab", label: t("s4_collab"), sub: t("s4_collab_sub"), icon: "users"  },
      { id: "learn",  label: t("s4_learn"),  sub: t("s4_learn_sub"),  icon: "book"   },
      { id: "manage", label: t("s4_manage"), sub: t("s4_manage_sub"), icon: "target" },
    ],
  },
  5: {
    question: t("s5_q"),
    subtitle:  t("s5_sub"),
    options: [
      { id: "focused", label: t("s5_focused"), sub: t("s5_focused_sub"), icon: "target" },
      { id: "power",   label: t("s5_power"),   sub: t("s5_power_sub"),   icon: "cpu"    },
      { id: "visual",  label: t("s5_visual"),  sub: t("s5_visual_sub"),  icon: "layers" },
      { id: "social",  label: t("s5_social"),  sub: t("s5_social_sub"),  icon: "users"  },
    ],
  },
});
