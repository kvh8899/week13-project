import "./modal.js";
import { adjustTextAreaHeight, updateTextAreaHeight } from "./input-utils.js";

document.addEventListener("DOMContentLoaded", () => {
  setupFollowButton();
  setupLikePostButton();
  setupShowCommentsButton();
  setupCommentsInput();
  setupCommentsActions();
  setupCloseComments();
  setupDeleteComments();
  setupSidebarObserver();
});

function setupFollowButton() {
  const followButtons = document.querySelectorAll(".follow-button");
  const followCounts = document.querySelectorAll(".followers-count");

  let isFetching = false;

  followButtons.forEach((followButton) => {
    followButton.addEventListener("click", async (event) => {
      event.preventDefault();

      if (isFetching) {
        return;
      }

      const authorId = event.target.dataset.authorId;
      const followId = event.target.dataset.followId;

      isFetching = true;
      try {
        const url = followId
          ? `/api/follows/${followId}`
          : `/api/users/${authorId}/followers`;

        const res = await fetch(url, {
          method: followId ? "DELETE" : "POST",
        });

        const resData = await res.json();

        if (resData && !resData.errors) {
          if (res.status === 200) {
            followCounts.forEach((el) => {
              el.innerText = parseInt(el.innerText, 10) - 1;
            });
          } else if (res.status === 201) {
            followCounts.forEach((el) => {
              el.innerText = parseInt(el.innerText, 10) + 1;
            });
          }
        }
      } catch (error) {
        // TODO: How should errors be handled?
      } finally {
        isFetching = false;
      }
    });
  });
}

function setupLikePostButton() {
  const likeButtons = document.querySelectorAll(".like-post");
  const likeCounts = document.querySelectorAll(".post-likes-count");

  let isFetching = false;

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", async (event) => {
      event.preventDefault();

      if (isFetching) {
        return;
      }

      const likeId = likeButton.dataset.likeId;
      const storyId = likeButton.dataset.storyId;

      isFetching = true;
      try {
        const url = likeId
          ? `/api/stories/likes/${likeId}`
          : `/api/stories/${storyId}/likes`;

        const res = await fetch(url, {
          method: likeId ? "DELETE" : "POST",
        });

        const resData = await res.json();

        if (resData && !resData.errors) {
          if (res.status === 200) {
            likeCounts.forEach((el) => {
              el.innerText = parseInt(el.innerText, 10) - 1;
            });
          } else if (res.status === 201) {
            likeCounts.forEach((el) => {
              el.innerText = parseInt(el.innerText, 10) + 1;
            });
          }
        }
      } catch (error) {
        // TODO: How should errors be handled?
      } finally {
        isFetching = false;
      }
    });
  });
}

function setupShowCommentsButton() {
  const buttons = document.querySelectorAll(".show-comments");

  const commentsModal = document.querySelector(".modal-root.comments");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      location.hash = "comments";
    });
  });

  const onHashChange = () => {
    if (location.hash === "#comments") {
      commentsModal.classList.remove("hidden");
    } else {
      commentsModal.classList.add("hidden");
    }
  };

  window.addEventListener("hashchange", onHashChange);
  onHashChange();
}

function setupCloseComments() {
  const modal = document.querySelector(".modal-root.comments");
  modal.addEventListener("close", () => {
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  });
}

function setupCommentsInput() {
  const input = document.querySelector("#story-comment-input");

  adjustTextAreaHeight(input);

  window.addEventListener("hashchange", () => {
    updateTextAreaHeight(input);
  });
}

function setupCommentsActions() {
  // Cancel Creating Comment
  const cancelButtons = document.querySelectorAll(".comment-cancel");

  cancelButtons.forEach((cancelButton) => {
    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();

      const input = cancelButton
        .closest(".comments-input-wrapper")
        .querySelector("textarea");

      input.value = "";
    });
  });

  // Like Button
  const likeButtons = document.querySelectorAll(".like-comment");

  likeButtons.forEach((likeButton) => {
    const commentEl = likeButton.closest(".comment");
    if (!commentEl) {
      return;
    }
    const commentLikeEl = commentEl.querySelector(".comment-like-count");
    if (!commentLikeEl) {
      return;
    }

    const commentId = commentEl.dataset.commentId;
    const likeId = likeButton.dataset.likeId;

    let isFetching = false;

    likeButton.addEventListener("click", async (event) => {
      event.preventDefault();

      if (isFetching) {
        return;
      }

      isFetching = true;
      try {
        const url = likeId
          ? `/api/comments/likes/${likeId}`
          : `/api/comments/${commentId}/likes`;

        const res = await fetch(url, {
          method: likeId ? "DELETE" : "POST",
        });

        const resData = await res.json();

        if (resData && !resData.errors) {
          if (res.status === 200) {
            commentLikeEl.innerText = parseInt(commentLikeEl.innerText, 10) - 1;
          } else if (res.status === 201) {
            commentLikeEl.innerText = parseInt(commentLikeEl.innerText, 10) + 1;
          }
        }
      } catch (error) {
        // TODO: How should errors be handled?
      } finally {
        isFetching = false;
      }
    });
  });
}

function setupDeleteComments() {
  const deleteBtns = document.querySelectorAll("button.delete-comment");
  let url;
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", async (e) => {
      url = "/comments/" + e.currentTarget.dataset.commentId + "/delete";
      try {
        const comm = document.querySelector(
          `[data-comment-id='${e.currentTarget.dataset.commentId}']`
        );
        document.querySelector(".comments-container").removeChild(comm);

        await fetch(url, { method: "DELETE" });

        document.querySelector("a.show-comments span").innerText--;
        document.querySelector(
          ".comments-heading h2"
        ).innerText = `Responses (${
          document.querySelector("a.show-comments span").innerText
        })`;
      } catch (e) {
        return;
      }
    });
  });
}

function setupSidebarObserver() {
  const storyHeader = document.querySelector("main h1.title");
  const postSidebar = document.querySelector(".post-sidebar");

  if (!storyHeader || !postSidebar) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        postSidebar.classList.add("hidden");
      } else {
        postSidebar.classList.remove("hidden");
      }
    });
  });

  observer.observe(storyHeader);
}
