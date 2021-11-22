import { closeModal, showModal } from "./modal.js";
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
            followButtons.forEach((el) => {
              el.innerText = "Follow";
              delete el.dataset.followId;
            });
            followCounts.forEach((el) => {
              el.innerText = parseInt(el.innerText, 10) - 1;
            });
          } else if (res.status === 201) {
            followButtons.forEach((el) => {
              el.innerText = "Unfollow";
              el.dataset.followId = resData.id;
            });
            followCounts.forEach((el) => {
              el.innerText = parseInt(el.innerText, 10) + 1;
            });
          } else if (res.status === 401) {
            window.location = "/login";
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
            likeButtons.forEach((el) => {
              delete el.dataset.liked;
              delete el.dataset.likeId;
            });
            likeCounts.forEach((el) => {
              el.innerText = parseInt(el.innerText, 10) - 1;
            });
          } else if (res.status === 201) {
            likeButtons.forEach((el) => {
              el.dataset.liked = true;
              el.dataset.likeId = resData.id;
            });
            likeCounts.forEach((el) => {
              el.innerText = parseInt(el.innerText, 10) + 1;
            });
          } else if (res.status === 401) {
            window.location = "/login";
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
  const commentsModalContent = document.querySelector(
    ".modal-root.comments .modal-content"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      location.hash = "comments";
    });
  });

  let hiddenTimeout;

  const onHashChange = () => {
    if (location.hash === "#comments") {
      showModal(commentsModal);
      if (hiddenTimeout) {
        clearTimeout(hiddenTimeout);
      }
      hiddenTimeout = setTimeout(() => {
        commentsModalContent.classList.remove("hidden");
      }, 50);
    } else if (!commentsModal.classList.contains("hidden")) {
      if (hiddenTimeout) {
        clearTimeout(hiddenTimeout);
      }
      commentsModalContent.classList.add("hidden");
      closeModal(commentsModal);
    }
  };

  commentsModal.addEventListener("close", () => {
    if (hiddenTimeout) {
      clearTimeout(hiddenTimeout);
    }
    commentsModalContent.classList.add("hidden");
  });

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
}

function setupCommentsActions() {
  // Cancel Creating Comment
  const cancelButtons = document.querySelectorAll(".comment-cancel");

  cancelButtons.forEach((cancelButton) => {
    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();

      const inputWrapper = cancelButton.closest(".comments-input-wrapper");
      const input = inputWrapper.querySelector("textarea");

      if (input.classList.contains("grow-textarea")) {
        const hiddenGrower = inputWrapper.querySelector(".grow-hidden");
        if (hiddenGrower) {
          hiddenGrower.innerText = "";
        }
      }

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

    let isFetching = false;

    likeButton.addEventListener("click", async (event) => {
      event.preventDefault();

      if (isFetching) {
        return;
      }

      const commentId = commentEl.dataset.commentId;
      const likeId = likeButton.dataset.likeId;

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
            delete likeButton.dataset.liked;
            delete likeButton.dataset.likeId;
            commentLikeEl.innerText = parseInt(commentLikeEl.innerText, 10) - 1;
          } else if (res.status === 201) {
            likeButton.dataset.liked = true;
            likeButton.dataset.likeId = resData.id;
            commentLikeEl.innerText = parseInt(commentLikeEl.innerText, 10) + 1;
          } else if (res.status === 401) {
            window.location = "/login";
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
  const commentsContainer = document.querySelector(".comments-container");
  const deleteBtns = document.querySelectorAll("button.delete-comment");
  const postCommentCounts = document.querySelectorAll(".post-comments-count");

  if (postCommentCounts.length === 0) {
    throw new Error("Failed to find comment counts");
  }

  deleteBtns.forEach((deleteBtn) => {
    let isFetching = false;
    deleteBtn.addEventListener("click", async (event) => {
      event.preventDefault();

      if (isFetching) {
        return;
      }

      const url = `/api/comments/${deleteBtn.dataset.commentId}`;

      try {
        isFetching = true;
        const res = await fetch(url, { method: "DELETE" });

        if (res.status === 200) {
          const commentContainer = document.querySelector(
            `[data-comment-id='${deleteBtn.dataset.commentId}']`
          );
          commentsContainer.removeChild(commentContainer);

          const newCount = parseInt(postCommentCounts[0].innerText, 10) - 1;
          postCommentCounts.forEach((countEl) => {
            countEl.innerText = newCount;
          });
        }
      } catch (error) {
        console.error(error);
        return;
      } finally {
        isFetching = false;
      }
    });
  });
}

function setupSidebarObserver() {
  const storyHeader = document.querySelector(".topbar.sans-serif");
  const postSidebar = document.querySelector(".post-sidebar");

  
  postSidebar.classList.add("hidden");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        postSidebar.classList.add("hidden");
      } else {
        postSidebar.classList.remove("hidden");
      }
    });
  },{threshold:0.02});

  observer.observe(storyHeader);
}
