export const section = (() => {
  let activeSection = null;

  const sectionHandler = (sectionName) => {
    const section = document.querySelector(`#${sectionName}`);
    const content = document.querySelector(`#${sectionName}__content`);

    // dataset used to remove unnecessary content while a specific section is active
    // e.g. while the active section is "about", then the menu, shapes title, pyramid and sphere are hidden
    section.parentElement.dataset["section"] = sectionName;

    // The called section is displayed and its content slides down
    if (section !== activeSection) {
      activeSection = section;
      section.style.animation = "fadeIn 250ms forwards";
      content.style.animation = `contentSlideDown 500ms forwards`;
    } else {
      activeSection = null;
      section.style.animation = "fadeOut 250ms forwards";
      content.style.animation = "contentSlideUp 500ms forwards";
    }
  };

  return {
    sectionHandler,
  };
})();
