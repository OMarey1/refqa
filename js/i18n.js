/* Simple bilingual i18n for EN/AR with dir switching */
window.I18N = (function () {
  const dictionary = {
    en: {
      brand: "Refqa",
      nav_home: "Home",
      nav_explore: "Explore",
      nav_about: "About",
      nav_login: "Log in",
      nav_signup: "Sign up",
      accessibility: "Accessibility",
      a11y_title: "Accessibility Options",
      high_contrast: "High contrast",
      large_text: "Larger text",
      dyslexia_friendly: "Dyslexia‑friendly",
      reduce_motion: "Reduce motion",
      close: "Close",
      toggle_theme: "Toggle theme",
      skip_to_content: "Skip to main",
      hero_title: "A smart platform connecting people with disabilities, families, volunteers, and specialists.",
      hero_sub: "Exchange skills, get practical support, and contribute to your community—equally.",
      get_started: "Get started",
      explore_opportunities: "Explore opportunities",
      feat_matchmaking: "Inclusive matchmaking",
      feat_matchmaking_desc: "Smart matching between needs and skills across all roles.",
      feat_learning: "Guides & learning",
      feat_learning_desc: "Practical content for families and community members.",
      feat_specialists: "Specialists",
      feat_specialists_desc: "Verified therapists, doctors, and trainers offering sessions.",
      feat_events: "Events & initiatives",
      feat_events_desc: "Workshops and activities promoting inclusion and contribution.",
      mission_title: "Our mission",
      mission_desc: "Enable people with disabilities to give as much as they receive—through skills exchange, mentorship, and community support.",
      footer_tag: "Your companion on the journey of giving & inclusion.",
      footer_links: "Links",
      footer_contact: "Contact",
      follow_us: "Follow us",
      explore_title: "Explore opportunities",
      search: "Search",
      search_ph: "e.g., sign-language meetup",
      role: "Role",
      any: "Any",
      role_pwd: "Person with Disability",
      role_family: "Family / Caregiver",
      role_volunteer: "Volunteer",
      role_specialist: "Specialist",
      about_title: "About Refqa",
      about_p1: "Refqa is an inclusive platform that connects people with disabilities, their families, volunteers, and specialists in one place.",
      about_p2: "We promote equal contribution, continuous learning, and dignified support through verified profiles, events, and practical guides.",
      about_b1: "Community‑first and privacy‑aware",
      about_b2: "Bilingual (Arabic/English) with RTL support",
      about_b3: "Accessible by design (keyboard, screen readers, contrast)",
      login_title: "Log in",
      email: "Email",
      email_hint: "We'll never share your email.",
      password: "Password",
      login: "Log in",
      no_account: "Don't have an account?",
      create_one: "Create one",
      signup_title: "Create your account",
      choose_role: "Choose your role",
      role_pwd_desc: "Receive and offer skills; shape your community.",
      role_family_desc: "Find guidance and share your experience.",
      role_volunteer_desc: "Offer time and skills to meaningful causes.",
      role_specialist_desc: "Provide professional support and sessions.",
      full_name: "Full name",
      city: "City",
      agree_tos: "I agree to the Terms of Service & Privacy Policy",
      create_account: "Create account",
      have_account: "Already have an account?",
      dashboard_welcome: "Welcome",
      logout: "Log out",
      card_need_help: "Need support",
      card_offer_help: "Offer your skills",
      card_events: "Upcoming events",
      // Demo opportunities
      opp_skillshare: "Basic Sign Language Circle",
      opp_skillshare_desc: "Weekly beginner session led by volunteers and PWD trainers.",
      opp_physiotherapy: "Physiotherapy Q&A",
      opp_physiotherapy_desc: "Live Q&A with certified specialists.",
      opp_jobfair: "Inclusive Job Fair",
      opp_jobfair_desc: "Meet employers championing accessibility."
    },
    ar: {
      brand: "رِفقة",
      nav_home: "الرئيسية",
      nav_explore: "استكشاف",
      nav_about: "نبذة",
      nav_login: "تسجيل الدخول",
      nav_signup: "إنشاء حساب",
      accessibility: "إتاحة",
      a11y_title: "خيارات الإتاحة",
      high_contrast: "تباين عالٍ",
      large_text: "تكبير الخط",
      dyslexia_friendly: "مناسب لعُسر القراءة",
      reduce_motion: "تقليل الحركة",
      close: "إغلاق",
      toggle_theme: "تبديل المظهر",
      skip_to_content: "تخطي إلى المحتوى",
      hero_title: "منصة ذكية تربط ذوي الهمم، الأسر، المتطوعين والمختصين في مكان واحد.",
      hero_sub: "تبادل المهارات، واحصل على دعم عملي، وساهم في مجتمعك—بالتساوي.",
      get_started: "ابدأ الآن",
      explore_opportunities: "استكشف الفرص",
      feat_matchmaking: "مواءمة شاملة",
      feat_matchmaking_desc: "مطابقة ذكية بين الاحتياجات والمهارات عبر جميع الأدوار.",
      feat_learning: "أدلة وتعلم",
      feat_learning_desc: "محتوى عملي للأهالي وأفراد المجتمع.",
      feat_specialists: "المختصون",
      feat_specialists_desc: "أخصائيون ومعالجون معتمدون يقدمون جلسات.",
      feat_events: "فعاليات ومبادرات",
      feat_events_desc: "ورش وأنشطة لتعزيز الدمج والمشاركة.",
      mission_title: "رسالتنا",
      mission_desc: "تمكين ذوي الهمم من العطاء بقدر ما يتلقونه—عبر تبادل المهارات والإرشاد والدعم المجتمعي.",
      footer_tag: "رفيقك في رحلة العطاء والدمج.",
      footer_links: "روابط",
      footer_contact: "تواصل",
      follow_us: "تابعنا",
      explore_title: "استكشاف الفرص",
      search: "بحث",
      search_ph: "مثال: لقاء لغة الإشارة",
      role: "الدور",
      any: "الكل",
      role_pwd: "شخص من ذوي الهمم",
      role_family: "أسرة / مُقدّم رعاية",
      role_volunteer: "متطوّع",
      role_specialist: "مختص",
      about_title: "عن رِفقة",
      about_p1: "رِفقة منصة شاملة تربط ذوي الهمم وأسرهم والمتطوعين والمختصين في مكان واحد.",
      about_p2: "نعزز العطاء المتبادل والتعلّم المستمر والدعم الكريم عبر ملفات موثّقة وفعاليات وأدلة عملية.",
      about_b1: "مجتمع أولًا وخصوصية مصانة",
      about_b2: "ثنائي اللغة (عربي/إنجليزي) مع دعم الاتجاه من اليمين لليسار",
      about_b3: "إتاحة من التصميم (لوحة المفاتيح، قارئ الشاشة، التباين)",
      login_title: "تسجيل الدخول",
      email: "البريد الإلكتروني",
      email_hint: "لن نشارك بريدك مع أي طرف.",
      password: "كلمة المرور",
      login: "تسجيل الدخول",
      no_account: "ليس لديك حساب؟",
      create_one: "أنشئ حسابًا",
      signup_title: "إنشاء حساب",
      choose_role: "اختر دورك",
      role_pwd_desc: "تلقَّ وقدّم المهارات؛ كن مؤثرًا في مجتمعك.",
      role_family_desc: "اعثر على الإرشاد وشارك خبرتك.",
      role_volunteer_desc: "قدّم وقتك ومهاراتك لقضايا هادفة.",
      role_specialist_desc: "قدّم دعمًا مهنيًا وجلسات.",
      full_name: "الاسم الكامل",
      city: "المدينة",
      agree_tos: "أوافق على الشروط وسياسة الخصوصية",
      create_account: "إنشاء الحساب",
      have_account: "لديك حساب بالفعل؟",
      dashboard_welcome: "مرحبًا",
      logout: "تسجيل الخروج",
      card_need_help: "بحاجة إلى دعم",
      card_offer_help: "قدّم مهارتك",
      card_events: "فعاليات قادمة",
      opp_skillshare: "دوّامة لغة الإشارة للمبتدئين",
      opp_skillshare_desc: "جلسة أسبوعية للمبتدئين يقودها متطوعون ومدربون من ذوي الهمم.",
      opp_physiotherapy: "أسئلة وأجوبة العلاج الطبيعي",
      opp_physiotherapy_desc: "جلسة مباشرة مع مختصين معتمدين.",
      opp_jobfair: "معرض توظيف شامل",
      opp_jobfair_desc: "تعرف على جهات عمل تتبنّى الإتاحة."
    }
  };

  function translate(key) {
    const currentLanguage = getCurrentLanguage();
    return (dictionary[currentLanguage] && dictionary[currentLanguage][key]) || (dictionary.en[key] || key);
  }

  function setLanguage(languageCode) {
    try {
      localStorage.setItem("lang", languageCode);
    } catch (e) {
      console.log(e);
    }
    applyLanguage();
  }

  function getCurrentLanguage() {
    try {
      return localStorage.getItem("lang");
    } catch (e) { return "en"; }
  }

  function applyLanguage() {
    const currentLanguage = getCurrentLanguage();
    const documentRoot = document.documentElement;
    documentRoot.lang = currentLanguage;
    documentRoot.dir = currentLanguage === "ar" ? "rtl" : "ltr";

    // Update language button pressed states
    document.querySelectorAll(".lang-btn").forEach(languageButton => {
      const isPressed = languageButton.getAttribute("data-lang") === currentLanguage;
      languageButton.setAttribute("aria-pressed", isPressed ? "true" : "false");
    });

    // Translate text content
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const translationKey = element.getAttribute("data-i18n");
      if (translationKey && dictionary[currentLanguage] && dictionary[currentLanguage][translationKey]) {
        element.textContent = dictionary[currentLanguage][translationKey];
      } else if (translationKey && dictionary.en[translationKey]) {
        element.textContent = dictionary.en[translationKey];
      }
    });

    // Translate placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
      const translationKey = element.getAttribute("data-i18n-placeholder");
      if (translationKey && dictionary[currentLanguage] && dictionary[currentLanguage][translationKey]) {
        element.setAttribute("placeholder", dictionary[currentLanguage][translationKey]);
      } else if (translationKey && dictionary.en[translationKey]) {
        element.setAttribute("placeholder", dictionary.en[translationKey]);
      }
    });
  }

  return {
    t: translate,
    setLanguage,
    getCurrentLanguage,
    applyLanguage,
    dictionary
  };
})();
