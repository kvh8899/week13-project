export const removeClassFromElements = (querySelector, className) => {
  const elements = document.querySelectorAll(querySelector);

  elements.forEach((element) => {
    element.classList.remove(className);
  });
};

/**
 * Sets an element to display: none until the DOM is finished loading.
 * Uses the .display-after-loaded class.
 */
export const showAfterLoaded = () => {
  if (
    document.readyState === "complete" ||
    document.readyState === "loaded" ||
    document.readyState === "interactive"
  ) {
    removeClassFromElements(".display-after-loaded", "display-after-loaded");
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      removeClassFromElements(".display-after-loaded", "display-after-loaded");
    });
  }
};
