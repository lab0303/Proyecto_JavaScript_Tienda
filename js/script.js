const carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
document.getElementById("numCarrito").innerHTML = carrito.length;
const total = carrito.reduce((acum,juego)=> acum + (juego.precio),0);
document.getElementById("totalCarrito").innerHTML = (total);

const juegos = [
    { id: 1, nombre: "PES2022", plataforma: "PS5" , precio : 60, img :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGxYXYSOW6iwTeo17vDBO56SnJMZzndtJ5Xg&usqp=CAU" },
    { id: 2, nombre: "CALL OF DUTY", plataforma: "PC" , precio : 60, img :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDk2pFlpiZb0ZIBlrMR4Cq6wbuuDsykUdiCg&usqp=CAU" },
    { id: 3, nombre: "FIFA2022", plataforma: "XBOX" , precio : 60, img :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTpMLvgEH-5UXS879CqlRg0LNBo6Nbt9EBjA&usqp=CAU" },
    { id: 4, nombre: "UFC4", plataforma: "PC" , precio : 60, img :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY6EfLJKF0UbAiEIIv4Y8iZDXawYQf7lnr_w&usqp=CAU" },
    { id: 5, nombre: "GOW4", plataforma: "PS5" , precio : 60, img :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP5t7VX02TezGm3qSd30yoIY_GbqmPbZ2TGA&usqp=CAU" },
    { id: 6, nombre: "HALO", plataforma: "XBOX" , precio : 60, img :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaBUyir66dhkSFuqSgwabMD2CHB7gXoqqKA&usqp=CAU" },
];

const producto = document.querySelector(".tab-content");
const agregado = document.querySelector("#agregado");

for(const juego of juegos){
    const idCarrito = `idCart${juego.id}`;
    juegoLista = document.createElement("div");
    juegoLista.classList.add(`${juego.plataforma}`);
    juegoLista.innerHTML = ` 
    
        <div class= "single-product">
        <div class= "product-block">
        <img src="${juego.img}" alt="pes22" class="thumbnail">
        <div class="product-description text-center">
            <p class="price">$ ${juego.precio}</p>
            <p class="title">${juego.nombre}</p>
            <p class="plataforma">${juego.plataforma}</p>
            <button  id = ${idCarrito} class="btn btn-shop-category">Agregar al carrito</button>
            </div>
            </div>
     </div>
`
producto.appendChild(juegoLista)
}

for(const juego of juegos){
    const idCarrito = `idCart${juego.id}`;
    document.getElementById(idCarrito).onclick=()=>{
        carrito.push(juego);
        document.getElementById("numCarrito").innerHTML = carrito.length;
        const total = carrito.reduce((acum,juego)=> acum + (juego.precio),0);
        document.getElementById("totalCarrito").innerHTML = (total);
        localStorage.setItem("carrito",JSON.stringify(carrito));
        document.getElementById("agregado").innerHTML= "";
        for(let i=0;i<carrito.length;i++){
            const idDelete = `idDel${i+1}`;
            document.getElementById("agregado").innerHTML += `<div>
            <h2>${carrito[i].nombre}</h2> <button id=${idDelete} ">Sacar juego</button></div>` 
        }
        for(let i=0;i<agregado.children.length;i++){
            const idDelete = `idDel${i+1}`;
            let borrar = document.getElementById(idDelete) ;
            borrar.addEventListener("click",()=>{
                agregado.children[i].parentElement.removeChild(agregado.children[i]);
            })
        }
        
        
    }

}
for(let i=0;i<carrito.length;i++){
    const idDelete = `idDel${i+1}`;
    document.getElementById("agregado").innerHTML += `<div>
    <h2>${carrito[i].nombre}</h2> <button id=${idDelete} ">Sacar juego</button></div>` 
}

for(let i=0;i<agregado.children.length;i++){
    const idDelete = `idDel${i+1}`;
    let borrar = document.getElementById(idDelete) ;
    borrar.addEventListener("click",()=>{
        console.log(i)
        agregado.children[i].parentElement.removeChild(agregado.children[i]);
     
    })
}





const btnPs5 = document.querySelector(".ps5");
const btnPc = document.querySelector(".pc");
const btnXbox = document.querySelector(".xbox");
const btnAll = document.querySelector(".all");
const input = document.getElementById("input");

function mostrarTodo(){
    for(let i=0; i<producto.children.length; i++) {
            producto.children[i].style.display = "block";   
    }
};

function mostrarCategoria(btn){
    for(let i=0; i<producto.children.length; i++) {
        if(producto.children[i].className !== btn){
            producto.children[i].style.display = "none";
        }
    }
};
// boton de PS5
btnPs5.addEventListener("click", () => {
    const ps5Btn = btnPs5.textContent;
    mostrarTodo();
    mostrarCategoria(ps5Btn);
});
// boton de PC
btnPc.addEventListener("click", () => {
    const pcBtn = btnPc.textContent;
    mostrarTodo();
    mostrarCategoria(pcBtn);
});
// boton de XBOX
btnXbox.addEventListener("click", () => {
    const xboxBtn = btnXbox.textContent;
    mostrarTodo();
    mostrarCategoria(xboxBtn);
});
btnAll.addEventListener("click", () => {
    mostrarTodo();
});

// Filtrar producto por busqueda
input.addEventListener("input", (e) => {
    const title = document.getElementsByClassName("title");
    const value = e.target.value.toLowerCase();
Array.from(title).forEach((el, i)=>{
    const element = el.textContent.toLowerCase();
    if(element.indexOf(value)!=-1){
        el.closest(".tab-content").children[i].style.display = "block";
    }else{
        el.closest(".tab-content").children[i].style.display = "none";
    }
})
} 
);