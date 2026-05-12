const toggle = document.getElementById("cambiarTema");
const body = document.body;

// cargar tema 
const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "dark") {
    body.classList.add("dark");
    toggle.textContent = "☀️";
}

// cambiar tema
toggle.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("tema", "dark");
        toggle.textContent = "☀️";
    } else {
        localStorage.setItem("tema", "light");
        toggle.textContent = "🌙";
    }
});










const habilidades = [
    { nombre: "HTML" },
    { nombre: "CSS" },
    { nombre: "Java" },
    { nombre: "SQL" },
    { nombre: "JavaScript" }
];


const listaHabilidades = document.getElementById("lista-habilidades");
const habilidadForm = document.getElementById("habilidad-form");



function mostrarHabilidades() {
    listaHabilidades.innerHTML = "";
    habilidades.forEach(habilidad => {
        const elemento = document.createElement("p");
        elemento.textContent = habilidad.nombre;
        listaHabilidades.appendChild(elemento);
    });
}


habilidadForm.addEventListener("submit", function () {
    event.preventDefault();
    const inputHabilidad =
        document.getElementById("nombre-habilidad");
    const nuevaHabilidad = {
        nombre: inputHabilidad.value
    };

    habilidades.push(nuevaHabilidad);
    mostrarHabilidades();
    habilidadForm.reset();
});


mostrarHabilidades();

