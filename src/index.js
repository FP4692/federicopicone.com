import { assets } from "./modules/assets";
import { color } from "./modules/color";
import { cursor } from "./modules/cursor";
import { language } from "./modules/language";
import { section } from "./modules/section";
import { shape } from "./modules/shape";
import { viewport } from "./modules/viewport";

import "./scss/main.scss";

const index = (() => {
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

    window.addEventListener("click", (e) => {
      // It matches word characters that contain __btn
      const btnMatch = e.target.className.match(/\w+(__btn)/);

      if (btnMatch) {
        if (btnMatch[0] === "back__btn" || btnMatch[0] === "home__btn") {
          section.sectionHandler(sectionName);
          shape.shapeHandler(sectionName);

          // dataset is removed to show everything in section shapes
          document.querySelector("main").removeAttribute("data-section");
        } else {
          // e.g. sectionName = "about" when clicking on .about__btn
          sectionName = btnMatch[0].split("__btn")[0];
          section.sectionHandler(sectionName);
          shape.shapeHandler(sectionName);
        }
      }
    });

    //** Viewport
    viewport.eventHandler();
  };

  return {
    init,
  };
})();

index.init();
