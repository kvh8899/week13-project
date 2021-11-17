document.addEventListener("DOMContentLoaded", () => {
  setupFollowButton();
  setupLikePostButton();
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

    const likeId = event.target.dataset.likeId;
    const storyId = event.target.dataset.storyId;

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
