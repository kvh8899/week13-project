export const updateTextAreaHeight = (element) => {
  const style = window.getComputedStyle(element);

  const heightOffset =
    parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

  element.style.height = "";
  element.style.height = element.scrollHeight + heightOffset + "px";
};

export const adjustTextAreaHeight = (element) => {
  updateTextAreaHeight(element);

  element.addEventListener("input", () => {
    updateTextAreaHeight(element);
  });
};
