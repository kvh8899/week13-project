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

export function constructPost(getPosts,containerClass){
  const postDiv = document.querySelector(containerClass);
      getPosts.forEach(post => {
          const storyGridStory = document.createElement("div");
          storyGridStory.classList.add('story-grid-story')

          const innerStory = document.createElement("div");
          innerStory.classList.add("inner-story");

          storyGridStory.appendChild(innerStory);

          const author = document.createElement("div");
          author.classList.add("author");

          innerStory.appendChild(author);

          const profile = document.createElement("div");
          profile.classList.add('profile')

          author.appendChild(profile);

          const profpic = document.createElement("img");
          profpic.classList.add("profpic")
          profpic.src = "../images/defaultavatar.jpeg";
          profpic.alt = "P";

          //to user name add name to innerHTML or innerText from fetch call
          const userName = document.createElement("p");
          userName.classList.add('auth-name', 'sans-serif')
          userName.innerText = post.User.username
          profile.appendChild(profpic);
          profile.appendChild(userName);

          const headingsWrapper = document.createElement("a");
          headingsWrapper.classList.add('headings-wrapper');
          headingsWrapper.href = '/stories/' + post.id;

          author.appendChild(headingsWrapper);

          const pHeading = document.createElement("h2");
          pHeading.innerText = post.heading;
          headingsWrapper.appendChild(pHeading);

          const pSubText = document.createElement("h3");
          pSubText.innerText = post.subText
          headingsWrapper.appendChild(pSubText);

          const date = document.createElement("p");
          date.classList.add('meta-data','sans-serif');
          
          let newDate = Date.parse(post.createdAt);
          newDate = new Date(newDate);
          date.innerText = newDate.toLocaleDateString("en-US",
          { month: "short", day: "numeric" });
          
          author.appendChild(date)

          const storyLink = document.createElement("a");
          storyLink.href = `/stories/${post.id}`;

          storyGridStory.appendChild(storyLink)

          const listImg = document.createElement("img");
          listImg.src = post.headerImage;
          listImg.classList.add('listimg');
          listImg.alt = post.heading;

          storyLink.appendChild(listImg)
          postDiv.appendChild(storyGridStory);
      })
}

