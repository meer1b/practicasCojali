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



const listaEstudios = document.getElementById("lista-estudios");
const formEstudio = document.getElementById("form-estudio");
const btnFormEstudio = document.getElementById("btn-form-estudio");

const estudios = [
    {
        titulo: "CFGS DAM",
        centro: "IES Gregorio Prieto",
        fecha: "Actualidad"
    },
    {
        titulo: "CFGM SMR",
        centro: "IES Gregorio Prieto",
        fecha: "2023 - 2025"
    }
];

function mostrarEstudios() {
    listaEstudios.innerHTML = "";

    estudios.forEach(estudio => {
        const article = document.createElement("article");

        article.innerHTML = `
            <h3>${estudio.titulo}</h3>
            <p>${estudio.centro}</p>
            <p>${estudio.fecha}</p>
        `;

        listaEstudios.appendChild(article);
    });
}

btnFormEstudio.addEventListener("click", () => {
    if (formEstudio.style.display === "none") {
        formEstudio.style.display = "block";
    } else {
        formEstudio.style.display = "none";
    }
});


formEstudio.addEventListener("submit", (event) => {
    event.preventDefault();

    const nuevoEstudio = {
        titulo: document.getElementById("titulo-estudio").value,
        centro: document.getElementById("centro-estudio").value,
        fecha: document.getElementById("fecha-estudio").value
    };

    estudios.push(nuevoEstudio);

    mostrarEstudios();
    formEstudio.reset();
    formEstudio.style.display = "none";
});


mostrarEstudios();


