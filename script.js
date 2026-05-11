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