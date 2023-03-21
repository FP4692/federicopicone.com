export const shape = (() => {
  let activeSectionName = null;

  const selectors = {
    pyramid: document.querySelector(".pyramid"),
    sphere: document.querySelector(".sphere"),
  };

  const shapeHandler = (sectionName) => {
    const bodyComputedStyle = window.getComputedStyle(document.body);
    const style = document.documentElement.style;

    /* Active section:
    - "about": the cube sides translate on the Z axis (default value is 0)
    - "skills": the pyramid rotates on the Y axis, while keeping its other transform values
    - "contact": the sphere scale increases */
    switch (sectionName) {
      case "about": {
        if (sectionName !== activeSectionName) {
          activeSectionName = sectionName;
          style.setProperty("--cubeSideTranslateZ", "1.75rem");
        } else {
          activeSectionName = null;
          style.setProperty("--cubeSideTranslateZ", "0rem");
        }
        break;
      }
      case "skills": {
        if (sectionName !== activeSectionName) {
          activeSectionName = sectionName;
          selectors.pyramid.style.transform = `${bodyComputedStyle.getPropertyValue(
            "--pyramidTransform"
          )} rotateY(-180deg)`;
        } else {
          activeSectionName = null;
          selectors.pyramid.style.transform = `${bodyComputedStyle.getPropertyValue(
            "--pyramidTransform"
          )}`;
        }
        break;
      }
      case "contact": {
        if (sectionName !== activeSectionName) {
          activeSectionName = sectionName;
          selectors.sphere.style.transform = "scale(4)";
        } else {
          activeSectionName = null;
          selectors.sphere.style.transform = "scale(1)";
        }
        break;
      }
      default: {
        return false;
      }
    }
  };

  return {
    shapeHandler,
  };
})();
