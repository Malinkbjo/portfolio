const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/* =========================================================
   GLOBAL ELEMENTS
   ========================================================= */

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");
const header = document.querySelector(".site-header");

const about = document.querySelector(".about");
const aboutCopy = document.querySelector(".about-rise-copy");
const aboutCard = document.querySelector(".about-rise-card");

const thankSection = document.querySelector(".thank-you");
const thankTop = document.querySelector(".thank-line-top");
const thankBottom = document.querySelector(".thank-line-bottom");
const thankEmail = document.querySelector(".contact-email");
const thankLinkedin = document.querySelector(".contact-linkedin");

const projects = [...document.querySelectorAll(".project")];


/* =========================================================
   HERO
   ========================================================= */

function updateHero() {
  if (!hero || !heroContent) return;

  const rect = hero.getBoundingClientRect();
  const vh = window.innerHeight;

  const travel = Math.max(
    hero.offsetHeight * 0.95 - vh * 0.15,
    1
  );

  const progress = clamp(
    -rect.top / travel,
    0,
    1
  );

  const ease =
    progress *
    progress *
    (3 - 2 * progress);

  const scale = 1 - ease * 0.14;
  const y = -ease * vh * 1.35;

  const insetX = ease * 4;
  const insetTop = ease * 2;
  const insetBottom = ease * 6;
  const radius = ease * 28;

  heroContent.style.opacity = "1";
  heroContent.style.filter = "none";

  heroContent.style.transform =
    `translateY(${y}px) scale(${scale})`;

  heroContent.style.clipPath =
    `inset(
      ${insetTop}%
      ${insetX}%
      ${insetBottom}%
      ${insetX}%
      round ${radius}px
    )`;
}


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

prepareProjectCases();


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

    const isProjectButton =
      label.dataset.en === "View project";

    label.textContent =
      isProjectButton
        ? (
          english
            ? "View project"
            : "Se prosjektet"
        )
        : (
          english
            ? "See more"
            : "Se mer"
        );
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
        threshold: 0.12,
        rootMargin:
          "0px 0px -8% 0px"
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
      ".case-gallery-card img"
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
    ".project-preview img, .detail-media img"
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
   MAIN SCROLL LOOP
   ========================================================= */

function updateAll() {
  updateHero();
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
