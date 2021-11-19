import "./modal.js";
import { adjustTextAreaHeight, updateTextAreaHeight } from "./input-utils.js";

document.addEventListener("DOMContentLoaded", () => {
  setupFollowButton();
  setupLikePostButton();
  setupShowCommentsButton();
  setupCommentsInput();
  setupCommentsActions();
  setupCloseComments();
  deleteComments();
});

function setupFollowButton() {
  const followButtons = document.querySelectorAll(".follow-button");

  followButtons.forEach((followButton) => {
    let isFetching = false;

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
          // Success!
          return;
        }

        // TODO: How should errors be handled?
      } catch (error) {
      } finally {
        isFetching = false;
      }
    });
  });
}

function setupLikePostButton() {
  const likeButton = document.querySelector("#like-post");

  let isFetching = false;

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
        // Success!
        return;
      }

      // TODO: How should errors be handled?
    } catch (error) {
    } finally {
      isFetching = false;
    }
  });
}

function setupShowCommentsButton() {
  const button = document.querySelector("#show-comments");

  const commentsModal = document.querySelector(".modal-root.comments");

  button.addEventListener("click", (event) => {
    event.preventDefault();

    location.hash = "comments";
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
          // Success!
          return;
        }

        // TODO: How should errors be handled?
      } catch (error) {
      } finally {
        isFetching = false;
      }
    });
  });
}

function deleteComments(){
  const deleteBtn = document.querySelector('button.button.rounded.icon-button.delete-comment');
  let url;
  if(deleteBtn){
    url = '/comments/'+ deleteBtn.dataset.commentId + '/delete';
    deleteBtn.addEventListener('click', async(e) => {
      try{
        const comm = document.querySelector(`[data-comment-id='${deleteBtn.dataset.commentId}']`);
        document.querySelector('.comments-container').removeChild(comm);
        await fetch(url,{method: 'DELETE'});
      }catch(e){
        return;
      }
    });
  }
}
