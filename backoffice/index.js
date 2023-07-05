const btnColaboradores  = document.getElementById("btnColaboradores");
const menuItem          = [...document.querySelectorAll(".btnMenuItem")];
const menuItemsI        = document.getElementById("menuItems");

const endpointConfig = `../config.txt`;
fetch(endpointConfig)
.then(res=>res.json())
.then(res=>{
    sessionStorage.setItem("servidor_nodered", res.servidor_nodered);
    sessionStorage.setItem("versao", res.versao);
})

menuItem.map(elemento=>{
    elemento.addEventListener("click", ()=>{
        menuItemsI.classList.add("ocultar");
    })
})

const btnMenuPrincipal = document.querySelector("#btnMenuPrincipal");
const menuItems = document.querySelector("#menuItems");

btnMenuPrincipal.addEventListener("click", ()=>{
    menuItems.classList.toggle("ocultar");
})
