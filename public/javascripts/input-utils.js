/**
 *
 * @param {HTMLElement} growHidden the hidden element
 * @param {HTMLElement} textarea the text area element
 */
export const updateTextAreaHeight = (growHidden, textarea) => {
  const endsWithNewLine = /\n$/g.test(textarea.value);

  if (endsWithNewLine) {
    growHidden.innerText = textarea.value + "\n";
  } else {
    growHidden.innerText = textarea.value;
  }
};

/**
 * Utility to auto resize a text area
 * Requires the textarea to be wrapped with a .grow-wrapper
 *
 * Also requires a sibling with the class of .grow-hidden (aria-hidden="true")
 * This sibling must match the CSS styles of the textarea. These elements
 * are designed to grow at the same rate.
 *
 * @param {HTMLElement} textarea
 */
export const adjustTextAreaHeight = (textarea) => {
  const growHidden = textarea.parentElement.querySelector(".grow-hidden");
  updateTextAreaHeight(growHidden, textarea);

  textarea.addEventListener("input", () => {
    updateTextAreaHeight(growHidden, textarea);
  });
};
