const toggle = document.getElementById("cambiarTema");
const body = document.body;
const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "dark") {
    body.classList.add("dark");
    toggle.textContent = "☀️";
}

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




const contenedorRepos = document.getElementById("repositorios");

async function obtenerRepositorios() {
    try {
        const respuesta = await fetch(
            "https://api.github.com/users/meer1b/repos"
        );
        const repositorios = await respuesta.json();
        mostrarRepositorios(repositorios);

    } catch (error) {
        contenedorRepos.innerHTML =
            "<p>Error al cargar repositorios</p>";
    }
}

function mostrarRepositorios(repositorios) {
    contenedorRepos.innerHTML = "";
    repositorios.forEach(repo => {
        const article = document.createElement("article");
        article.classList.add("repo");
        article.innerHTML = `
            <h3>${repo.name}</h3>
            <a href="${repo.html_url}" target="_blank">
                Ver repositorio
            </a>
        `;
        contenedorRepos.appendChild(article);
    });
}

obtenerRepositorios();