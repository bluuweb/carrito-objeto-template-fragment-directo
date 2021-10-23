const carrito = document.getElementById("carrito");
const template = document.getElementById("template");
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("templateFooter");
const fragment = document.createDocumentFragment();

document.addEventListener("click", (e) => {
    // console.log(e.target.matches(".card .btn-outline-primary"));
    if (e.target.matches(".card .btn-outline-primary")) {
        // console.log("ejecutar agregar al carro");
        agragarAlCarrito(e);
    }

    // console.log(e.target.matches(".list-group-item .btn-success"));
    if (e.target.matches("#carrito .list-group-item .btn-success")) {
        btnAumentar(e);
    }

    if (e.target.matches("#carrito .list-group-item .btn-danger")) {
        btnDisminuir(e);
    }
});

let carritoObjeto = [];

const agragarAlCarrito = (e) => {
    // console.log(e.target.dataset.fruta);

    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
    };

    // console.log(producto);

    const indice = carritoObjeto.findIndex((item) => item.id === producto.id);

    // console.log(indice);

    if (indice === -1) {
        carritoObjeto.push(producto);
    } else {
        carritoObjeto[indice].cantidad++;
        // carritoObjeto[indice].precio =
        //     carritoObjeto[indice].cantidad * producto.precio;
    }

    console.log(carritoObjeto);

    pintarCarrito();
};

const pintarCarrito = () => {
    carrito.textContent = "";

    carritoObjeto.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".text-white .lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent =
            item.precio * item.cantidad;

        clone.querySelector(".btn-danger").dataset.id = item.id;
        clone.querySelector(".btn-success").dataset.id = item.id;
        fragment.appendChild(clone);
    });

    carrito.appendChild(fragment);

    pintarFooter();
};

const pintarFooter = () => {
    console.log("pitar footer");
    footer.textContent = "";

    const total = carritoObjeto.reduce(
        (acc, current) => acc + current.cantidad * current.precio,
        0
    );

    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("span").textContent = total;

    footer.appendChild(clone);
};

const btnAumentar = (e) => {
    console.log("me diste click ", e.target.dataset.id);
    carritoObjeto = carritoObjeto.map((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++;
        }
        return item;
    });

    pintarCarrito();
};

const btnDisminuir = (e) => {
    console.log("me diste click ", e.target.dataset.id);

    carritoObjeto = carritoObjeto.filter((item) => {
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--;
                if (item.cantidad === 0) return;
                return item;
            }
        } else {
            return item;
        }
    });

    console.log(carritoObjeto);

    pintarCarrito();
};
