import { cursor } from "./cursor";

export const color = (() => {
  const selectors = {
    canvas: document.querySelector(".color-picker canvas"),
    colorCheckbox: document.querySelector(".color__checkbox"),
    picker: document.querySelector(".color-picker"),
    pointer: document.querySelector(".pointer"),
  };

  const picker = {
    active: true,
    context: selectors.canvas.getContext("2d", { willReadFrequently: true }),
    drag: false,
    pixel: undefined,
    x: 0,
  };

  // The canvas context is filled linear gradient with the specified direction and colors
  const linearGradient = (context, x0, y0, x1, y1, colors) => {
    if (colors && colors.length > 1) {
      const gradient = context.createLinearGradient(x0, y0, x1, y1);

      for (let i = 0; i < colors.length; i++) {
        // The color stops are set dinamically, based on the number of passed colors
        gradient.addColorStop(i * (1 / (colors.length - 1)), colors[i]);
      }

      context.fillStyle = gradient;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
  };

  // It moves the pointer horizontally within the canvas, with range minWidth <= x <= maxWidth and assigns the position to picker.x
  const movePointerX = (x) => {
    const canvasRect = selectors.canvas.getBoundingClientRect();
    const minWidth = selectors.pointer.offsetWidth / 2;
    const maxWidth = canvasRect.width - selectors.pointer.offsetWidth / 2;

    picker.x = x - canvasRect.left;

    { picker.x < minWidth && (picker.x = minWidth); }
    { picker.x > maxWidth && (picker.x = maxWidth); }

    selectors.pointer.style.left = `${picker.x}px`;
  };

  // It assigns the rgba color of ImageData at position picker.x to picker.pixel and changes the value of --colorContent
  const setColor = () => {
    const style = document.documentElement.style;
    picker.pixel = picker.context.getImageData(picker.x, 0, 1, 1).data;

    if (picker.active) {
      style.setProperty(
        "--colorContent",
        `rgba(${picker.pixel[0]},${picker.pixel[1]},${picker.pixel[2]}, 1)`
      );
    }
  };

  const eventHandler = () => {
    //** Mouse events (click, drag functionality)
    // If color checkbox.checked, color picker width is set from 0 to 12.5rem (200px; same as canvas); otherwise it is reset
    selectors.colorCheckbox.addEventListener("click", () => {
      if (selectors.colorCheckbox.checked) {
        selectors.picker.style.animation =
          "colorPickerWidth 150ms forwards ease-in-out";
        picker.active = true;
      } else {
        selectors.picker.style.animation = "none";
        picker.active = false;
      }
    });

    // Color picker reset if clicking on elements other than the color picker itself
    window.addEventListener("mousedown", (e) => {
      if (
        e.target !== selectors.canvas &&
        e.target !== selectors.pointer &&
        e.target !== selectors.colorCheckbox
      ) {
        selectors.colorCheckbox.checked = false;
        selectors.picker.style.animation = "none";
        picker.active = false;
      }
    });

    // The custom cursor is hidden while hovering on the color picker
    selectors.picker.addEventListener("mouseenter", () => {
      cursor.selectors.cursor.style.visibility = "hidden";
    });

    selectors.picker.addEventListener("mouseleave", () => {
      cursor.selectors.cursor.style.visibility = "visible";
    });

    selectors.picker.addEventListener("mousedown", (e) => {
      if (e.target === selectors.pointer) {
        picker.drag = true;
      }
      movePointerX(e.clientX);
    });

    selectors.canvas.addEventListener("mousemove", (e) => {
      if (picker.drag) {
        movePointerX(e.clientX);
      }
    });

    // The color is set whenever the mouse button is released (both when clicking on the canvas or dragging the pointer)
    window.addEventListener("mouseup", (e) => {
      if (e.target !== selectors.colorCheckbox) {
        setColor();
        picker.drag = false;
      }
    });

    //** Touch events (drag functionality)
    selectors.picker.addEventListener(
      "touchstart",
      (e) => {
        if (e.target === selectors.pointer) {
          picker.drag = true;
        }
      },
      { passive: true }
    );

    selectors.picker.addEventListener(
      "touchmove",
      (e) => {
        if (picker.drag) {
          movePointerX(e.touches[0].clientX);
        }
      },
      { passive: true }
    );

    selectors.picker.addEventListener("touchend", () => {
      setColor();
      picker.drag = false;
    });

    //** Keyboard events
    // ArrowLeft: the pointer moves 1px left; ArrowRight: the pointer moves 1px right. The color is set every time
    window.addEventListener("keydown", (e) => {
      const canvasRect = selectors.canvas.getBoundingClientRect();

      if (picker.active) {
        switch (e.key) {
          case "ArrowLeft": {
            picker.x -= 1;
            break;
          }
          case "ArrowRight": {
            picker.x += 1;
            break;
          }
          default: {
            return false;
          }
        }
      }

      movePointerX(picker.x + canvasRect.left);
      setColor();
    });
  };

  // The canvas context is filled linear gradient
  linearGradient(picker.context, selectors.canvas.offsetWidth, 0, 0, 0, [
    "rgb(255, 0, 0)",
    "rgb(255, 0, 255)",
    "rgb(0, 106, 255)",
    "rgb(0, 255, 255)",
    "rgb(0, 255, 0)",
    "rgb(255, 255, 0)",
    "rgb(255, 165, 0)",
    "rgb(255, 255, 255)",
    "rgb(255, 255, 255)",
  ]);

  return {
    eventHandler,
  };
})();
