document.addEventListener("DOMContentLoaded", () => {
  setupFollowButton();
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
