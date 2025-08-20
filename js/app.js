
(function(){
  const $ = (sel, root=document)=>root.querySelector(sel);
  const $$ = (sel, root=document)=>Array.from(root.querySelectorAll(sel));

  // init year
  const yearEl = $("#year"); if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Apply saved language
  I18N.applyLang();

  // Language switch
  $$(".lang-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      I18N.setLang(btn.dataset.lang);
      announce("Language changed");
    });
  });

  // Accessibility dialog
  const panel = $("#accessibility-panel");
  const trigger = $("#accessibility-trigger");
  if (trigger && panel){
    trigger.addEventListener("click", ()=>{
      const open = panel.hasAttribute("open");
      if (!open) panel.showModal(); else panel.close();
      trigger.setAttribute("aria-expanded", String(!open));
    });
    panel.addEventListener("close", ()=> trigger.setAttribute("aria-expanded","false"));
  }

  // A11y toggles with persistence
  const root = document.documentElement;
  const toggles = {
    "toggle-contrast": "high-contrast",
    "toggle-large-text": "large-text",
    "toggle-dyslexia": "dyslexia",
    "toggle-reduce-motion": "reduce-motion"
  };
  Object.entries(toggles).forEach(([id, cls])=>{
    const el = $("#"+id);
    if (!el) return;
    // Load state
    try{
      const saved = localStorage.getItem(id) === "1";
      el.checked = saved;
      if (saved) root.classList.add(cls);
    }catch(e){}
    el.addEventListener("change", ()=>{
      if (el.checked) root.classList.add(cls); else root.classList.remove(cls);
      try{ localStorage.setItem(id, el.checked ? "1" : "0"); }catch(e){}
    });
  });

  // Announce helper for screen readers
  function announce(msg){
    const live = $("#sr-status");
    if (!live) return;
    live.textContent = ""; // clear
    setTimeout(()=> live.textContent = msg, 30);
  }

  // Demo "Explore" content
  if (document.body.dataset.page === "explore"){
    const list = $("#opportunity-list");
    const cards = [
      { title: I18N.t("opp_skillshare"), desc: I18N.t("opp_skillshare_desc"), role:"volunteer" },
      { title: I18N.t("opp_physiotherapy"), desc: I18N.t("opp_physiotherapy_desc"), role:"specialist" },
      { title: I18N.t("opp_jobfair"), desc: I18N.t("opp_jobfair_desc"), role:"pwd" }
    ];
    function render(filterRole, q){
      list.innerHTML = "";
      cards
        .filter(c => !filterRole || c.role === filterRole)
        .filter(c => !q || (c.title+ " " + c.desc).toLowerCase().includes(q.toLowerCase()))
        .forEach(c=>{
          const card = document.createElement("article");
          card.className = "card";
          card.innerHTML = `
            <div class="badge" data-i18n="role_${c.role}">${I18N.t("role_"+c.role)}</div>
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
            <div style="margin-top:auto; display:flex; gap:8px;">
              <a class="button solid" href="signup.html">${I18N.t("get_started")}</a>
              <a class="button ghost" href="about.html">${I18N.t("nav_about")}</a>
            </div>`;
          list.appendChild(card);
        });
    }
    const roleSel = $("#role"); const q = $("#q");
    const update = ()=> render(roleSel.value, q.value);
    roleSel.addEventListener("change", update);
    q.addEventListener("input", update);
    render(roleSel.value, q.value);
  }

  // Auth (demo)
  function getUser(){ try{ return JSON.parse(localStorage.getItem("user")||"null"); }catch(e){ return null; } }
  function setUser(u){ try{ localStorage.setItem("user", JSON.stringify(u)); }catch(e){} }
  function logout(){ try{ localStorage.removeItem("user"); }catch(e){} window.location.href = "index.html"; }

  if (document.body.dataset.page === "signup"){
    const form = $("#signup-form");
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const role = data.get("role");
      const name = data.get("name");
      const email = data.get("email");
      const password = data.get("password");
      if (!role || !name || !email || !password || !$("#tos").checked){
        alert("Please complete all required fields."); return;
      }
      setUser({ name, email, role });
      window.location.href = "dashboard.html";
    });
  }

  if (document.body.dataset.page === "login"){
    const form = $("#login-form");
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const email = $("#email").value.trim();
      if (!email){ alert("Enter your email"); return; }
      // Dummy login
      const u = getUser() || { name: email.split("@")[0], email, role: "volunteer" };
      setUser(u);
      window.location.href = "dashboard.html";
    });
  }

  if (document.body.dataset.page === "dashboard"){
    const user = getUser();
    if (!user){ window.location.href = "login.html"; }
    else{
      $("#user-name").textContent = user.name;
      $("#role-badge").textContent = I18N.t("role_"+user.role);
      $("#logout").addEventListener("click", logout);

      // Render role-specific widgets
      const grid = $("#dash-widgets");
      const widgets = {
        pwd: [
          { titleKey:"card_need_help", lines:["• Accessibility requests","• Transport assistance","• Learning resources"] },
          { titleKey:"card_offer_help", lines:["• Share your expertise","• Mentor a peer"] },
          { titleKey:"card_events", lines:["• Saturday 10:00 — Skillshare","• Tuesday 18:00 — Job Fair Q&A"] }
        ],
        family: [
          { titleKey:"card_need_help", lines:["• Find specialists","• Caregiver groups"] },
          { titleKey:"card_offer_help", lines:["• Share your tips","• Host a session"] },
          { titleKey:"card_events", lines:["• Sunday — Care Circle","• Wed — Therapy Q&A"] }
        ],
        volunteer: [
          { titleKey:"card_offer_help", lines:["• Add availability","• Join initiatives"] },
          { titleKey:"card_events", lines:["• Weekend — Park Accessibility Audit"] },
          { titleKey:"card_need_help", lines:["• Respond to requests near you"] }
        ],
        specialist: [
          { titleKey:"card_offer_help", lines:["• Open appointment slots","• Verify credentials"] },
          { titleKey:"card_events", lines:["• Host an awareness workshop"] },
          { titleKey:"card_need_help", lines:["• Answer community questions"] }
        ]
      };
      (widgets[user.role] || widgets.volunteer).forEach(w=>{
        const card = document.createElement("section");
        card.className = "card";
        const title = I18N.t(w.titleKey);
        card.innerHTML = `<h3>${title}</h3><ul style="margin:0; padding-inline-start:1rem">${w.lines.map(li=>`<li>${li}</li>`).join("")}</ul>`;
        grid.appendChild(card);
      });
    }
  }

  // Re-apply translations when navigating (for dynamic content on explore/dashboard)
  document.addEventListener("DOMContentLoaded", ()=>{
    I18N.applyLang();
  });
})();
