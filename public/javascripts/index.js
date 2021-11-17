
//do things after DOM has been loaded
document.addEventListener("DOMContentLoaded",() => {
    const background = document.querySelector('#startWriting');
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

    /*
        makes sure the element being observed exists
    */
    if(background) observer.observe(background);

    //metabar menu click listener
    document.querySelector('.metabar-menu').addEventListener('click',(e) => {
        const dropdown = document.querySelector('.dropdown').style.display
        if(dropdown === 'block'){
            document.querySelector('.dropdown').style.display = 'none';
        }else{
            document.querySelector('.dropdown').style.display = 'block';
        }
    });
    /*
        navigation for following and recommended stories
    */
   function changeActiveBtn(e,btnName){
        if(e.target.classList.contains('snbOff')){
            e.target.classList.remove('snbOff');
            e.target.classList.add('snb');
            document.querySelector(btnName).classList.remove('snb');
            document.querySelector(btnName).classList.add('snbOff');
        }
   } 
    document.querySelector('.snButton1').addEventListener('click',(e) => {
        changeActiveBtn(e,'.snButton2');
        document.querySelector('.reco-content').style.display = 'none';
        document.querySelector('.follow-content').style.display = 'block';
    });
    document.querySelector('.snButton2').addEventListener('click',(e) => {
        changeActiveBtn(e,'.snButton1');
        document.querySelector('.reco-content').style.display = 'block';
        document.querySelector('.follow-content').style.display = 'none';
    });

    
    document.querySelector('.browse').addEventListener('click',(e) => {
        document.querySelector('.snButton1').classList.remove('snb');
        document.querySelector('.snButton1').classList.add('snbOff');
        document.querySelector('.snButton2').classList.remove('snbOff');
        document.querySelector('.snButton2').classList.add('snb');
        
        document.querySelector('.reco-content').style.display = 'block';
        document.querySelector('.follow-content').style.display = 'none';
    });
    if(document.querySelector('.follow-content').children.length){
        document.querySelector('.empty-follow').style.display = 'block';
    }else{
        document.querySelector('.empty-follow').style.display = 'none';
    }
})