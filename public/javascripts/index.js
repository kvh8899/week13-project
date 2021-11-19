
//do things after DOM has been loaded
document.addEventListener("DOMContentLoaded",() => {
    const background = document.querySelector('.startWriting');
    const topbar = document.querySelector('.topbar');
    const login = document.querySelector('.login');
     /*
        when user has scrolled a certain amount,
        change styling of nav on unauth home page
    */
    const observer = new IntersectionObserver((entries,observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting === false) {
                topbar.classList.remove("topbarB");
                topbar.classList.add("topbarA");
                login.classList.remove("black");
                
            }else{
                topbar.classList.add("topbarB");
                topbar.classList.remove("topbarA");
                login.classList.add("black");
            }
        })
    },{
        threshold:0.25
    })

    /*
        makes sure the element being observed exists
    */
    if(background) observer.observe(background);
});
