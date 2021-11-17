

document.addEventListener("DOMContentLoaded",() => {
    const background = document.querySelector('#startWriting');
    const topbar = document.querySelector('.topbar');
    const login = document.querySelector('.login');
    const observer = new IntersectionObserver((entries,observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting === false) {
                topbar.classList.remove("topbarB");
                topbar.classList.add("topbarA");
                login.classList.remove("loginA");
                login.classList.add("loginB");
                
            }else{
                topbar.classList.add("topbarB");
                topbar.classList.remove("topbarA");
                login.classList.add("loginA");
                login.classList.remove("loginB");
            }
        })
    },{
        threshold:0.25
    })
    if(background) observer.observe(background);

    document.querySelector('.metabar-menu').addEventListener('click',(e) => {
        const dropdown = document.querySelector('.dropdown').style.display
        if(dropdown === 'block'){
            document.querySelector('.dropdown').style.display = 'none';
        }else{
            document.querySelector('.dropdown').style.display = 'block';
        }
    })
})