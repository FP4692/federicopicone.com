export const cursor = (() => {
  const selectors = {
    cursor: document.querySelector(".cursor"),
  };

  const cursorHandler = (e) => {
    selectors.cursor.style.left = `${e.clientX}px`;
    selectors.cursor.style.top = `${e.clientY}px`;

    // The cursor style changes while hovering on clickable elements
    if (e.target.classList.contains("clickable")) {
      selectors.cursor.classList.add("cursor--active");
    } else {
      selectors.cursor.classList.remove("cursor--active");
    }
  };

  return {
    selectors,
    cursorHandler,
  };
})();
