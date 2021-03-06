import { constructPost ,deleteAnim} from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  /*
    navigation for following and recommended stories
  */
  document.querySelector(".follow-content").style.display = "block";
  function changeActiveBtn(e, btnName) {
    if (e.target.classList.contains("snbOff")) {
      e.target.classList.remove("snbOff");
      e.target.classList.add("snb");
      document.querySelector(btnName).classList.remove("snb");
      document.querySelector(btnName).classList.add("snbOff");
    }
  }
  document.querySelector(".snButton1").addEventListener("click", async (e) => {
    changeActiveBtn(e, ".snButton2");
    document.querySelector(".reco-content").style.display = "none";
    document.querySelector(".follow-content").style.display = "block";
  });
  document.querySelector(".snButton2").addEventListener("click", async (e) => {
    changeActiveBtn(e, ".snButton1");
    document.querySelector(".reco-content").style.display = "block";
    document.querySelector(".follow-content").style.display = "none";
  });

  /*
    listens for clicks on following and recommended tabs
  */
  document.querySelector(".browse").addEventListener("click", (e) => {
    document.querySelector(".snButton1").classList.remove("snb");
    document.querySelector(".snButton1").classList.add("snbOff");
    document.querySelector(".snButton2").classList.remove("snbOff");
    document.querySelector(".snButton2").classList.add("snb");

    document.querySelector(".reco-content").style.display = "block";
    document.querySelector(".follow-content").style.display = "none";
  });

  if (document.querySelector(".following-posts-container").children.length === 1) {
    document.querySelector(".empty-follow").style.display = "block";
  } else {
    document.querySelector(".empty-follow").style.display = "none";
  }

  setupInfiniteScroll();
});

function setupInfiniteScroll() {
  const reco = document.querySelector(".reco-content");
  const foll = document.querySelector(".follow-content");
  const bottoms = document.querySelectorAll(".bott");

  let offsetF = 6;
  let offsetR = 6;

  const bottomObserver = new IntersectionObserver(async (entries, observer) => {
    let url;
    let getPosts;

    // prevent fetch unless tab is open
    if (reco.style.display === "block") {
      url = "/api/stories?offset=" + offsetR;
    } else if (foll.style.display === "block") {
      url = "/api/stories/following?offset=" + offsetF;
    }

    entries.forEach(async (entry) => {
      const anim = document.querySelectorAll('.anim')
      if (entry.isIntersecting && reco.style.display === "block") {
        getPosts = await fetch(url).then((res) => res.json());
        if(!getPosts.length){
          deleteAnim(".recBott",getPosts.length);
          return;
        }
        constructPost(getPosts, ".recommended-posts-container");
        anim[0].classList.add("hidden");
        offsetR += 6;
      }else if (entry.isIntersecting && foll.style.display === "block") {
        getPosts = await fetch(url).then((res) => res.json());
        if(!getPosts.length){
          deleteAnim(".follBott",getPosts.length);
          return;
        }
        constructPost(getPosts, ".following-posts-container");
        anim[1].classList.add("hidden");
        offsetF += 6;
      }else if(anim[0]){
        anim[0].classList.remove("hidden");
      }else if(anim[1]){
        anim[1].classList.remove("hidden");
      }
    },{threshold:0.05});
  });

  /*
    makes sure the element being observed exists
  */
  bottoms.forEach((bottomEl) => {
    bottomObserver.observe(bottomEl);
  });
}
