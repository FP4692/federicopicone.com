import canvasImg from "../assets/skills/canvas.svg";
import cssImg from "../assets/skills/css.svg";
import gitImg from "../assets/skills/git.svg";
import githubImg from "../assets/skills/github.svg";
import htmlImg from "../assets/skills/html.svg";
import jsImg from "../assets/skills/js.svg";
import reactImg from "../assets/skills/react.svg";
import sassImg from "../assets/skills/sass.svg";
import webpackImg from "../assets/skills/webpack.svg";

export const assets = (() => {
  const selectors = {};

  const loadAssets = () => {
    const assets = [
      canvasImg,
      cssImg,
      gitImg,
      githubImg,
      htmlImg,
      jsImg,
      reactImg,
      sassImg,
      webpackImg,
    ];

    for (let i of assets) {
      // It matches word characters before the .extension (e.g. "canvas" in "../assets/skills/canvas.svg")
      const regEx = /\w+(?=.(png|svg|jpe?g|gif|avif))/;

      // e.g. selectors[canvasImg] = document.querySelector(".canvas");
      selectors[i] = document.querySelector(`.${i.match(regEx)[0]}`);
      selectors[i].src = i;
    }
  };

  return {
    loadAssets,
  };
})();
