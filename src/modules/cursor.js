export const cursor = (() => {
  const selectors = {
    cursor: document.querySelector(".cursor"),
  };

  const moveCursor = (e) => {
    selectors.cursor.style.left = `${e.clientX}px`;
    selectors.cursor.style.top = `${e.clientY}px`;

    // The cursor style changes while hovering on clickable elements
    if (e.target.classList.contains("clickable")) {
      selectors.cursor.classList.add("cursor--active");
    } else {
      selectors.cursor.classList.remove("cursor--active");
    }
  };

  const showCursorOnDesktop = () => {
    const isMobile = () =>
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Kindle/i.test(
        navigator.userAgent
      );

    { !isMobile() && (selectors.cursor.style.display = "block"); }
  };

  const eventHandler = () => {
    window.addEventListener("DOMContentLoaded", () => {
      showCursorOnDesktop();
    });

    window.addEventListener("mousemove", (e) => {
      moveCursor(e);
    });
  };

  return {
    selectors,
    eventHandler,
  };
})();
