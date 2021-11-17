import { adjustTextAreaHeight } from "./input-utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const mainTextInput = document.querySelector("#mainText");

  adjustTextAreaHeight(mainTextInput);
});
