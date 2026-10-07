// FISAT redesigned frontend — plain, readable JavaScript.
// Every feature works by opening index.html. No build step.

const body = document.body;

/* ---------- Footer year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Mobile navigation ---------- */
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Sticky header shadow + back-to-top ---------- */
const header = document.querySelector(".site-header");
const backToTop = document.getElementById("backToTop");

function onScroll() {
  const y = window.scrollY || 0;
  if (header) header.classList.toggle("scrolled", y > 10);
  if (backToTop) backToTop.classList.toggle("show", y > 600);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Scroll reveal ---------- */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

/* ---------- Counter animation ---------- */
const counters = document.querySelectorAll(".counter");

function animateCounter(element) {
  const target = Number(element.dataset.target);
  if (!target) return;
  const duration = 1400;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(eased * target).toLocaleString("en-IN");
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));
}

/* ---------- Modal data (editable) ---------- */
const modalData = {
  campusLife: {
    eyebrow: "CAMPUS LIFE",
    title: "A campus with a pulse.",
    text: "Student life at FISAT extends beyond lectures through arts & sports, social commitments, and curricular & co-curricular activities.",
    tags: ["Arts & Sports", "Social Commitments", "Clubs", "Co-Curricular"]
  },
  facilities: {
    eyebrow: "FACILITIES",
    title: "Built for learning.",
    text: "Facilities include central computing, IT infrastructure, robotics and IDEA labs, hostels, sports, fitness, cafeteria, conveyance and on-campus banking.",
    tags: ["IDEA Lab", "Computing", "Hostel", "Sports", "Cafeteria"]
  },
  library: {
    eyebrow: "LIBRARY",
    title: "A digital + physical knowledge hub.",
    text: "The library provides print resources alongside digital services such as e-journals, e-books, OPAC, institutional repository access and research support.",
    tags: ["Digital Library", "E-Journals", "E-Books", "OPAC", "NPTEL", "SWAYAM", "NDLI"]
  },
  industry: {
    eyebrow: "INDUSTRY INTERACTION",
    title: "Connect learning to opportunity.",
    text: "Workshops, skill-development activities, industry exposure and placement-oriented opportunities connect classroom learning to careers.",
    tags: ["Workshops", "Skill Development", "Placement", "Industry"]
  },
  ideaLab: {
    eyebrow: "INNOVATION",
    title: "IDEA Lab",
    text: "An innovation-oriented space where students can explore ideas, prototyping and making as part of a hands-on learning environment.",
    tags: ["Innovation", "Prototyping", "Making"]
  },
  computing: {
    eyebrow: "TECHNOLOGY",
    title: "Central Computing Facility",
    text: "Centralised computing labs support teaching, learning, programming practice and technology-enabled campus activities.",
    tags: ["Computing", "Labs", "Learning"]
  },
  itInfra: {
    eyebrow: "TECHNOLOGY",
    title: "IT Infrastructure",
    text: "Campus-wide network, connectivity and ICT-enabled classrooms and seminar halls support everyday academic life.",
    tags: ["Network", "ICT Classrooms", "Seminar Halls"]
  },
  hostel: {
    eyebrow: "CAMPUS LIVING",
    title: "Hostel life",
    text: "Separate hostels for boys and girls with residential facilities, Wi-Fi, reading spaces, mess/food services, fitness, sports and student support.",
    tags: ["Boys Hostel", "Girls Hostel", "Wi-Fi", "Reading Rooms", "Mess"]
  },
  sports: {
    eyebrow: "CAMPUS LIFE",
    title: "Sports & Games",
    text: "Outdoor and indoor games — including football, cricket, basketball, volleyball, badminton and athletics — support recreation and team life.",
    tags: ["Football", "Cricket", "Basketball", "Volleyball", "Badminton"]
  },
  fitness: {
    eyebrow: "WELLNESS",
    title: "Fitness Centre",
    text: "A dedicated on-campus fitness centre supports regular training and wellness alongside sports and games facilities.",
    tags: ["Gym", "Wellness", "Training"]
  },
  cafeteria: {
    eyebrow: "CAMPUS LIFE",
    title: "Cafeteria",
    text: "The cafeteria provides freshly prepared, affordable food and a social space for students between classes and activities.",
    tags: ["Food", "Student Hangout", "Affordable"]
  },
  transport: {
    eyebrow: "CONVEYANCE",
    title: "College bus services",
    text: "FISAT operates college transport for day scholars across routes connecting the campus with parts of the district.",
    tags: ["Day Scholars", "College Buses", "Routes"]
  },
  bank: {
    eyebrow: "CAMPUS SERVICE",
    title: "Bank & ATM",
    text: "On-campus banking and ATM services make everyday student transactions convenient and accessible.",
    tags: ["Banking", "ATM", "On Campus"]
  },
  futureSkills: {
    eyebrow: "FUTURE READY",
    title: "Centre for Future Skills",
    text: "Future-facing skill development complements academic learning and helps students prepare for changing technology and career environments.",
    tags: ["Future Skills", "Career Readiness", "Technology"]
  },
  language: {
    eyebrow: "COMMUNICATION",
    title: "Language Lab",
    text: "The language lab supports communication and employability skills — an important part of academic and professional development.",
    tags: ["Communication", "Employability", "Language"]
  },
  robotics: {
    eyebrow: "INNOVATION",
    title: "Robotics Lab",
    text: "A hands-on space for automation, electronics and robotics projects, supporting student builds, competitions and experimentation.",
    tags: ["Robotics", "Automation", "Projects"]
  },
  arts: {
    eyebrow: "CAMPUS LIFE",
    title: "Arts",
    text: "Creative and cultural spaces and activities — part of official Facilities & Resources alongside sports and campus life.",
    tags: ["Culture", "Creativity", "Events"]
  },
  ict: {
    eyebrow: "LEARNING SPACES",
    title: "ICT Classrooms & Seminar Halls",
    text: "ICT-enabled classrooms and seminar halls support modern teaching, presentations and academic events across departments.",
    tags: ["Smart Classrooms", "Seminar Halls", "ICT"]
  },
  artsSports: {
    eyebrow: "HAPPENINGS",
    title: "Arts & Sports",
    text: "A peek into arts, athletics and team activities at FISAT. See the official activity categories for galleries and reports.",
    tags: ["Arts", "Sports", "Activities"]
  },
  socialCommit: {
    eyebrow: "HAPPENINGS",
    title: "Social Commitments",
    text: "Outreach and responsibility initiatives connect students with the wider community beyond the campus.",
    tags: ["Outreach", "Community", "Service"]
  },
  curricular: {
    eyebrow: "HAPPENINGS",
    title: "Curricular & Co-Curricular",
    text: "Workshops, technical programs, conferences and student chapters that extend learning beyond the syllabus.",
    tags: ["Workshops", "Chapters", "Conferences"]
  },
  researchCell: {
    eyebrow: "RESEARCH",
    title: "College Research Cell",
    text: "Coordination and support for research across departments. See the official College Research Cell page for projects and policies.",
    tags: ["Research", "Publications", "Support"]
  },
  conference: {
    eyebrow: "RESEARCH",
    title: "i-SMaRT 2026",
    text: "4th International Conference on Sustainable Materials, Manufacturing and Renewable Technologies — call for papers (18 Nov 2026).",
    tags: ["Conference", "Call for Papers", "ME"]
  },
  phd: {
    eyebrow: "RESEARCH",
    title: "Doctoral Distinction",
    text: "Research achievements highlighted in the Campus Gazette — e.g. doctoral distinctions and Idea Lab patents.",
    tags: ["PhD", "Gazette", "Achievement"]
  }
};

const modal = document.getElementById("infoModal");
const modalTitle = document.getElementById("modalTitle");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalText = document.getElementById("modalText");
const modalTags = document.getElementById("modalTags");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");
let modalOpener = null;

function openModal(key) {
  const data = modalData[key];
  if (!data || !modal) return;

  if (modalEyebrow) modalEyebrow.textContent = data.eyebrow;
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalText) modalText.textContent = data.text;
  if (modalTags) modalTags.innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join("");

  modalOpener = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  if (modalClose) modalClose.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  if (modalOpener && modalOpener.focus) {
    modalOpener.focus();
    modalOpener = null;
  }
}

document.querySelectorAll("[data-modal]").forEach(button => {
  button.addEventListener("click", () => openModal(button.dataset.modal));
});

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

/* ---------- Academic department modal ---------- */
document.querySelectorAll("[data-dept]").forEach(button => {
  button.addEventListener("click", () => {
    const department = button.dataset.dept;
    if (!modal) return;

    if (modalEyebrow) modalEyebrow.textContent = "ACADEMICS";
    if (modalTitle) modalTitle.textContent = department;
    if (modalText) {
      modalText.textContent =
        "Explore this academic area through the official FISAT academic pages. This overview is intentionally brief — connect it to the detailed department page before publishing.";
    }
    if (modalTags) {
      modalTags.innerHTML = "<span>Curriculum</span><span>Faculty</span><span>Facilities</span><span>Department Page</span>";
    }

    modalOpener = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
  });
});

/* ---------- Campus explorer ---------- */
const campusInfo = document.getElementById("campusInfo");

const campusData = {
  "Main Academic Block": {
    title: "Main Academic Block",
    text: "The main building houses academic and administrative spaces including classrooms, offices, seminar facilities and central resources."
  },
  "Central Library": {
    title: "Central Library",
    text: "A central learning resource with print and digital materials, online resources, OPAC, study spaces and research support."
  },
  "Hostels": {
    title: "Hostels",
    text: "Separate hostels for boys and girls support student life with accommodation, reading rooms, Wi-Fi, food, fitness, sports and student support."
  },
  "Fitness & Sports": {
    title: "Fitness & Sports",
    text: "A dedicated fitness centre alongside indoor and outdoor sports facilities for recreation and training."
  },
  "Cafeteria": {
    title: "Cafeteria",
    text: "A convenient campus food space and social meeting point for students."
  },
  "IDEA Lab": {
    title: "IDEA Lab",
    text: "An innovation and making space for student prototypes, experiments and project work."
  }
};

document.querySelectorAll(".map-pin").forEach(pin => {
  pin.addEventListener("click", () => {
    document.querySelectorAll(".map-pin").forEach(item => item.classList.remove("selected"));
    pin.classList.add("selected");

    const data = campusData[pin.dataset.location];
    if (!data || !campusInfo) return;

    campusInfo.innerHTML = `
      <p class="eyebrow">CAMPUS EXPLORER</p>
      <h3>${data.title}</h3>
      <p>${data.text}</p>
      <div class="campus-stat">
        <strong>${pin.dataset.location}</strong>
        <span>Tap another pin to continue exploring.</span>
      </div>
    `;
  });
});

/* ---------- Jubilee timeline scroll activation ---------- */
const timelineItems = document.querySelectorAll(".timeline-item");
if ("IntersectionObserver" in window && timelineItems.length) {
  const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timelineItems.forEach(item => item.classList.remove("active"));
        entry.target.classList.add("active", "in-view");
      }
    });
  }, { rootMargin: "-40% 0px -40% 0px" });

  timelineItems.forEach(item => timelineObserver.observe(item));
}

/* ---------- Story slider (5 stories + dots) ---------- */
const stories = [...document.querySelectorAll(".person-story")];
const storyDotsWrap = document.getElementById("storyDots");
let storyIndex = 0;

function buildDots() {
  if (!storyDotsWrap || !stories.length) return;
  storyDotsWrap.innerHTML = "";
  stories.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to story ${i + 1}`);
    dot.setAttribute("role", "tab");
    if (i === storyIndex) dot.classList.add("active");
    dot.addEventListener("click", () => showStory(i));
    storyDotsWrap.appendChild(dot);
  });
}

function showStory(index) {
  if (!stories.length) return;
  storyIndex = (index + stories.length) % stories.length;
  stories.forEach((story, i) => story.classList.toggle("active", i === storyIndex));
  if (storyDotsWrap) {
    [...storyDotsWrap.children].forEach((dot, i) => {
      dot.classList.toggle("active", i === storyIndex);
    });
  }
}

const storyNext = document.getElementById("storyNext");
const storyPrev = document.getElementById("storyPrev");
if (storyNext) storyNext.addEventListener("click", () => showStory(storyIndex + 1));
if (storyPrev) storyPrev.addEventListener("click", () => showStory(storyIndex - 1));

buildDots();
showStory(0);

/* ---------- Then vs Now slider ---------- */
const thenNowFrame = document.getElementById("thenNowFrame");
const thenLayer = document.getElementById("thenLayer");
const thenHandle = document.getElementById("thenNowHandle");
let thenPercent = 50;
let thenDragging = false;

function setThenNow(percent) {
  thenPercent = Math.min(100, Math.max(0, Number(percent) || 0));

  if (thenLayer) {
    const rightClip = 100 - thenPercent;
    const clip = `inset(0 ${rightClip}% 0 0)`;
    thenLayer.style.clipPath = clip;
    thenLayer.style.webkitClipPath = clip;
  }

  if (thenHandle) {
    thenHandle.style.left = thenPercent + "%";
    thenHandle.setAttribute("aria-valuenow", String(Math.round(thenPercent)));
  }
}

function thenNowFromEvent(event) {
  if (!thenNowFrame) return;

  const rect = thenNowFrame.getBoundingClientRect();
  if (!rect.width) return;

  let clientX = event.clientX;
  if (!Number.isFinite(clientX) && event.touches && event.touches.length) {
    clientX = event.touches[0].clientX;
  }
  if (!Number.isFinite(clientX)) return;

  const percent = ((clientX - rect.left) / rect.width) * 100;
  setThenNow(percent);
}

function stopThenNowDrag() {
  thenDragging = false;
  if (thenNowFrame) thenNowFrame.classList.remove("dragging");
}

if (thenNowFrame && thenLayer && thenHandle) {
  setThenNow(50);

  thenNowFrame.addEventListener("pointerdown", event => {
    thenDragging = true;
    thenNowFrame.classList.add("dragging");
    if (thenNowFrame.setPointerCapture) {
      try { thenNowFrame.setPointerCapture(event.pointerId); } catch (_) {}
    }
    thenNowFromEvent(event);
    event.preventDefault();
  });

  thenNowFrame.addEventListener("pointermove", event => {
    if (!thenDragging) return;
    thenNowFromEvent(event);
    event.preventDefault();
  });

  thenNowFrame.addEventListener("pointerup", stopThenNowDrag);
  thenNowFrame.addEventListener("pointercancel", stopThenNowDrag);
  thenNowFrame.addEventListener("lostpointercapture", stopThenNowDrag);

  thenHandle.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setThenNow(thenPercent - 5);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setThenNow(thenPercent + 5);
    } else if (event.key === "Home") {
      event.preventDefault();
      setThenNow(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setThenNow(100);
    }
  });

  // Mouse/touch fallback for browsers where pointer events are unreliable.
  thenNowFrame.addEventListener("mousedown", event => {
    thenDragging = true;
    thenNowFromEvent(event);
  });

  window.addEventListener("mousemove", event => {
    if (!thenDragging) return;
    thenNowFromEvent(event);
  });

  window.addEventListener("mouseup", stopThenNowDrag);

  thenNowFrame.addEventListener("touchstart", event => {
    thenDragging = true;
    thenNowFromEvent(event);
    event.preventDefault();
  }, { passive: false });

  thenNowFrame.addEventListener("touchmove", event => {
    if (!thenDragging) return;
    thenNowFromEvent(event);
    event.preventDefault();
  }, { passive: false });

  thenNowFrame.addEventListener("touchend", stopThenNowDrag);
}

/* ---------- Search ---------- */
const searchOverlay = document.getElementById("searchOverlay");
const searchOpen = document.getElementById("searchOpen");
const searchClose = document.getElementById("searchClose");
const siteSearch = document.getElementById("siteSearch");
const searchResults = document.getElementById("searchResults");

const searchItems = [
  ["About FISAT", "#about", "Legacy, present and future story."],
  ["Academics", "#academics", "Explore nine academic areas."],
  ["Electronics & Instrumentation Engineering", "#academics", "Department overview."],
  ["Science & Humanities", "#academics", "Department overview."],
  ["Mechanical Engineering", "#academics", "Department overview."],
  ["Computer Applications (MCA)", "#academics", "Department overview."],
  ["Business Administration (MBA)", "#academics", "Department overview."],
  ["Electronics & Communication Engineering", "#academics", "Department overview."],
  ["Electrical & Electronics Engineering", "#academics", "Department overview."],
  ["Civil Engineering", "#academics", "Department overview."],
  ["Computer Science & Engineering", "#academics", "Department overview — CSE."],
  ["Campus Explorer", "#campus", "Interactive stylized campus map."],
  ["Hostel", "#hostel", "Boys & girls hostel, mess, Wi-Fi, support."],
  ["Library", "#library", "Digital library, OPAC, NPTEL, SWAYAM, NDLI."],
  ["IDEA Lab", "#facilities", "Innovation and making space."],
  ["Central Computing Facility", "#facilities", "Computing labs."],
  ["IT Infrastructure", "#facilities", "Network and ICT classrooms."],
  ["Robotics Lab", "#facilities", "Automation and projects."],
  ["Centre for Future Skills", "#future", "Future-ready learning."],
  ["Sports & Games", "#facilities", "Outdoor and indoor games."],
  ["Fitness Centre", "#facilities", "Gym and wellness."],
  ["Cafeteria", "#facilities", "Food and student hangout."],
  ["Conveyance", "#facilities", "College bus services."],
  ["Bank & ATM", "#facilities", "On-campus banking."],
  ["Silver Jubilee — Past Present Future", "#jubilee", "Jubilee timeline story."],
  ["25 Stories", "#stories", "Student, alumni, faculty, staff, innovator voices."],
  ["Then vs Now", "#then-now", "Drag comparison slider."],
  ["The Next 25", "#future", "Future skills, research, entrepreneurship."],
  ["News — Latest from FISAT", "#news", "France Connect, ANSYS FEA, LinkedIn session."],
  ["Events — i-SMaRT, workshops", "#news", "Conference, ANSYS FEA, France Connect events."],
  ["Campus Gazette", "#news", "Thara Varghese, Idea Lab patent, doctoral distinction."],
  ["Happenings — Arts, Social, Curricular", "#happenings", "Arts and sports, social commitments."],
  ["Admissions — UG and PG programs", "#admissions", "B.Tech, MCA, MBA, M.Tech, counselling, rank list."],
  ["Placements", "#placements", "602 offers, TCS, placement diaries, career support."],
  ["Research Cell", "#research", "Research cell, patents, i-SMaRT conference."],
  ["Campus film", "#happenings", "Watch the campus video."],
  ["Contact", "#contact", "Hormis Nagar, Angamaly — phone and email."]
];

function renderSearch(query = "") {
  if (!searchResults) return;
  const q = query.trim().toLowerCase();
  const filtered = searchItems.filter(item =>
    !q || item[0].toLowerCase().includes(q) || item[2].toLowerCase().includes(q)
  );

  searchResults.innerHTML = filtered.length
    ? filtered.map(item => `
      <div class="search-result" data-target="${item[1]}" tabindex="0" role="button">
        <strong>${item[0]}</strong><br>
        <small>${item[2]}</small>
      </div>
    `).join("")
    : `<div class="search-result">No result found. Try “hostel”, “library”, “CSE” or “jubilee”.</div>`;

  searchResults.querySelectorAll("[data-target]").forEach(result => {
    const go = () => {
      closeSearch();
      const target = document.querySelector(result.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    };
    result.addEventListener("click", go);
    result.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
  });
}

function openSearch() {
  if (!searchOverlay) return;
  searchOverlay.classList.add("open");
  body.classList.add("search-open");
  renderSearch(siteSearch ? siteSearch.value : "");
  if (siteSearch) siteSearch.focus();
}

function closeSearch() {
  if (!searchOverlay) return;
  searchOverlay.classList.remove("open");
  body.classList.remove("search-open");
}

if (searchOpen) searchOpen.addEventListener("click", openSearch);
if (searchClose) searchClose.addEventListener("click", closeSearch);
if (siteSearch) siteSearch.addEventListener("input", e => renderSearch(e.target.value));

/* ---------- Toasts ---------- */
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

document.querySelectorAll("[data-toast]").forEach(element => {
  element.addEventListener("click", event => {
    event.preventDefault();
    showToast(element.dataset.toast);
  });
});

/* ---------- Keyboard controls ---------- */
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
    closeSearch();
    if (mainNav) mainNav.classList.remove("open");
  }

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
});

/* ---------- Active navigation ---------- */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => sectionObserver.observe(section));
}

/* ---------- Prevent placeholder links jumping ---------- */
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener("click", event => event.preventDefault());
});

/* ---------- Image diagnostic (open F12 Console to see it) ---------- */
window.addEventListener("load", () => {
  document.querySelectorAll("img").forEach(img => {
    if (!img.complete || img.naturalWidth === 0) {
      console.warn("[FISAT] Image failed to load:", img.getAttribute("src"));
    }
  });
});

/* ---------- Generic tab groups (About + Placements) ---------- */
document.querySelectorAll(".tab-buttons").forEach(group => {
  // Skip the news-filter group, handled separately.
  if (group.querySelector("[data-newstab]")) return;
  const buttons = [...group.querySelectorAll("[data-tab]")];
  if (!buttons.length) return;
  const scope = group.parentElement || document;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      scope.querySelectorAll(".tab-panel").forEach(panel => {
        panel.classList.toggle("active", panel.id === btn.dataset.tab);
      });
    });
  });
});

/* ---------- Programs UG / PG toggle ---------- */
const programBtns = [...document.querySelectorAll(".program-btn")];
programBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    programBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    document.querySelectorAll(".program-panel").forEach(panel => {
      panel.classList.toggle("active", panel.id === "panel-" + btn.dataset.program);
    });
  });
});

/* ---------- News / Events / Gazette filter ---------- */
const newsTabBtns = [...document.querySelectorAll("[data-newstab]")];
const newsPanels = [...document.querySelectorAll(".news-panel")];
newsTabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    newsTabBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    newsPanels.forEach(panel => {
      const show = panel.dataset.panel === btn.dataset.newstab;
      panel.classList.toggle("active", show);
      panel.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    });
  });
});

/* ---------- FAQ accordion ---------- */
document.querySelectorAll(".faq-item").forEach(item => {
  const question = item.querySelector(".faq-q");
  if (!question) return;
  question.addEventListener("click", () => {
    const isOpen = item.classList.toggle("open");
    question.setAttribute("aria-expanded", String(isOpen));
    const sign = question.querySelector("span");
    if (sign) sign.textContent = isOpen ? "–" : "+";
  });
});

/* ---------- Campus film ---------- */
const videoFrame = document.getElementById("videoFrame");
const videoPlay = document.getElementById("videoPlay");

function playCampusFilm() {
  if (!videoFrame) return;

  videoFrame.classList.add("playing");
  videoFrame.innerHTML = `
    <video class="campus-video" controls autoplay playsinline preload="metadata"
      poster="assets/images/fisat_hero_local.jpg">
      <source src="assets/videos/fisat.mp4" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
    <button class="video-close" type="button" aria-label="Close campus film">×</button>
  `;

  const video = videoFrame.querySelector(".campus-video");
  if (video) {
    video.play().catch(() => {});
  }

  const closeButton = videoFrame.querySelector(".video-close");
  if (closeButton) {
    closeButton.addEventListener("click", event => {
      event.stopPropagation();
      resetCampusFilm();
    });
  }
}

function resetCampusFilm() {
  if (!videoFrame) return;
  videoFrame.classList.remove("playing");
  videoFrame.innerHTML = `
    <img class="video-poster" src="assets/images/fisat_hero_local.jpg"
      alt="FISAT campus" data-fallback="https://fisat.ac.in/wp-content/uploads/2022/06/sports-scaled.jpg"
      onerror="if(this.dataset.fallback && this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}else{this.style.display='none';}">
    <span class="video-badge">FISAT · Hormis Nagar</span>
    <span class="video-play" aria-hidden="true">▶</span>
    <span class="video-hint">Play campus film</span>
  `;
}

if (videoFrame) {
  videoFrame.addEventListener("click", event => {
    if (event.target.closest(".video-close") || event.target.closest("video") || videoFrame.classList.contains("playing")) return;
    playCampusFilm();
  });

  videoFrame.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && !videoFrame.classList.contains("playing")) {
      event.preventDefault();
      playCampusFilm();
    }
  });
}

if (videoPlay) videoPlay.addEventListener("click", playCampusFilm);

/* ---------- Silver Jubilee countdown ---------- */
const countdown = document.getElementById("countdown");
let countdownTimer = null;

function updateCountdown() {
  if (!countdown) return;
  const targetValue = countdown.dataset.countdownDate;
  const units = {
    days: countdown.querySelector('[data-unit="days"]'),
    hours: countdown.querySelector('[data-unit="hours"]'),
    minutes: countdown.querySelector('[data-unit="minutes"]'),
    seconds: countdown.querySelector('[data-unit="seconds"]')
  };

  // Keep the component honest until the official celebration date is supplied.
  if (!targetValue || targetValue === "DATE") {
    Object.values(units).forEach(unit => { if (unit) unit.textContent = "—"; });
    return;
  }

  const target = new Date(targetValue).getTime();
  if (Number.isNaN(target)) {
    Object.values(units).forEach(unit => { if (unit) unit.textContent = "—"; });
    return;
  }

  const remaining = Math.max(0, target - Date.now());
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  if (units.days) units.days.textContent = days;
  if (units.hours) units.hours.textContent = String(hours).padStart(2, "0");
  if (units.minutes) units.minutes.textContent = String(minutes).padStart(2, "0");
  if (units.seconds) units.seconds.textContent = String(seconds).padStart(2, "0");

  if (remaining === 0 && countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
}

if (countdown) {
  updateCountdown();
  if (countdown.dataset.countdownDate && countdown.dataset.countdownDate !== "DATE") {
    countdownTimer = setInterval(updateCountdown, 1000);
  }
}

/* ---------- One-time Jubilee sparkle/confetti ---------- */
function launchJubileeConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const layer = document.createElement("div");
  layer.className = "jubilee-confetti";
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 28; i += 1) {
    const piece = document.createElement("span");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--x", `${(Math.random() - 0.5) * 180}px`);
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    fragment.appendChild(piece);
  }

  layer.appendChild(fragment);
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 3000);
}

window.addEventListener("load", () => {
  setTimeout(launchJubileeConfetti, 250);
});

/* ---------- Lazy-load non-critical images ---------- */
document.querySelectorAll("img").forEach(img => {
  const isCritical = img.closest(".hero-photo") || img.classList.contains("brand-logo");
  if (!isCritical && !img.hasAttribute("loading")) img.loading = "lazy";
  if (!img.hasAttribute("decoding")) img.decoding = "async";
});
