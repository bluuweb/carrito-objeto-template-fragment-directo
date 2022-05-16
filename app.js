// ! practica DOM
const carrito = document.getElementById('carrito');
const template = document.getElementById('template');
const fragment = document.createDocumentFragment();
const btnBotones = document.querySelectorAll('.card .btn-a');
const btnBotonesEliminar = document.querySelectorAll('.card .btn-e');


const carritoCompras = {};

const agregarCarrito = (e) => {
    //console.log(e.target.dataset.fruta);
    
    const producto = {
        nombre: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1
    }

    carritoCompras[producto.nombre] 
    ? carritoCompras[producto.nombre].cantidad++ 
    : carritoCompras[producto.nombre] = producto;
    console.log(Object.getOwnPropertyNames(carritoCompras));
    pintarCarrito();

}

const pintarCarrito = () => {

    carrito.textContent = '';

    Object.values(carritoCompras).forEach((item) => {
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector('.lead').textContent = item.nombre;
        clone.querySelector('.badge').textContent = item.cantidad;
        fragment.appendChild(clone);
    })

    carrito.appendChild(fragment);
}

btnBotones.forEach( (btn) => btn.addEventListener('click', agregarCarrito) );

btnBotonesEliminar.forEach( btn => btn.addEventListener('click', (e) => {

    if(Object.getOwnPropertyNames(carritoCompras).length != 0){
        if(carritoCompras[e.target.dataset.fruta].cantidad != 0 ){
            carritoCompras[e.target.dataset.fruta].cantidad--;
            pintarCarrito();

            if(carritoCompras[e.target.dataset.fruta].cantidad === 0){
                delete carritoCompras[e.target.dataset.fruta];
            }
        }
        else{
            alert(`ya no tienes mas ${e.target.dataset.fruta}`);
        }
    } 
    else {
        alert('No hay productos en el carrito');
        carrito.textContent = '';
        return
    }

}));
