import { useState, useEffect } from "react";

const estudiosIniciales = [
  { titulo: "CFGS DAM", centro: "IES Gregorio Prieto", fecha: "Actualidad" },
  { titulo: "CFGM SMR", centro: "IES Gregorio Prieto", fecha: "2023 - 2025" },
];

function App() {
  // --- Tema oscuro ---
  const [dark, setDark] = useState(() => localStorage.getItem("tema") === "dark");

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("tema", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("tema", "light");
    }
  }, [dark]);

  // --- Formación ---
  const [estudios, setEstudios] = useState(estudiosIniciales);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nuevoEstudio, setNuevoEstudio] = useState({ titulo: "", centro: "", fecha: "" });

  function handleSubmitEstudio(e) {
    e.preventDefault();
    setEstudios([...estudios, nuevoEstudio]);
    setNuevoEstudio({ titulo: "", centro: "", fecha: "" });
    setMostrarForm(false);
  }

  // --- Repositorios GitHub ---
  const [repos, setRepos] = useState([]);
  const [errorRepos, setErrorRepos] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/meer1b/repos")
      .then((res) => res.json())
      .then((data) => setRepos(data))
      .catch(() => setErrorRepos(true));
  }, []);

  return (
    <>
      <header>
        <h1>María Buceta</h1>
        <button id="cambiarTema" onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
        <nav>
          <ul className="menu">
            <li><a href="#sobre-mi">Sobre mí</a></li>
            <li><a href="#habilidades">Habilidades</a></li>
            <li><a href="#formacion">Formación</a></li>
            <li><a href="#experiencia">Experiencia</a></li>
            <li><a href="#proyectos">Proyectos</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Sobre mí */}
        <section id="sobre-mi">
          <h2>Sobre mí</h2>
          <p>
            Soy estudiante de Desarrollo de Aplicaciones Multiplataforma y me interesa el desarrollo de aplicaciones.
            Tengo especial interés en los videojuegos y en cómo se crean.
          </p>
        </section>

        {/* Habilidades */}
        <section id="habilidades">
          <h2>Habilidades</h2>
          <div id="lista-habilidades">
            {["HTML", "CSS", "Java", "SQL", "JavaScript"].map((h) => (
              <p key={h}>{h}</p>
            ))}
          </div>
        </section>

        {/* Formación */}
        <section id="formacion">
          <h2>Formación</h2>
          <div id="lista-estudios">
            {estudios.map((e, i) => (
              <article key={i}>
                <h3>{e.titulo}</h3>
                <p>{e.centro}</p>
                <p>{e.fecha}</p>
              </article>
            ))}
          </div>

          <button id="btn-form-estudio" onClick={() => setMostrarForm(!mostrarForm)}>
            Añadir estudio
          </button>

          {mostrarForm && (
            <form onSubmit={handleSubmitEstudio} style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="Título"
                required
                value={nuevoEstudio.titulo}
                onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, titulo: e.target.value })}
              />
              <input
                type="text"
                placeholder="Centro"
                required
                value={nuevoEstudio.centro}
                onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, centro: e.target.value })}
              />
              <input
                type="text"
                placeholder="Fecha"
                required
                value={nuevoEstudio.fecha}
                onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, fecha: e.target.value })}
              />
              <button type="submit">Guardar</button>
            </form>
          )}
        </section>

        {/* Experiencia */}
        <section id="experiencia">
          <h2>Experiencia</h2>
          <article>
            <h3>Prácticas en empresa</h3>
            <p>Mantenimiento de equipos, gestión de bases de datos y apoyo en tareas informáticas.</p>
          </article>
        </section>

        {/* Proyectos */}
        <section id="proyectos">
          <h2>Proyectos - repos GitHub</h2>
          <div id="repositorios">
            {errorRepos ? (
              <p>Error al cargar repositorios</p>
            ) : (
              repos.map((repo) => (
                <article className="repo" key={repo.id}>
                  <h3>{repo.name}</h3>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    Ver repositorio
                  </a>
                </article>
              ))
            )}
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto">
          <h2>Formulario de contacto</h2>
          <form>
            <label htmlFor="nombre">Nombre:</label><br />
            <input type="text" id="nombre" name="nombre" /><br /><br />

            <label htmlFor="email">Email:</label><br />
            <input type="email" id="email" name="email" /><br /><br />

            <label htmlFor="mensaje">Mensaje:</label><br />
            <textarea id="mensaje" name="mensaje"></textarea><br /><br />

            <button type="submit">Enviar</button>
          </form>
        </section>
      </main>

      <footer>
        <p>© 2026 María Buceta</p>
        <div className="redes">
          <a href="https://github.com/meer1b" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>
    </>
  );
}

export default App;