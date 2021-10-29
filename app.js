const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = new FormData(formulario);

    for (let item of inputs) {
        console.log(item);
    }

    console.log(inputs.get("userName"));
    console.log(inputs.get("userEmail"));

    console.log("procesando formulario");
});
