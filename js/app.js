
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Initialize current year
  const yearElement = $("#year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Apply saved language on page load
  I18N.applyLanguage();

  // Language switching functionality
  $$(".lang-btn").forEach(languageButton => {
    languageButton.addEventListener("click", () => {
      const selectedLanguage = languageButton.dataset.lang;
      I18N.setLanguage(selectedLanguage);
      announceToScreenReader("Language changed");
    });
  });

  // Theme switching functionality
  const themeToggleButton = $("#theme-toggle");
  if (themeToggleButton) {
    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeToggleIcon(savedTheme);

    themeToggleButton.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeToggleIcon(newTheme);

      announceToScreenReader(`Switched to ${newTheme} theme`);
    });
  }

  function updateThemeToggleIcon(theme) {
    const iconElement = themeToggleButton.querySelector(".icon");
    if (iconElement) {
      iconElement.textContent = theme === "light" ? "🌙" : "☀️";
    }
  }

  // Accessibility panel functionality
  const accessibilityPanel = $("#accessibility-panel");
  const accessibilityTrigger = $("#accessibility-trigger");
  if (accessibilityTrigger && accessibilityPanel) {
    accessibilityTrigger.addEventListener("click", () => {
      const isPanelOpen = accessibilityPanel.hasAttribute("open");
      if (!isPanelOpen) {
        accessibilityPanel.showModal();
      } else {
        accessibilityPanel.close();
      }
      accessibilityTrigger.setAttribute("aria-expanded", String(!isPanelOpen));
    });
    accessibilityPanel.addEventListener("close", () => accessibilityTrigger.setAttribute("aria-expanded", "false"));
  }

  // Accessibility toggle switches with persistence
  const documentRoot = document.documentElement;
  const accessibilityToggles = {
    "toggle-contrast": "high-contrast",
    "toggle-large-text": "large-text",
    "toggle-dyslexia": "dyslexia",
    "toggle-reduce-motion": "reduce-motion"
  };
  Object.entries(accessibilityToggles).forEach(([toggleId, cssClass]) => {
    const toggleElement = $("#" + toggleId);
    if (!toggleElement) return;

    // Load saved accessibility state
    try {
      const isEnabled = localStorage.getItem(toggleId) === "1";
      toggleElement.checked = isEnabled;
      if (isEnabled) documentRoot.classList.add(cssClass);
    } catch (e) { }

    toggleElement.addEventListener("change", () => {
      if (toggleElement.checked) {
        documentRoot.classList.add(cssClass);
      } else {
        documentRoot.classList.remove(cssClass);
      }
      try {
        localStorage.setItem(toggleId, toggleElement.checked ? "1" : "0");
      } catch (e) { }
    });
  });

  // Screen reader announcement helper
  function announceToScreenReader(message) {
    const screenReaderStatus = $("#sr-status");
    if (!screenReaderStatus) return;
    screenReaderStatus.textContent = ""; // clear previous message
    setTimeout(() => screenReaderStatus.textContent = message, 30);
  }

  // Explore page content rendering
  if (document.body.dataset.page === "explore") {
    const opportunityList = $("#opportunity-list");
    const opportunityCards = [
      { title: I18N.t("opp_skillshare"), desc: I18N.t("opp_skillshare_desc"), role: "volunteer" },
      { title: I18N.t("opp_physiotherapy"), desc: I18N.t("opp_physiotherapy_desc"), role: "specialist" },
      { title: I18N.t("opp_jobfair"), desc: I18N.t("opp_jobfair_desc"), role: "pwd" }
    ];

    function renderOpportunityCards(filterRole, searchQuery) {
      opportunityList.innerHTML = "";
      opportunityCards
        .filter(card => !filterRole || card.role === filterRole)
        .filter(card => !searchQuery || (card.title + " " + card.desc).toLowerCase().includes(searchQuery.toLowerCase()))
        .forEach(card => {
          const cardElement = document.createElement("article");
          cardElement.className = "card";
          cardElement.innerHTML = `
            <div class="badge" data-i18n="role_${card.role}">${I18N.t("role_" + card.role)}</div>
            <h3>${card.title}</h3>
            <p>${card.desc}</p>
            <div style="margin-top:auto; display:flex; gap:8px;">
              <a class="button solid" href="signup.html">${I18N.t("get_started")}</a>
              <a class="button ghost" href="about.html">${I18N.t("nav_about")}</a>
            </div>`;
          opportunityList.appendChild(cardElement);
        });
    }

    const roleSelector = $("#role");
    const searchInput = $("#q");
    const updateOpportunityList = () => renderOpportunityCards(roleSelector.value, searchInput.value);
    roleSelector.addEventListener("change", updateOpportunityList);
    searchInput.addEventListener("input", updateOpportunityList);
    renderOpportunityCards(roleSelector.value, searchInput.value);
  }

  // User authentication functionality
  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch (e) {
      return null;
    }
  }

  function saveCurrentUser(userData) {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (e) { }
  }

  function handleUserLogout() {
    try {
      localStorage.removeItem("user");
    } catch (e) { }
    window.location.href = "index.html";
  }

  // Signup page functionality
  if (document.body.dataset.page === "signup") {
    const signupForm = $("#signup-form");
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(signupForm);
      const role = formData.get("role");
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      if (!role || !name || !email || !password || !$("#tos").checked) {
        alert("Please complete all required fields.");
        return;
      }

      saveCurrentUser({ name, email, role });
      window.location.href = "dashboard.html";
    });
  }

  // Login page functionality
  if (document.body.dataset.page === "login") {
    const loginForm = $("#login-form");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = $("#email").value.trim();
      if (!email) {
        alert("Enter your email");
        return;
      }

      // Demo login functionality
      const user = getCurrentUser() || { name: email.split("@")[0], email, role: "volunteer" };
      saveCurrentUser(user);
      window.location.href = "dashboard.html";
    });
  }

  // Dashboard page functionality
  if (document.body.dataset.page === "dashboard") {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      window.location.href = "login.html";
    } else {
      $("#user-name").textContent = currentUser.name;
      $("#role-badge").textContent = I18N.t("role_" + currentUser.role);
      $("#logout").addEventListener("click", handleUserLogout);

      // Render role-specific dashboard widgets
      const dashboardGrid = $("#dash-widgets");
      const roleWidgets = {
        pwd: [
          { titleKey: "card_need_help", lines: ["• Accessibility requests", "• Transport assistance", "• Learning resources"] },
          { titleKey: "card_offer_help", lines: ["• Share your expertise", "• Mentor a peer"] },
          { titleKey: "card_events", lines: ["• Saturday 10:00 — Skillshare", "• Tuesday 18:00 — Job Fair Q&A"] }
        ],
        family: [
          { titleKey: "card_need_help", lines: ["• Find specialists", "• Caregiver groups"] },
          { titleKey: "card_offer_help", lines: ["• Share your tips", "• Host a session"] },
          { titleKey: "card_events", lines: ["• Sunday — Care Circle", "• Wed — Therapy Q&A"] }
        ],
        volunteer: [
          { titleKey: "card_offer_help", lines: ["• Add availability", "• Join initiatives"] },
          { titleKey: "card_events", lines: ["• Weekend — Park Accessibility Audit"] },
          { titleKey: "card_need_help", lines: ["• Respond to requests near you"] }
        ],
        specialist: [
          { titleKey: "card_offer_help", lines: ["• Open appointment slots", "• Verify credentials"] },
          { titleKey: "card_events", lines: ["• Host an awareness workshop"] },
          { titleKey: "card_need_help", lines: ["• Answer community questions"] }
        ]
      };

      (roleWidgets[currentUser.role] || roleWidgets.volunteer).forEach(widget => {
        const widgetCard = document.createElement("section");
        widgetCard.className = "card";
        const widgetTitle = I18N.t(widget.titleKey);
        widgetCard.innerHTML = `<h3>${widgetTitle}</h3><ul style="margin:0; padding-inline-start:1rem">${widget.lines.map(line => `<li>${line}</li>`).join("")}</ul>`;
        dashboardGrid.appendChild(widgetCard);
      });
    }
  }

  // Re-apply translations when navigating (for dynamic content on explore/dashboard)
  document.addEventListener("DOMContentLoaded", () => {
    I18N.applyLanguage();
  });

  // Header kebab (3-dots) menu functionality
  const kebabMenuButton = document.getElementById("header-kebab");
  const kebabMenu = document.getElementById("header-menu");
  if (kebabMenuButton && kebabMenu) {
    function closeKebabMenu() {
      if (!kebabMenu.hidden) {
        kebabMenu.hidden = true;
        kebabMenuButton.setAttribute("aria-expanded", "false");
      }
    }

    function positionMenu() {
      const buttonRect = kebabMenuButton.getBoundingClientRect();
      const menuWidth = 220; // Fixed width to prevent sizing issues
      
      // Calculate position
      let leftPosition = buttonRect.right - menuWidth;
      
      // Ensure menu doesn't go off-screen to the left
      if (leftPosition < 10) {
        leftPosition = 10;
      }
      
      // Ensure menu doesn't go off-screen to the right
      if (leftPosition + menuWidth > window.innerWidth - 10) {
        leftPosition = window.innerWidth - menuWidth - 10;
      }
      
      kebabMenu.style.position = "fixed";
      kebabMenu.style.top = `${buttonRect.bottom + 8}px`;
      kebabMenu.style.left = `${leftPosition}px`;
      kebabMenu.style.width = `${menuWidth}px`;
    }

    kebabMenuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpenMenu = kebabMenu.hidden;
      if (willOpenMenu) {
        kebabMenu.hidden = false;
        kebabMenuButton.setAttribute("aria-expanded", "true");
        // Use setTimeout to ensure the menu is visible before positioning
        setTimeout(() => {
          positionMenu();
        }, 10);
      } else {
        closeKebabMenu();
      }
    });

    // Reposition menu on window resize
    window.addEventListener("resize", () => {
      if (!kebabMenu.hidden) {
        positionMenu();
      }
    });

    // Reposition menu on scroll
    window.addEventListener("scroll", () => {
      if (!kebabMenu.hidden) {
        positionMenu();
      }
    });

    document.addEventListener("click", (e) => {
      if (!kebabMenu.hidden && !kebabMenu.contains(e.target) && e.target !== kebabMenuButton) {
        closeKebabMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeKebabMenu();
      }
    });
  }
})();
