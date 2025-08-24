const mycheckb = document.getElementById('checkbox');

mycheckb.addEventListener('change', () =>{
    const mybody = document.body;
    const mysun = document.getElementById('sun');
    const mymoon = document.getElementById('moon');
    
    if(mycheckb.checked){
        mysun.className = 'fa-regular fa-sun';
        mymoon.className = 'fa-solid fa-moon';

        mysun.style.color = 'white';
        mymoon.style.color = 'white';
        mybody.classList.remove("lightmode");
        mybody.classList.add("darkmode");



    }else{
        mysun.className = 'fa-solid fa-sun';
        mymoon.className = 'fa-regular fa-moon';

        mysun.style.color = 'black';
        mymoon.style.color = 'black';

        mybody.classList.remove("darkmode");
        mybody.classList.add("lightmode");
    }

});



    