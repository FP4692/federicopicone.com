export const viewport = (() => {
  const setViewportHeight = () => {
    const style = document.documentElement.style;

    // --vh is assigned to the height property of document.body
    style.setProperty("--vh", `${window.innerHeight}px`);
  };

  const eventHandler = () => {
    window.addEventListener("DOMContentLoaded", () => {
      // document.body is initially hidden to prevent FOUC (Flash Of Unstyled Content)
      document.body.style.visibility = "visible";

      setViewportHeight();
    });

    window.addEventListener("resize", () => {
      setViewportHeight();
    });
  };

  return {
    eventHandler,
  };
})();
