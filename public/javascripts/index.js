

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

    //click listeners
    document.querySelector('.metabar-menu').addEventListener('click',(e) => {
        const dropdown = document.querySelector('.dropdown').style.display
        if(dropdown === 'block'){
            document.querySelector('.dropdown').style.display = 'none';
        }else{
            document.querySelector('.dropdown').style.display = 'block';
        }
    });
    document.querySelector('.snButton1').addEventListener('click',(e) => {
        if(e.target.classList.contains('snbOff')){
            e.target.classList.remove('snbOff');
            e.target.classList.add('snb');
            document.querySelector('.snButton2').classList.remove('snb');
            document.querySelector('.snButton2').classList.add('snbOff');
        }
        document.querySelector('.reco-content').style.display = 'none';
        document.querySelector('.follow-content').style.display = 'block';
    });
    document.querySelector('.snButton2').addEventListener('click',(e) => {
        if(e.target.classList.contains('snbOff')){
            e.target.classList.remove('snbOff');
            e.target.classList.add('snb');
            document.querySelector('.snButton1').classList.remove('snb');
            document.querySelector('.snButton1').classList.add('snbOff');
        }
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