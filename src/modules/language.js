import content from "../language.json";

export const language = (() => {
  let selectors = {};

  const loadContent = (lang) => {
    for (let i in content.en) {
      // Properties in language.json are named like classes/ids
      selectors[i] = document.querySelector(i);

      // Fade effect on language change
      if (selectors[i].classList.contains("fade")) {
        selectors[i].style.transition = "opacity 500ms ease-in-out";
        selectors[i].style.opacity = "0";
      }

      setTimeout(() => {
        selectors[i].innerHTML = content[lang][i];
        selectors[i].style.opacity = "1";
      }, 750);
    }
  };

  return {
    loadContent,
  };
})();
