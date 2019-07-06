import './sass/done/main.sass'


const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("id");

document.getElementById("back").addEventListener("click",function(){
    document.location.href="https://ipower.chinf.me/ipower?id=" + myParam;
})