const colorPrioridad = {
    alta: '#ef4444',
    media: '#f97316',
    baja: '#22c55e',
}

const textoEstado = {
    'pendiente': 'Pendiente',
    'en-progreso': 'En progreso',
    'completada': 'Completada',
}

function TaskCard({ tarea, onEditar, onEliminar, onCompletar }) {
    const estaCompleta = tarea.estado === 'completada'

    function formatearFecha(fecha) {
        if (!fecha) return null
        const d = new Date(fecha + 'T00:00:00')
        return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }

    function estaVencida() {
        if (!tarea.fechaLimite || estaCompleta) return false
        return new Date(tarea.fechaLimite) < new Date()
    }

    return (
        <div
            className={`task-card ${estaCompleta ? 'completada' : ''}`}
            style={{ borderTop: `4px solid ${colorPrioridad[tarea.prioridad]}` }}
        >
            <h3 className={`task-card-titulo ${estaCompleta ? 'tachado' : ''}`}>
                {tarea.titulo}
            </h3>

            {tarea.descripcion && (
                <p className="task-card-descripcion">{tarea.descripcion}</p>
            )}

            <div className="task-card-badges">
                <span
                    className="badge badge-prioridad"
                    style={{ backgroundColor: colorPrioridad[tarea.prioridad] }}
                >
                    {tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1)}
                </span>

                <span className={`badge badge-estado ${tarea.estado}`}>
                    {textoEstado[tarea.estado]}
                </span>
            </div>

            {tarea.fechaLimite && (
                <p className={`task-card-fecha ${estaVencida() ? 'vencida' : ''}`}>
                    {estaVencida() ? 'Vencida! ' : 'Límite: '}
                    {formatearFecha(tarea.fechaLimite)}
                </p>
            )}

            <div className="task-card-acciones">
                <button
                    className={`btn-completar ${estaCompleta ? 'reabrir' : ''}`}
                    onClick={() => onCompletar(tarea.id)}
                >
                    {estaCompleta ? 'Reabrir' : 'Completar'}
                </button>

                <button className="btn-editar" onClick={() => onEditar(tarea)}>
                    Editar
                </button>

                <button className="btn-eliminar" onClick={() => onEliminar(tarea.id)}>
                    Borrar
                </button>
            </div>
        </div>
    )
}

export default TaskCard