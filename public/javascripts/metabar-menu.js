document.querySelector('.metabar-menu').addEventListener('click',(e) => {
    const dropdown = document.querySelector('.dropdown').style.display
    if(dropdown === 'block'){
        document.querySelector('.dropdown').style.display = 'none';
    }else{
        document.querySelector('.dropdown').style.display = 'block';
    }
  });
  // close menu when clicking outside of it
  document.querySelector('.dropdown').addEventListener('click',(e) => {
    e.stopPropagation();
  })
  document.addEventListener('click',(e) => {
    console.log(e.target);
    if(e.target !== document.querySelector('.metabar-menu'))
        document.querySelector('.dropdown').style.display = 'none';
  })