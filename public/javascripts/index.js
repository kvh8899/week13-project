import {constructPost,deleteAnim} from './utils.js'
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
    let offset = 6;
    //Infinite scroll
    const bottomObserver = new IntersectionObserver( async (entries,observer) => {
        
        entries.forEach(async(entry) => {
            let url = '/api/stories?offset=' + offset;
            if(entry.isIntersecting ){
                let getPosts =  await fetch(url).then(res => res.json());
                if(!getPosts.length){
                    deleteAnim(".bott");
                    return;
                }
                offset += 6;
                document.querySelector('.anim').classList.add("hidden");
                constructPost(getPosts,'.pContainer');
            }else{
                document.querySelector('.anim').classList.remove("hidden");
            }
            
        })
    },{threshold:0.05})
    /*
        makes sure the element being observed exists
    */
    if(background) observer.observe(background);
    if(bottom) bottomObserver.observe(bottom);
});

