import { assets } from "./modules/assets";
import { color } from "./modules/color";
import { cursor } from "./modules/cursor";
import { language } from "./modules/language";
import { section } from "./modules/section";
import { shape } from "./modules/shape";
import { viewport } from "./modules/viewport";

import "./scss/main.scss";

const index = (() => {
  const selectors = {
    backBtn: document.querySelectorAll(".back__btn"),
    menu: document.querySelector(".menu"),
  };

  const init = () => {
    assets.loadAssets();
    loadEventListeners();

    // Console
    console.log(
      "%cDesign & Code by Federico Picone. Enjoy!",
      "background: rgb(117, 117, 162); border-radius: 0.5rem; color: rgb(0, 255, 255); margin: 0.25rem 0; padding: 0.5rem;"
    );
  };

  const loadEventListeners = () => {
    //** Color picker
    color.eventHandler();

    //** Cursor
    cursor.eventHandler();

    //** Language
    language.eventHandler();

    //** Sections and shapes
    let sectionName = undefined;

    // Buttons about, skills and contact
    selectors.menu.addEventListener("click", (e) => {
      if (e.target.classList.contains("clickable")) {
        // e.g. sectionName = "about" when clicking on .about__btn
        sectionName = e.target.id.split("__btn")[0];

        section.sectionHandler(sectionName);
        shape.shapeHandler(sectionName);
      }
    });

    // Back button in sections about, skills and contact
    selectors.backBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        section.sectionHandler(sectionName);
        shape.shapeHandler(sectionName);

        // dataset removed to show everything in section shapes
        document.querySelector("main").removeAttribute("data-section");
      });
    });

    //** Viewport
    viewport.eventHandler();
  };

  return {
    init,
  };
})();

index.init();
