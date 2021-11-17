const updateTextAreaHeight = (element) => {
  element.style.height = "";
  element.style.height = `${element.scrollHeight + 5}px`;
};

export const adjustTextAreaHeight = (element) => {
  updateTextAreaHeight(element);

  element.addEventListener("input", () => {
    updateTextAreaHeight(element);
  });
};
