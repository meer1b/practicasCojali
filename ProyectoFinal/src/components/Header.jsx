function Header({ totalTareas, onNuevaTarea }) {
    return (
        <header className="header">
            <div>
                <h1>Gestor de tareas</h1>
                <p>Total de tareas: {totalTareas}</p>
            </div>

            <button className="header-btn" onClick={onNuevaTarea}>
                + Nueva tarea
            </button>
        </header>
    )
}

export default Header
