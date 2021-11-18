import { adjustTextAreaHeight } from "./input-utils.js";
import { showAfterLoaded } from "./utils.js";

showAfterLoaded();

document.addEventListener("DOMContentLoaded", () => {
  const mainTextInput = document.querySelector("#mainText");

  adjustTextAreaHeight(mainTextInput);
});
