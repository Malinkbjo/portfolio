const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/* =========================================================
   GLOBAL ELEMENTS
   ========================================================= */

const header = document.querySelector(".site-header");
const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");

const about = document.querySelector(".about");
const aboutCopy = document.querySelector(".about-rise-copy");
const aboutCard = document.querySelector(".about-rise-card");
const aboutLink = document.querySelector('.nav a[href="#about"]');
const aboutClose = document.querySelector(".about-close");

const thankSection = document.querySelector(".thank-you");
const thankTop = document.querySelector(".thank-line-top");
const thankBottom = document.querySelector(".thank-line-bottom");
const thankEmail = document.querySelector(".contact-email");
const thankLinkedin = document.querySelector(".contact-linkedin");

const projects = [...document.querySelectorAll(".project")];

const projectList = document.querySelector(".project-list");
const liftoffProject = document.querySelector("#project-liftoff");
const participatoryProject = document.querySelector("#project-participatory");

function setMobileNavOpen(open) {
  document.body.classList.toggle("mobile-nav-open", open);
  nav?.classList.toggle("is-open", open);
  navToggle?.setAttribute("aria-expanded", String(open));
  navToggle?.setAttribute("aria-label", open ? "Lukk meny" : "Åpne meny");
}

navToggle?.addEventListener("click", () => {
  setMobileNavOpen(!nav?.classList.contains("is-open"));
});

nav?.querySelectorAll("a, button").forEach(item => {
  item.addEventListener("click", () => setMobileNavOpen(false));
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") setMobileNavOpen(false);
});

if (projectList && liftoffProject && participatoryProject) {
  projectList.insertBefore(liftoffProject, participatoryProject);
  projects.splice(0, projects.length, ...projectList.querySelectorAll(".project"));
}

function setAboutOpen(open, scroll = false) {
  if (!about) return;

  about.classList.toggle("is-open", open);
  about.setAttribute("aria-hidden", String(!open));
  aboutLink?.setAttribute("aria-expanded", String(open));

  if (open && scroll) {
    requestAnimationFrame(() => {
      updateAbout();
      const offset = header?.offsetHeight || 0;
      const top = about.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }
}

aboutLink?.addEventListener("click", event => {
  event.preventDefault();
  setAboutOpen(true, true);
});

aboutClose?.addEventListener("click", () => {
  setAboutOpen(false);
  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll('.nav a[href="#projects"], .nav a[href="#contact"]').forEach(link => {
  link.addEventListener("click", () => setAboutOpen(false));
});


/* =========================================================
   ABOUT
   ========================================================= */

function updateAbout() {
  if (!about || !aboutCopy || !aboutCard) return;

  const rect = about.getBoundingClientRect();
  const vh = window.innerHeight;

  const progress = clamp(
    (vh * 0.95 - rect.top) / (vh * 0.85),
    0,
    1
  );

  const ease = value =>
    1 - Math.pow(1 - value, 4);


  /* -------------------------
     TEXT
     ------------------------- */

  const textProgress = clamp(
    progress / 0.7,
    0,
    1
  );

  const textEase = ease(textProgress);

  aboutCopy.style.opacity = textEase;

  aboutCopy.style.transform =
    `translateY(${(1 - textEase) * 90}px)
     scale(${0.97 + textEase * 0.03})`;


  const textElements =
    aboutCopy.querySelectorAll("h2, p");

  textElements.forEach((element, index) => {

    const start = index * 0.16;

    const local = clamp(
      (textProgress - start) /
      (1 - start || 1),
      0,
      1
    );

    const localEase = ease(local);

    element.style.opacity = localEase;

    element.style.transform =
      `translateY(${(1 - localEase) * 36}px)`;
  });


  /* -------------------------
     EDUCATION
     ------------------------- */

  const cardProgress = clamp(
    (progress - 0.3) / 0.7,
    0,
    1
  );

  const cardEase = ease(cardProgress);

  aboutCard.style.opacity = cardEase;

  aboutCard.style.transform =
    `translate(
      ${(1 - cardEase) * window.innerWidth * 0.4}px,
      ${(1 - cardEase) * 30}px
    )
    scale(${0.95 + cardEase * 0.05})`;


  const educationLine =
    aboutCard.querySelector(".education-line");

  if (educationLine) {
    educationLine.style.transformOrigin = "top";
    educationLine.style.transform =
      `scaleY(${cardEase})`;
  }


  const educationItems =
    aboutCard.querySelectorAll(".education-item");

  educationItems.forEach((item, index) => {

    const start =
      0.2 + index * 0.35;

    const local = clamp(
      (cardProgress - start) /
      (1 - start || 1),
      0,
      1
    );

    const localEase = ease(local);

    item.style.opacity = localEase;

    item.style.transform =
      `translateX(${(1 - localEase) * 46}px)`;
  });


  /* -------------------------
     EXIT TOWARDS PROJECTS
     ------------------------- */

  const exitProgress = clamp(
    (
      -rect.top -
      about.offsetHeight * 0.42
    ) /
    (vh * 0.55),
    0,
    1
  );

  const exitEase =
    exitProgress *
    exitProgress *
    (3 - 2 * exitProgress);


  if (exitProgress > 0) {

    aboutCopy.style.transform =
      `translateY(${-exitEase * 140}px)
       scale(${1 - exitEase * 0.04})`;

    aboutCard.style.transform =
      `translate(
        ${exitEase * 50}px,
        ${-exitEase * 110}px
      )
      scale(${1 - exitEase * 0.03})`;
  }
}


/* =========================================================
   THANK YOU / CONTACT
   ========================================================= */

function updateThankYou() {
  if (!thankSection || !thankTop || !thankBottom) return;

  const rect =
    thankSection.getBoundingClientRect();

  const vh =
    window.innerHeight;

  const travel = Math.max(
    thankSection.offsetHeight,
    1
  );

  const progress = clamp(
    (vh * 1.3 - rect.top) / travel,
    0,
    1
  );


  /* CONTACT */

  const bottomProgress = clamp(
    progress / 0.88,
    0,
    1
  );

  const bottomEase =
    bottomProgress *
    bottomProgress *
    (3 - 2 * bottomProgress);

  thankBottom.style.opacity =
    0.05 + bottomEase * 0.95;

  thankBottom.style.transform =
    `translateY(${
      170 - bottomEase * 170
    }px)`;


  /* TA GJERNE */

  const topProgress = clamp(
    (progress - 0.04) / 0.88,
    0,
    1
  );

  const topEase =
    topProgress *
    topProgress *
    (3 - 2 * topProgress);

  thankTop.style.opacity =
    0.05 + topEase * 0.95;

  thankTop.style.transform =
    `translateY(${
      320 - topEase * 320
    }px)`;


  /* EMAIL */

  const emailProgress = clamp(
    (progress - 0.48) / 0.38,
    0,
    1
  );

  const emailEase =
    1 - Math.pow(
      1 - emailProgress,
      3
    );

  if (thankEmail) {

    thankEmail.style.opacity =
      emailEase;

    thankEmail.style.transform =
      `translateY(${
        (1 - emailEase) * 95
      }px)`;
  }


  /* LINKEDIN */

  const linkedinProgress = clamp(
    (progress - 0.62) / 0.34,
    0,
    1
  );

  const linkedinEase =
    1 - Math.pow(
      1 - linkedinProgress,
      3
    );

  if (thankLinkedin) {

    thankLinkedin.style.opacity =
      linkedinEase;

    thankLinkedin.style.transform =
      `translateY(${
        (1 - linkedinEase) * 95
      }px)`;
  }
}


/* =========================================================
   HEADER
   ========================================================= */

function updateHeader() {
  header?.classList.toggle(
    "scrolled",
    window.scrollY > 40
  );
}


/* =========================================================
   PROJECT CASE PREPARATION
   Wrap existing case text and reuse imagery in sticky column
   ========================================================= */

function prepareProjectCases() {

  projects.forEach(project => {

    const grid =
      project.querySelector(".detail-grid");

    if (!grid) return;

    if (grid.dataset.prepared === "true") {
      return;
    }

    grid.dataset.prepared = "true";


    /* -------------------------
       TEXT COLUMN
       ------------------------- */

    const text =
      document.createElement("div");

    text.className = "detail-text";

    [...grid.children].forEach(child => {
      text.appendChild(child);
    });


    /* -------------------------
       IMAGE COLUMN
       ------------------------- */

    const media =
      document.createElement("aside");

    media.className = "detail-media";

    media.setAttribute(
      "aria-label",
      "Prosjektbilder"
    );


    /* Normal preview cards */

    let sourceImages = [
      ...project.querySelectorAll(
        ".preview-card"
      )
    ].filter(card =>
      card.getAttribute("aria-hidden") !== "true"
    );


    /* Use each project's complete scrolling gallery in the viewer */

    const galleryImages = [
      ...project.querySelectorAll(
        ".case-gallery-card"
      )
    ];

    if (galleryImages.length) {
      sourceImages = galleryImages;
    }

    media.classList.add(
      "detail-media-gallery"
    );


    /* Tangible / Participatory image stacks */

    if (!sourceImages.length) {

      const stackImages = [
        ...project.querySelectorAll(
          ".stack-image"
        )
      ];

      sourceImages = stackImages;
    }


    const cloneImage = source => {
      const clone =
        source.cloneNode(true);

      clone.classList.add(
        "detail-media-card"
      );

      clone.removeAttribute(
        "aria-hidden"
      );

      return clone;
    };

    const useSlideshow =
      project.dataset.imageSlideshow === "true" &&
      sourceImages.length > 3;

    const staticImages = useSlideshow
      ? sourceImages.slice(0, 2)
      : sourceImages;

    staticImages.forEach(source => {
      media.appendChild(
        cloneImage(source)
      );
    });


    if (useSlideshow) {

      const slideshow =
        document.createElement("div");

      slideshow.className =
        "detail-media-slideshow";

      const slides = sourceImages
        .slice(2)
        .map(source => {
          const slide = cloneImage(source);
          slide.classList.add(
            "detail-media-slide"
          );
          slideshow.appendChild(slide);
          return slide;
        });

      let activeSlide = 0;

      const controls =
        document.createElement("div");

      controls.className =
        "detail-media-controls";

      const previousButton =
        document.createElement("button");

      previousButton.type = "button";
      previousButton.className =
        "detail-media-control";
      previousButton.textContent = "←";
      previousButton.setAttribute(
        "aria-label",
        "Forrige bilde / Previous image"
      );

      const counter =
        document.createElement("span");

      counter.className =
        "detail-media-counter";

      const nextButton =
        document.createElement("button");

      nextButton.type = "button";
      nextButton.className =
        "detail-media-control";
      nextButton.textContent = "→";
      nextButton.setAttribute(
        "aria-label",
        "Neste bilde / Next image"
      );

      const showSlide = index => {
        activeSlide =
          (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
          const isActive =
            slideIndex === activeSlide;

          slide.classList.toggle(
            "is-active",
            isActive
          );

          slide.setAttribute(
            "aria-hidden",
            String(!isActive)
          );
        });

        counter.textContent =
          `${activeSlide + 1} / ${slides.length}`;
      };

      previousButton.addEventListener(
        "click",
        () => showSlide(activeSlide - 1)
      );

      nextButton.addEventListener(
        "click",
        () => showSlide(activeSlide + 1)
      );

      controls.append(
        previousButton,
        counter,
        nextButton
      );

      slideshow.appendChild(controls);
      media.appendChild(slideshow);
      showSlide(0);
    }


    grid.append(
      text,
      media
    );

    const details =
      project.querySelector(
        ".project-details"
      );

    if (details) {
      const closeWrap =
        document.createElement("div");

      closeWrap.className =
        "project-close-wrap";

      const closeButton =
        document.createElement("button");

      closeButton.type = "button";
      closeButton.className =
        "project-close-button";

      const closeLabel =
        document.createElement("span");

      closeLabel.dataset.no =
        "Lukk prosjekt";
      closeLabel.dataset.en =
        "Close project";
      closeLabel.textContent =
        "Lukk prosjekt";

      const closeIcon =
        document.createElement("span");

      closeIcon.setAttribute(
        "aria-hidden",
        "true"
      );
      closeIcon.textContent = "↑";

      closeButton.append(
        closeLabel,
        closeIcon
      );

      closeButton.addEventListener(
        "click",
        () => {
          project.classList.remove("open");
          updateProjectButton(project, false);

          requestAnimationFrame(() => {
            project.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          });
        }
      );

      closeWrap.appendChild(closeButton);
      details.appendChild(closeWrap);
    }
  });
}

function prioritiseProjectProcess() {
  projects.forEach(project => {
    const grid = project.querySelector(".detail-grid");
    if (!grid) return;

    const sections = [...grid.children];
    const rank = section => {
      const label = section.querySelector(".detail-label")?.dataset.no || "";

      if (label === "Designprosess") return 30;
      if (
        label === "Utfordring" ||
        label === "Utfordringer" ||
        label === "Begrensninger" ||
        label === "Metodisk begrensning" ||
        label === "Hva jeg ville gjort annerledes" ||
        label === "Hvis jeg skulle gjort noe annerledes"
      ) return 40;
      if (label === "Refleksjon" || label === "Hva jeg lærte") return 45;
      if (label === "Løsning" || label === "Interaksjon og teknologi") return 50;
      if (label === "Resultat") return 60;
      return 10;
    };

    sections
      .map((section, index) => ({ section, index, rank: rank(section) }))
      .sort((a, b) => a.rank - b.rank || a.index - b.index)
      .forEach(({ section }) => grid.appendChild(section));
  });
}

prioritiseProjectProcess();
prepareProjectCases();

function buildAlternatingProjectStories() {
  const preferredSectionIndexes = {
    "project-tanum": [2, 2, 2],
    "project-edutopia": [2, 2, 2, 2, 3, 4, 4],
    "project-participatory": [2, 3, 3, 3, 4, 5],
    "project-sustained": [2, 2, 3, 3],
    "project-liftoff": [3, 3, 3, 4, 4]
  };
  const projectFacts = {
    "project-tanum": [
      ["Omfang", "Scope", "Responsiv nettside", "Responsive website"],
      ["Rolle", "Role", "UX/UI-designer og front-end", "UX/UI designer and front-end"],
      ["Samarbeid", "Collaboration", "Kundeprosjekt · individuelt", "Client project · individual"],
      ["Prosjektperiode", "Project period", "2026", "2026"]
    ],
    "project-edutopia": [
      ["Omfang", "Scope", "DHIS2-webapp", "DHIS2 web app"],
      ["Rolle", "Role", "UX/UI-design og front-end", "UX/UI design and front-end"],
      ["Samarbeid", "Collaboration", "Tverrfaglig team på 5: 2 designere, 2 utviklere, 1 digital økonomi", "Interdisciplinary team of 5, 2 designers, 2 developers, 1 digital economy student"],
      ["Varighet", "Duration", "2 måneder", "2 months"]
    ],
    "project-participatory": [
      ["Omfang", "Scope", "Mobilapp og deltakende design", "Mobile app and participatory design"],
      ["Rolle", "Role", "UX/UI-designer", "UX/UI designer"],
      ["Samarbeid", "Collaboration", "Teamprosjekt med studenter", "Team project with students"],
      ["Prosjektperiode", "Project period", "2025", "2025"]
    ],
    "project-sustained": [
      ["Omfang", "Scope", "Interaktiv fysisk installasjon", "Interactive physical installation"],
      ["Rolle", "Role", "Interaksjonsdesign og prototyping", "Interaction design and prototyping"],
      ["Samarbeid", "Collaboration", "Team på fem", "Team of five"],
      ["Varighet", "Duration", "3 uker", "3 weeks"]
    ],
    "project-liftoff": [
      ["Omfang", "Scope", "Android-app", "Android app"],
      ["Rolle", "Role", "Designer og front-end-utvikler", "Designer and front-end developer"],
      ["Samarbeid", "Collaboration", "Tverrfaglig team på 6; 2 designere, 3 utviklere, 1 robotikk", "Interdisciplinary team of 6, 2 designers, 3 developers, 1 robotics"],
      ["Varighet", "Duration", "3 måneder", "3 months"]
    ]
  };
  const finalSolutionImages = {
    "project-tanum": [
      ["pictures/tanum2.png", "Ferdig side for oppstalling"],
      ["pictures/tanum3.png", "Ferdig side for undervisning"]
    ],
    "project-edutopia": [
      ["pictures/finalResultP.png", "Endelig løsning for School Inspection"],
      ["pictures/finalResultP2.png", "Endelig løsning for inspeksjonsoversikten"],
      ["pictures/finalResultP3.png", "Endelig løsning for registrering av skoleinspeksjon"]
    ],
    "project-participatory": [
      ["pictures/pd-progress.png", "Endelig prototype for fremgang"],
      ["pictures/pd-break.png", "Endelig prototype for pauseoversikt"],
      ["pictures/pd-groups.png", "Endelig prototype for grupper"],
      ["pictures/pd-goals.png", "Endelig prototype for mål"]
    ],
    "project-sustained": [
      ["pictures/tangiblePeople.jpeg", "Publikum samhandler med Sustained by Voices"],
      ["pictures/sustained3.png", "Den ferdige installasjonen i sammenkrøpet posisjon"]
    ],
    "project-liftoff": [
      ["pictures/liftOff1.png", "Endelig LiftOff-løsning"],
      ["pictures/liftoff2.png", "Videreutviklet LiftOff-løsning"],
      ["pictures/liftoff3.png", "LiftOff-visninger for regelverk og grenseverdier"]
    ]
  };

  projects.forEach(project => {
    const grid = project.querySelector(".detail-grid");
    const text = grid?.querySelector(".detail-text");
    const media = grid?.querySelector(".detail-media");
    if (!grid || !text || !media) return;

    /* Keep the small context label above the introduction, but remove the
       repeated oversized heading from the start of each case study. */
    text.querySelectorAll(".detail-lead").forEach(lead => {
      const label = lead.querySelector(".detail-label");
      const introduction = lead.nextElementSibling;

      if (label && introduction?.classList.contains("detail-copy")) {
        introduction.prepend(label);
      }

      lead.remove();
    });

    const sections = [...text.children];
    const contentSections = sections.filter(section =>
      !section.classList.contains("detail-context")
    );
    const imageElements = [...media.querySelectorAll(".detail-media-card img")]
      .filter((image, index, images) =>
        images.findIndex(candidate =>
          candidate.getAttribute("src") === image.getAttribute("src")
        ) === index
      );

    const finalEntries = finalSolutionImages[project.id] || [];
    const finalSources = new Set(finalEntries.map(([source]) => source));
    let narrativeImages = imageElements.filter(image =>
      !finalSources.has(image.getAttribute("src"))
    );

    if (project.id === "project-tanum") {
      const processItems = [...text.querySelectorAll(".process-list li")];
      const inlinePlacements = [
        [narrativeImages.find(image => image.getAttribute("src") === "pictures/analyseTanum.png"), processItems[0]],
        [narrativeImages.find(image => image.getAttribute("src") === "pictures/tidligPrototypeTanum.png"), processItems[1]]
      ];

      inlinePlacements.forEach(([image, item], placementIndex) => {
        if (!image || !item) return;

        const figure = document.createElement("figure");
        figure.className = "process-inline-image";
        figure.appendChild(image);
        item.classList.add("has-process-image");
        item.classList.add(placementIndex % 2 === 0 ? "process-image-right" : "process-image-left");
        item.appendChild(figure);

        const marker = item.querySelector(":scope > b");
        const copy = item.querySelector(":scope > span");
        if (marker && copy) {
          const copyWrap = document.createElement("div");
          copyWrap.className = "process-point-copy";
          copyWrap.append(marker, copy);
          item.prepend(copyWrap);
        }
      });

      narrativeImages = narrativeImages.filter(image =>
        !inlinePlacements.some(([placedImage]) => placedImage === image)
      );
    }

    if (project.id === "project-edutopia") {
      const processItems = [...text.querySelectorAll(".process-list li")];
      const inlinePlacements = [
        [narrativeImages.find(image => image.getAttribute("src") === "pictures/platformsPersonas.png"), processItems[0]],
        [narrativeImages.find(image => image.getAttribute("src") === "pictures/platformsTidligPrototype.png"), processItems[1]],
        [narrativeImages.find(image => image.getAttribute("src") === "pictures/platforms2.png"), processItems[2]],
        [narrativeImages.find(image => image.getAttribute("src") === "pictures/platformsWorkshop.jpeg"), processItems[3]]
      ];

      inlinePlacements.forEach(([image, item]) => {
        if (!image || !item) return;

        const figure = document.createElement("figure");
        figure.className = "process-inline-image platform-process-image";
        figure.appendChild(image);
        item.classList.add("has-process-image");
        item.appendChild(figure);
      });

      processItems.filter(item => item.classList.contains("has-process-image")).forEach(item => {
        const marker = item.querySelector(":scope > b");
        const copy = item.querySelector(":scope > span");
        if (!marker || !copy) return;

        const copyWrap = document.createElement("div");
        copyWrap.className = "process-point-copy";
        copyWrap.append(marker, copy);
        item.prepend(copyWrap);
      });

      narrativeImages = narrativeImages.filter(image =>
        !inlinePlacements.some(([placedImage]) => placedImage === image)
      );
    }

    if (project.id === "project-liftoff") {
      const processItems = [...text.querySelectorAll(".process-list li")];
      const inlinePlacements = [
        [[narrativeImages.find(image => image.getAttribute("src") === "pictures/intervjuPortal.png")], processItems[0]],
        [[
          narrativeImages.find(image => image.getAttribute("src") === "pictures/liftOff-early.png"),
          narrativeImages.find(image => image.getAttribute("src") === "pictures/liftoff-early2.png")
        ], processItems[1]],
        [[narrativeImages.find(image => image.getAttribute("src") === "pictures/protoLiftOff.png")], processItems[2]],
        [[narrativeImages.find(image => image.getAttribute("src") === "pictures/testingLiftOff.png")], processItems[3]]
      ];

      inlinePlacements.forEach(([images, item]) => {
        const availableImages = images.filter(Boolean);
        if (!availableImages.length || !item) return;

        const figure = document.createElement("figure");
        figure.className = "process-inline-image liftoff-process-image";
        if (availableImages.length > 1) figure.classList.add("process-inline-image-pair");
        figure.append(...availableImages);
        item.classList.add("has-process-image");
        item.appendChild(figure);
      });

      processItems.filter(item => item.classList.contains("has-process-image")).forEach(item => {
        const marker = item.querySelector(":scope > b");
        const copy = item.querySelector(":scope > span");
        if (!marker || !copy) return;

        const copyWrap = document.createElement("div");
        copyWrap.className = "process-point-copy";
        copyWrap.append(marker, copy);
        item.prepend(copyWrap);
      });

      narrativeImages = narrativeImages.filter(image =>
        !inlinePlacements.some(([placedImages]) => placedImages.includes(image))
      );
    }

    if (project.id === "project-participatory") {
      const processItems = [...text.querySelectorAll(".process-list li")];
      const inlinePlacements = [
        [[narrativeImages.find(image => image.getAttribute("src") === "pictures/pdw1.png")], processItems[0]],
        [[narrativeImages.find(image => image.getAttribute("src") === "pictures/pdw2.png")], processItems[1]],
        [[narrativeImages.find(image => image.getAttribute("src") === "pictures/pdskisse4.png")], processItems[2]]
      ];

      inlinePlacements.forEach(([images, item]) => {
        const availableImages = images.filter(Boolean);
        if (!availableImages.length || !item) return;

        const figure = document.createElement("figure");
        figure.className = "process-inline-image participatory-process-image";
        if (availableImages.length > 1) figure.classList.add("process-inline-image-pair");
        if (availableImages.length > 2) figure.classList.add("process-inline-image-trio");
        figure.append(...availableImages);
        item.classList.add("has-process-image");
        item.appendChild(figure);
      });

      processItems.filter(item => item.classList.contains("has-process-image")).forEach(item => {
        const marker = item.querySelector(":scope > b");
        const copy = item.querySelector(":scope > span");
        if (!marker || !copy) return;

        const copyWrap = document.createElement("div");
        copyWrap.className = "process-point-copy";
        copyWrap.append(marker, copy);
        item.prepend(copyWrap);
      });

      narrativeImages = narrativeImages.filter(image =>
        !inlinePlacements.some(([placedImages]) => placedImages.includes(image))
      );
    }

    if (project.id === "project-sustained") {
      const processItems = [...text.querySelectorAll(".process-list li")];
      const processImageSources = [
        ["pictures/tangibleIde.png"],
        ["pictures/tangibleProcess.png", "pictures/sustainedProcess.png"],
        ["pictures/sustained4.jpg"]
      ];
      const placedImages = [];

      processImageSources.forEach((sources, index) => {
        const processItem = processItems[index];
        const images = sources
          .map(source => narrativeImages.find(candidate => candidate.getAttribute("src") === source))
          .filter(Boolean);
        if (!processItem || !images.length) return;

        const figure = document.createElement("figure");
        figure.className = "process-inline-image sustained-process-image";
        if (images.length > 1) figure.classList.add("process-inline-image-pair");
        figure.append(...images);
        processItem.classList.add("has-process-image");
        processItem.appendChild(figure);
        placedImages.push(...images);

        const marker = processItem.querySelector(":scope > b");
        const copy = processItem.querySelector(":scope > span");
        if (marker && copy) {
          const copyWrap = document.createElement("div");
          copyWrap.className = "process-point-copy";
          copyWrap.append(marker, copy);
          processItem.prepend(copyWrap);
        }
      });

      narrativeImages = narrativeImages.filter(candidate => !placedImages.includes(candidate));
    }
    const sectionIndexes = preferredSectionIndexes[project.id] || [];
    const imagesBySection = new Map();

    narrativeImages.forEach((image, imageIndex) => {
      const preferredIndex = sectionIndexes[imageIndex];
      const sectionIndex = Number.isInteger(preferredIndex)
        ? Math.min(preferredIndex, contentSections.length - 1)
        : Math.min(imageIndex, contentSections.length - 1);

      if (!imagesBySection.has(sectionIndex)) imagesBySection.set(sectionIndex, []);
      imagesBySection.get(sectionIndex).push(image);
    });

    const story = document.createDocumentFragment();
    let visualIndex = 0;

    const facts = document.createElement("section");
    facts.className = "project-facts";

    (projectFacts[project.id] || []).forEach(([labelNo, labelEn, valueNo, valueEn]) => {
      const fact = document.createElement("div");
      fact.className = "project-fact";

      const label = document.createElement("span");
      label.dataset.no = labelNo;
      label.dataset.en = labelEn;
      label.textContent = labelNo;

      const value = document.createElement("strong");
      value.dataset.no = valueNo;
      value.dataset.en = valueEn;
      value.textContent = valueNo;

      fact.append(label, value);
      facts.appendChild(fact);
    });

    story.appendChild(facts);

    sections.forEach(section => {
      const row = document.createElement("section");
      row.className = "detail-story-row";

      const sectionLabel = section.querySelector(".detail-label")?.dataset.no || "";
      if (["Utfordring", "Utfordringer", "Begrensninger", "Hva jeg lærte"].includes(sectionLabel)) {
        row.classList.add("compact-text-row");
      }
      if ([
        "Designprosess",
        "Utfordring",
        "Utfordringer",
        "Begrensninger",
        "Metodisk begrensning",
        "Hva jeg ville gjort annerledes",
        "Refleksjon",
        "Hva jeg lærte",
        "Løsning",
        "Interaksjon og teknologi",
        "Resultat"
      ].includes(sectionLabel)) {
        row.classList.add("single-column-row");
      }

      const copy = document.createElement("div");
      copy.className = "detail-story-copy";
      copy.appendChild(section);
      row.appendChild(copy);

      if (section.classList.contains("detail-context")) {
        row.classList.add("context-only");
      } else {
        const sectionIndex = contentSections.indexOf(section);
        const pairedImages = imagesBySection.get(sectionIndex) || [];

        pairedImages.forEach(image => {
          const figure = document.createElement("figure");
          figure.className = "detail-story-media";
          figure.appendChild(image);
          row.appendChild(figure);
        });

        if (pairedImages.length) {
          row.classList.add(visualIndex % 2 === 0 ? "image-right" : "image-left");
          visualIndex += 1;
        } else {
          row.classList.add("text-only");
        }
      }

      story.appendChild(row);
    });

    if (finalEntries.length) {
      const finalSection = document.createElement("section");
      finalSection.className = "detail-final-solution";

      const finalTitle = document.createElement("span");
      finalTitle.className = "detail-label";
      finalTitle.dataset.no = "Endelig løsning";
      finalTitle.dataset.en = "Final solution";
      finalTitle.textContent = "Endelig løsning";

      const finalGallery = document.createElement("div");
      finalGallery.className = "detail-final-gallery";

      finalEntries.forEach(([source, alt]) => {
        const existingImage = imageElements.find(image =>
          image.getAttribute("src") === source
        );
        const image = existingImage || document.createElement("img");

        if (!existingImage) image.src = source;
        if (!image.alt) image.alt = alt;

        const figure = document.createElement("figure");
        figure.appendChild(image);
        finalGallery.appendChild(figure);
      });

      finalSection.append(finalTitle, finalGallery);
      story.appendChild(finalSection);
    }

    text.remove();
    media.remove();
    grid.classList.add("detail-story-layout");
    grid.appendChild(story);
  });
}

buildAlternatingProjectStories();


/* =========================================================
   PROJECT BUTTON STATES
   ========================================================= */

function currentLanguage() {
  return document.documentElement.lang === "en"
    ? "en"
    : "no";
}


function updateProjectButton(
  project,
  open
) {

  const button =
    project.querySelector(".project-toggle");

  if (!button) return;

  button.setAttribute(
    "aria-expanded",
    String(open)
  );

  const label =
    button.querySelector("span:first-child");

  if (!label) return;

  const english =
    currentLanguage() === "en";

  if (open) {

    label.textContent =
      english
        ? "Close"
        : "Lukk";

  } else {
    label.textContent =
      english
        ? "View project"
        : "Se prosjekt";
  }
}


/* =========================================================
   PROJECT OPEN / CLOSE
   ========================================================= */

function closeOtherProjects(activeProject) {

  projects.forEach(project => {

    if (project === activeProject) {
      return;
    }

    project.classList.remove("open");

    updateProjectButton(
      project,
      false
    );
  });
}


function scrollToProjectDetails(project) {

  const details =
    project.querySelector(
      ".project-details"
    );

  if (!details) return;

  const offset =
    header?.offsetHeight || 0;

  const top =
    details.getBoundingClientRect().top +
    window.scrollY -
    offset -
    18;

  window.scrollTo({
    top,
    behavior: "smooth"
  });
}


projects.forEach(project => {

  const button =
    project.querySelector(
      ".project-toggle"
    );

  if (!button) return;


  button.addEventListener(
    "click",
    event => {

      event.preventDefault();
      event.stopPropagation();

      const opening =
        !project.classList.contains(
          "open"
        );


      /* CLOSE */

      if (!opening) {

        project.classList.remove(
          "open"
        );

        updateProjectButton(
          project,
          false
        );

        return;
      }


      /* OPEN */

      project.classList.add(
        "open",
        "is-revealed"
      );

      updateProjectButton(
        project,
        true
      );

      requestAnimationFrame(() => {
        scrollToProjectDetails(project);
      });

    }
  );
});


/* =========================================================
   NEXT PROJECT BUTTONS
   ========================================================= */

document
  .querySelectorAll(".next-project-bar")
  .forEach(bar => {

    bar.addEventListener(
      "click",
      event => {

        event.preventDefault();
        event.stopPropagation();

        const targetId =
          bar.dataset.nextProject;

        if (!targetId) return;

        const target =
          document.getElementById(
            `project-${targetId}`
          );

        if (!target) return;


        closeOtherProjects(
          target
        );

        target.classList.add(
          "open",
          "is-revealed"
        );

        updateProjectButton(
          target,
          true
        );


        window.setTimeout(() => {

          scrollToProjectDetails(
            target
          );

        }, 110);

      }
    );
  });


/* =========================================================
   PROJECT REVEAL ON SCROLL
   ========================================================= */

if ("IntersectionObserver" in window) {

  const projectRevealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "is-revealed"
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.04,
        rootMargin:
          "0px 0px 8% 0px"
      }
    );


  projects.forEach(project => {
    projectRevealObserver.observe(
      project
    );
  });

} else {

  projects.forEach(project =>
    project.classList.add(
      "is-revealed"
    )
  );
}


/* =========================================================
   LANGUAGE
   ========================================================= */

const langToggle =
  document.querySelector(
    ".lang-toggle"
  );

const translatable = [
  ...document.querySelectorAll(
    "[data-no][data-en]"
  )
];

let language = "no";


function setLanguage(lang) {

  language = lang;

  translatable.forEach(element => {

    /*
     Don't overwrite the project button
     labels while they're open.
    */

    if (
      element.closest(".project-toggle") &&
      element.closest(".project")?.classList.contains("open")
    ) {
      return;
    }

    element.textContent =
      element.dataset[lang];
  });


  document.documentElement.lang =
    lang;


  document
    .querySelector(".lang-no")
    ?.classList.toggle(
      "active",
      lang === "no"
    );


  document
    .querySelector(".lang-en")
    ?.classList.toggle(
      "active",
      lang === "en"
    );


  projects.forEach(project => {

    updateProjectButton(
      project,
      project.classList.contains(
        "open"
      )
    );
  });
}


langToggle?.addEventListener(
  "click",
  () => {

    setLanguage(
      language === "no"
        ? "en"
        : "no"
    );
  }
);


/* =========================================================
   PROJECT IMAGE LIGHTBOX
   ========================================================= */

const imageLightbox =
  document.createElement("div");

imageLightbox.className = "image-lightbox";
imageLightbox.setAttribute("role", "dialog");
imageLightbox.setAttribute("aria-modal", "true");
imageLightbox.setAttribute(
  "aria-label",
  "Prosjektbilder / Project images"
);
imageLightbox.setAttribute("aria-hidden", "true");

imageLightbox.innerHTML = `
  <button class="image-lightbox-close" type="button" aria-label="Lukk bildevisning / Close image viewer">×</button>
  <button class="image-lightbox-arrow image-lightbox-previous" type="button" aria-label="Forrige bilde / Previous image">←</button>
  <figure class="image-lightbox-figure">
    <img class="image-lightbox-image" src="" alt="">
    <figcaption class="image-lightbox-caption"></figcaption>
    <span class="image-lightbox-counter" aria-live="polite"></span>
  </figure>
  <button class="image-lightbox-arrow image-lightbox-next" type="button" aria-label="Neste bilde / Next image">→</button>
`;

document.body.appendChild(imageLightbox);

const lightboxImage =
  imageLightbox.querySelector(
    ".image-lightbox-image"
  );

const lightboxCaption =
  imageLightbox.querySelector(
    ".image-lightbox-caption"
  );

const lightboxCounter =
  imageLightbox.querySelector(
    ".image-lightbox-counter"
  );

const lightboxClose =
  imageLightbox.querySelector(
    ".image-lightbox-close"
  );

let lightboxItems = [];
let lightboxIndex = 0;
let lightboxTrigger = null;

function showLightboxImage(index) {
  if (!lightboxItems.length) return;

  lightboxIndex =
    (index + lightboxItems.length) %
    lightboxItems.length;

  const item =
    lightboxItems[lightboxIndex];

  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.alt;
  lightboxCounter.textContent =
    `${lightboxIndex + 1} / ${lightboxItems.length}`;
}

function openImageLightbox(imageElement) {
  const project =
    imageElement.closest(".project");

  if (!project) return;

  const galleryImages = [
    ...project.querySelectorAll(
      ".case-gallery-card img, .detail-final-gallery img"
    )
  ];

  const previewImages = [
    ...project.querySelectorAll(
      ".project-preview img"
    )
  ];

  let sourceImages = galleryImages;

  if (imageElement.closest(".project-preview")) {
    sourceImages = [
      ...previewImages,
      ...galleryImages.filter(galleryImage =>
        !previewImages.some(previewImage =>
          previewImage.getAttribute("src") ===
          galleryImage.getAttribute("src")
        )
      )
    ];
  } else if (!sourceImages.length) {
    sourceImages = [
      ...project.querySelectorAll(
        ".project-preview img"
      )
    ];
  }

  const seenImageSources = new Set();
  sourceImages = sourceImages.filter(image => {
    const source = image.getAttribute("src");
    if (!source || seenImageSources.has(source)) return false;
    seenImageSources.add(source);
    return true;
  });

  const captionLanguage =
    currentLanguage();

  lightboxItems = sourceImages.map(image => {
    const caption = captionLanguage === "en"
      ? image.dataset.captionEn
      : image.dataset.captionNo;

    return {
      src: image.getAttribute("src"),
      alt: caption ||
        image.getAttribute("alt") ||
        "Prosjektbilde"
    };
  });

  const clickedSource =
    imageElement.getAttribute("src");

  const clickedIndex =
    lightboxItems.findIndex(
      item => item.src === clickedSource
    );

  lightboxTrigger = imageElement;
  showLightboxImage(
    clickedIndex >= 0 ? clickedIndex : 0
  );

  imageLightbox.classList.add("is-open");
  imageLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose.focus();
}

function closeImageLightbox() {
  imageLightbox.classList.remove("is-open");
  imageLightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxTrigger?.focus();
}

document.addEventListener("click", event => {
  const image = event.target.closest(
    ".project-preview img, .detail-media img, .detail-story-media img, .process-inline-image img, .detail-final-gallery img"
  );

  if (image) {
    openImageLightbox(image);
  }
});

lightboxClose.addEventListener(
  "click",
  closeImageLightbox
);

imageLightbox
  .querySelector(".image-lightbox-previous")
  .addEventListener(
    "click",
    () => showLightboxImage(lightboxIndex - 1)
  );

imageLightbox
  .querySelector(".image-lightbox-next")
  .addEventListener(
    "click",
    () => showLightboxImage(lightboxIndex + 1)
  );

imageLightbox.addEventListener("click", event => {
  if (event.target === imageLightbox) {
    closeImageLightbox();
  }
});

document.addEventListener("keydown", event => {
  if (!imageLightbox.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closeImageLightbox();
  } else if (event.key === "ArrowLeft") {
    showLightboxImage(lightboxIndex - 1);
  } else if (event.key === "ArrowRight") {
    showLightboxImage(lightboxIndex + 1);
  }
});


/* =========================================================
   FEATURED PROJECT STRIP
   ========================================================= */

const featuredProjectScroll =
  document.querySelector(".featured-project-scroll");

if (featuredProjectScroll) {
  featuredProjectScroll.addEventListener(
    "wheel",
    event => {
      if (!event.shiftKey || !event.deltaY) return;

      event.preventDefault();
      featuredProjectScroll.scrollLeft += event.deltaY;
    },
    { passive: false }
  );

  let dragging = false;
  let dragged = false;
  let pressedProjectLink = null;
  let dragStartX = 0;
  let dragStartScroll = 0;

  featuredProjectScroll.addEventListener("pointerdown", event => {
    if (event.pointerType === "touch") return;
    dragging = true;
    dragged = false;
    pressedProjectLink = event.target.closest(".featured-project-link");
    dragStartX = event.clientX;
    dragStartScroll = featuredProjectScroll.scrollLeft;
    featuredProjectScroll.classList.add("is-dragging");
    featuredProjectScroll.setPointerCapture(event.pointerId);
  });

  featuredProjectScroll.addEventListener("pointermove", event => {
    if (!dragging) return;
    if (Math.abs(event.clientX - dragStartX) > 6) dragged = true;
    featuredProjectScroll.scrollLeft =
      dragStartScroll - (event.clientX - dragStartX);
  });

  const stopFeaturedDrag = event => {
    if (!dragging) return;
    dragging = false;
    featuredProjectScroll.classList.remove("is-dragging");
    if (featuredProjectScroll.hasPointerCapture(event.pointerId)) {
      featuredProjectScroll.releasePointerCapture(event.pointerId);
    }
  };

  featuredProjectScroll.addEventListener("pointerup", stopFeaturedDrag);
  featuredProjectScroll.addEventListener("pointercancel", stopFeaturedDrag);

  featuredProjectScroll.addEventListener("click", event => {
    const link =
      event.target.closest(".featured-project-link") ||
      pressedProjectLink;
    if (!link) return;

    if (dragged) {
      event.preventDefault();
      dragged = false;
      pressedProjectLink = null;
      return;
    }

    const project = document.querySelector(link.getAttribute("href"));
    if (!project) return;

    event.preventDefault();
    const offset = header?.offsetHeight || 0;
    const top = project.getBoundingClientRect().top + window.scrollY - offset - 18;
    window.scrollTo({ top, behavior: "smooth" });
    pressedProjectLink = null;
  });
}


/* =========================================================
   MAIN SCROLL LOOP
   ========================================================= */

function updateAll() {
  updateAbout();
  updateThankYou();
  updateHeader();
}


let ticking = false;


window.addEventListener(
  "scroll",
  () => {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {

      updateAll();

      ticking = false;

    });
  },
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  updateAll
);


updateAll();
