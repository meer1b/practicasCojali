function FilterBar({ filtros, onCambiarFiltros }) {
    function handleChange(e) {
        const { name, value } = e.target
        onCambiarFiltros({ ...filtros, [name]: value })
    }

    return (
        <div className="filter-bar">
            <h3>Filtros y Ordenación</h3>

            <div className="filter-item">
                <label>Estado</label>
                <select name="estado" value={filtros.estado} onChange={handleChange}>
                    <option value="todas">Todas</option>
                    <option value="pendiente">Pendientes</option>
                    <option value="en-progreso">En progreso</option>
                    <option value="completada">Completadas</option>
                </select>
            </div>

            <div className="filter-item">
                <label>Prioridad</label>
                <select name="prioridad" value={filtros.prioridad} onChange={handleChange}>
                    <option value="todas">Todas</option>
                    <option value="alta">🔴 Alta</option>
                    <option value="media">🟡 Media</option>
                    <option value="baja">🟢 Baja</option>
                </select>
            </div>

            <div className="filter-item-wide">
                <label>Ordenar por</label>
                <select name="orden" value={filtros.orden} onChange={handleChange}>
                    <option value="recientes">Más recientes</option>
                    <option value="antiguos">Más antiguos</option>
                    <option value="fechaLimite">Fecha límite</option>
                    <option value="prioridadAlta">Prioridad (alta - baja)</option>
                    <option value="prioridadBaja">Prioridad (baja - alta)</option>
                    <option value="tituloAZ">Título (A - Z)</option>
                    <option value="tituloZA">Título (Z - A)</option>
                </select>
            </div>
        </div>
    )
}

export default FilterBar
