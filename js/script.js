const carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
document.getElementById("numCarrito").innerHTML = carrito.length;
const total = carrito.reduce((acum,juego)=> acum + (juego.precio),0);
document.getElementById("totalCarrito").innerHTML = (total);

const juegos = async()=>{
    const resp = await fetch("./js/juegos.json");
    const data = await resp.json();
    for(const juego of data){
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
    
    for(const juego of data){
        const idCarrito = `idCart${juego.id}`;
        document.getElementById(idCarrito).onclick=()=>{
         
            if(carrito.includes(juego)){
                Swal.fire(`Ya tienes ${juego.nombre} en el carrito`)
            }else{
                Swal.fire({
                    title: 'Genial',
                    text: `Agregaste ${juego.nombre} a tu carrito`,
                    imageUrl: `${juego.img}`,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                  })
                carrito.push(juego);
            }
            
            document.getElementById("numCarrito").innerHTML = carrito.length;
            const total = carrito.reduce((acum,juego)=> acum + (juego.precio),0);
            document.getElementById("totalCarrito").innerHTML = (total);
            localStorage.setItem("carrito",JSON.stringify(carrito));
            document.getElementById("agregado").innerHTML= "";
      
            // for para agregar al carrito     
      
            for(let i=0;i<carrito.length;i++){
                const idDelete = `idDel${i}`;
                document.getElementById("agregado").innerHTML += `<div>
                <h2>${carrito[i].nombre}</h2> <button id=${idDelete} ">Sacar juego</button></div>` 
            }
            for(let i=0;i<agregado.children.length;i++){
                const idDelete = `idDel${i}`;
                let borrar = document.getElementById(idDelete) ;
                borrar.addEventListener("click",()=>{
                    Swal.fire({
                    title: 'Estas seguro de borrar?',
                    text: "No podras revertir esto",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, borrar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        borrarChild = borrar.parentElement.parentElement;
                        borrarChild.removeChild(borrar.parentElement);
                        let indice = carrito.indexOf(carrito[i]);
                         const nuevo = carrito.splice(indice,1);
                         document.getElementById("numCarrito").innerHTML = carrito.length;
                        const total = carrito.reduce((acum,juego)=> acum + (juego.precio),0);
                        document.getElementById("totalCarrito").innerHTML = (total);
                        localStorage.setItem("carrito",JSON.stringify(carrito));
                      Swal.fire(
                        'Borrado!',
                        `El juego fue borrado`,
                        'success'
                      )
                    }
                  })  
                })
            }  
        }
    } 
}

juegos()

const producto = document.querySelector(".tab-content");
const agregado = document.querySelector("#agregado");

for(let i=0;i<carrito.length;i++){
    const idDelete = `idDel${i}`;
    document.getElementById("agregado").innerHTML += `<div>
    <h2>${carrito[i].nombre}</h2> <button id=${idDelete} ">Sacar juego</button></div>` 
}

for(let i=0;i<agregado.children.length;i++){
    const idDelete = `idDel${i}`;
    let borrar = document.getElementById(idDelete) ;
    borrar.addEventListener("click",()=>{
        Swal.fire({
            title: 'Estas seguro de borrar?',
            text: "No podras revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar'
          }).then((result) => {
            if (result.isConfirmed) {
                borrarChild = borrar.parentElement.parentElement;
        borrarChild.removeChild(borrar.parentElement);
        
        let indice = carrito.indexOf(carrito[i]);
                const nuevo = carrito.splice(indice,1);
                document.getElementById("numCarrito").innerHTML = carrito.length;
                const total = carrito.reduce((acum,juego)=> acum + (juego.precio),0);
                document.getElementById("totalCarrito").innerHTML = (total);
                localStorage.setItem("carrito",JSON.stringify(carrito));
                Swal.fire(
                    'Borrado!',
                    `El juego fue borrado`,
                    'success'
              )
            }
          })
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


