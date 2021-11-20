
//do things after DOM has been loaded
document.addEventListener("DOMContentLoaded",() => {
    const background = document.querySelector('.startWriting');
    const topbar = document.querySelector('.topbar');
    const login = document.querySelector('.login');
    const bottom = document.querySelector('.bott');
     /*
        when user has scrolled a certain amount,
        change styling of nav on unauth home page
    */
    const observer = new IntersectionObserver((entries,observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting === false) {
                topbar.classList.add("topbar-alt");
                login.classList.remove("black");
                
            }else{
                topbar.classList.remove("topbar-alt");
                login.classList.add("black");
            }
        })
    },{
        threshold:0.25
    })
    //Infinite scroll
    /*
        div(class='story-grid-story')
            div(class="inner-story")
                div(class='author')
                    div(class="profile")
                        img(class='profpic' src="../images/defaultavatar.jpeg" alt="P")
                        p.auth-name.sans-serif=post.User.username
                    a.headings-wrapper(href='/stories/' + post.id) --
                        h2=post.heading
                        h3=post.subText
                        p.meta-data.sans-serif=post.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    a(href=`/stories/${post.id}`)
                    img(src=post.headerImage class='listimg' alt=post.heading)
    */
                    
    const bottomObserver = new IntersectionObserver( async (entries,observer) => {
        let url = '/api/stories'
        let getPosts =  await fetch(url).then(res => res.json()).then(res => res);
        entries.forEach(entry => {
            if(entry.isIntersecting === true){
                // make call to api here to add more
                
                //construct post
                const postDiv = document.querySelector('.pContainer');
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

                    //need to import toLocaleDateString here
                    const date = document.createElement("p");
                    date.classList.add('meta-data','sans-serif');
                    date.innerText = post.createdAt;
                    author.appendChild(date)


                    const storyLink = document.createElement("a");
                    storyLink.href = `/stories/${post.id}`;


                    author.appendChild(storyLink)


                    const listImg = document.createElement("img");
                    listImg.src = post.headerImage;
                    listImg.classList.add('listimg');
                    listImg.alt = post.heading;

                    author.appendChild(listImg)
                    postDiv.appendChild(storyGridStory);
                })
            }
        })
    })
    /*
        makes sure the element being observed exists
    */
    if(background) observer.observe(background);
    if(bottom) bottomObserver.observe(bottom);
});
