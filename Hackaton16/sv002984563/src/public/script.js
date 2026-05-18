function showSection(sectionId){

    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId)
        .classList.remove("hidden");
}

const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;

    const description = document.getElementById("description").value;

    const price = document.getElementById("price").value;

    try{

        const response = await fetch("/products", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                name,
                description,
                price
            })

        });

        const data = await response.json();

        console.log(data);

        alert("Producto guardado");

        form.reset();

    }catch(error){

        console.error(error);

        alert("Error al guardar producto");

    }

});