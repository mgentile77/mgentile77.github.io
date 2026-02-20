/* ================================
   assets/js/site.js
   Tiny vanilla JS for small UX upgrades
   ================================ */

(function(){
  const body = document.body;

  // Theme toggle (stored)
  const themeBtn = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("mg_theme");
  if(storedTheme === "dark"){ body.classList.add("theme-dark"); }
  if(themeBtn){
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("theme-dark");
      localStorage.setItem("mg_theme", body.classList.contains("theme-dark") ? "dark" : "light");
      themeBtn.setAttribute("aria-pressed", body.classList.contains("theme-dark") ? "true" : "false");
    });
    themeBtn.setAttribute("aria-pressed", body.classList.contains("theme-dark") ? "true" : "false");
  }

  // Active nav link
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".navbar a.nav-link").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if(href === path){
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });

  // Back-to-top
  const backBtn = document.getElementById("backToTop");
  if(backBtn){
    window.addEventListener("scroll", () => {
      backBtn.style.display = window.scrollY > 500 ? "inline-flex" : "none";
    });
    backBtn.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if(revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("show"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  // Simple project filter (optional)
  const filterWrap = document.getElementById("projectFilters");
  if(filterWrap){
    filterWrap.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if(!btn) return;
      const filter = btn.dataset.filter;
      filterWrap.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll("[data-tags]").forEach(card => {
        const tags = (card.dataset.tags || "").split(",").map(t => t.trim());
        const show = (filter === "all") || tags.includes(filter);
        card.closest(".col").style.display = show ? "" : "none";
      });
    });
  }
})();
