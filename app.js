// ------------------ Funciones
//
// ------------------ Spinner de carga
const loading = (estado) => {
    const spinner = document.querySelector('.container .cargando');

    if(estado) {
        // Mostrar el spinner de carga
        spinner.classList.remove('d-none');
    }
    else {
        // Ocultar el spinner de carga
        spinner.classList.add('d-none');
    }
};

// ------------------ Interferir el DOM con la data
const manipularData = (data) => {
    const characters = data.results;

    // console.table(characters, ['id', 'name', 'species', 'image', 'url']);

    const seccionCards = document.querySelector('#cards-dinamicas');
    const seccionCardsTemplate = document.querySelector('#card-dinamica-tamplate').content;
    const fragmentCards = document.createDocumentFragment();

    seccionCards.textContent = '';

    characters.forEach(character => {
        const clonSeccionCardsTemplate = seccionCardsTemplate.cloneNode(true);

        clonSeccionCardsTemplate.querySelector('.card .card-img-top').src = character.image;
        clonSeccionCardsTemplate.querySelector('.card .card-body .card-title').textContent = character.name;
        clonSeccionCardsTemplate.querySelector('.card .card-body p.lead').textContent = character.species;
        clonSeccionCardsTemplate.querySelector('.card .card-body .btn.btn-primary').href = character.url;

        fragmentCards.appendChild(clonSeccionCardsTemplate);
    });

    seccionCards.appendChild(fragmentCards);

    paginar(data.info);
};

// ------------------ Petición a la API de Rick y Morty
const renderCards = async (url) => {
    try {
        loading(true);

        const res = await fetch(url);
        const data = await res.json();
        
        manipularData(data);
    } catch (error) {
        console.log(error);
    } finally {
        loading(false);
    }
};

// ------------------ Paginar
const paginar = (data) => {
    console.log(data);

    const paginationSection = document.querySelector('#pagination');
    const paginationTemplate = document.querySelector('#pagination-template').content;

    const clonPaginationTemplate = paginationTemplate.firstElementChild.cloneNode(true);
    const paginationButtons = clonPaginationTemplate.querySelectorAll('button');

    paginationButtons.forEach(button => {
        // ------------------ Si es la primera o la última página, se desactiva el botón
        if((button.dataset.botonPaginacion === 'prev' && !data.prev) 
        || (button.dataset.botonPaginacion === 'next' && !data.next)) {
            button.disabled = true;
        }
        
        // ------------------ Revertir el efecto de desactivado
        if((button.dataset.botonPaginacion === 'prev' && data.prev) 
        || (button.dataset.botonPaginacion === 'next' && data.next)) {
            button.disabled = false;

            if(button.dataset.botonPaginacion === 'prev') {
                button.dataset.url = data.prev;
            }

            if(button.dataset.botonPaginacion === 'next') {
                button.dataset.url = data.next;
            }
        }

        console.log(button.dataset.url);
    });

    paginationSection.textContent = '';

    // ------------------ Al solo ser un clon, no se necesita fragment
    paginationSection.appendChild(clonPaginationTemplate);
};

// Delegación de eventos
//
// ------------------ Cargar el DOM
document.addEventListener('DOMContentLoaded', (e) => {
    // URL de la API
    const url = 'https://rickandmortyapi.com/api/character';

    renderCards(url);
});

document.addEventListener('click', (e) => {
    const fuenteEvento = e.target;

    if(fuenteEvento.dataset.botonPaginacion === 'prev' || fuenteEvento.dataset.botonPaginacion === 'next') {
        renderCards(fuenteEvento.dataset.url);
    }
});
