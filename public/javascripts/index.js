import {constructPost} from './utils.js'
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
    const bottomObserver = new IntersectionObserver( async (entries,observer) => {
        let url = '/api/stories';

       
        entries.forEach(async(entry) => {
            console.log(entry);
            if(entry.isIntersecting ){
                let getPosts =  await fetch(url).then(res => res.json()).then(res => res);
                constructPost(getPosts,'.pContainer');
            }
        })
    },{threshold:1})
    /*
        makes sure the element being observed exists
    */
    if(background) observer.observe(background);
    if(bottom) bottomObserver.observe(bottom);
});

