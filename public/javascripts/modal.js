const closeEvent = new Event("close");

document.addEventListener("DOMContentLoaded", () => {
  const modalCloseButtons = document.querySelectorAll(".modal-close");

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeClosestModal(button);
    });
  });

  const modalContainers = document.querySelectorAll(".modal-container");

  modalContainers.forEach((container) => {
    container.addEventListener("mousedown", (event) => {
      if (event.target !== container) {
        return;
      }
      closeClosestModal(container);
    });
  });
});

function closeClosestModal(element) {
  const modalRoot = element.closest(".modal-root");
  if (modalRoot) {
    modalRoot.dispatchEvent(closeEvent);
    modalRoot.classList.toggle("hidden");
  }
}
