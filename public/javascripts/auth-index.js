import {constructPost} from './utils.js'
    document.addEventListener('DOMContentLoaded',(e) => {
        /*
            navigation for following and recommended stories
        */
        document.querySelector('.follow-content').style.display = 'block';
        function changeActiveBtn(e,btnName){
                if(e.target.classList.contains('snbOff')){
                    e.target.classList.remove('snbOff');
                    e.target.classList.add('snb');
                    document.querySelector(btnName).classList.remove('snb');
                    document.querySelector(btnName).classList.add('snbOff');
                }
        } 
        document.querySelector('.snButton1').addEventListener('click',async(e) => {
            changeActiveBtn(e,'.snButton2');
            await fetch('/reset');
            const stories = await fetch('/api/stories/following').then(res => res.json());
            document.querySelector('.follow-content').innerHTML = '';
            constructPost(stories,'.follow-content')
            
            document.querySelector('.reco-content').style.display = 'none';
            document.querySelector('.follow-content').style.display = 'block';
        });
        document.querySelector('.snButton2').addEventListener('click',async(e) => {
            changeActiveBtn(e,'.snButton1');
            await fetch('/reset');
            const stories = await fetch('/api/stories').then(res => res.json());
            document.querySelector('.reco-content').innerHTML = '';
            constructPost(stories,'.reco-content');
            
            document.querySelector('.reco-content').style.display = 'block';
            document.querySelector('.follow-content').style.display = 'none';
        });
        
        /*
            listens for clicks on following and recommended tabs
        */
        document.querySelector('.browse').addEventListener('click',(e) => {
            document.querySelector('.snButton1').classList.remove('snb');
            document.querySelector('.snButton1').classList.add('snbOff');
            document.querySelector('.snButton2').classList.remove('snbOff');
            document.querySelector('.snButton2').classList.add('snb');
            
            document.querySelector('.reco-content').style.display = 'block';
            document.querySelector('.follow-content').style.display = 'none';
        });
        
        if(document.querySelector('.follow-content').children.length === 1){
            document.querySelector('.empty-follow').style.display = 'block';
        }else{
            document.querySelector('.empty-follow').style.display = 'none';
        }
    })
     //Infinite scroll
     const reco = document.querySelector('.reco-content');
     const foll = document.querySelector('.follow-content');
     const bottom = document.querySelector('.bott');
     const bottomObserver = new IntersectionObserver( async (entries,observer) => {
        let url;
        let getPosts;
        //prevent fetch unless tab is open
        if(reco.style.display === 'block'){
            url = '/api/stories'
        }else if(foll.style.display === 'block'){
            url = '/api/stories/following'
        }
       
        entries.forEach(async(entry) => {
            
            if(entry.isIntersecting && reco.style.display === 'block'){
                getPosts =  await fetch(url).then(res => res.json());
                constructPost(getPosts,'.pContainer');
            }else if(entry.isIntersecting && foll.style.display === 'block'){
                getPosts =  await fetch(url).then(res => res.json());
                constructPost(getPosts,'.follow-content');
            }
        })
    })
    /*
        makes sure the element being observed exists
    */
    if(bottom) bottomObserver.observe(bottom);
