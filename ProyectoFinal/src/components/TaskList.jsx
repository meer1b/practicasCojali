import TaskCard from './TaskCard'

function TaskList({ tareas, onEditar, onEliminar, onCompletar }) {
    if (tareas.length === 0) {
        return (
            <div className="task-list-empty">
                <p className="empty-title">No hay tareas que mostrar</p>
                <p className="empty-subtitle">Crea una nueva tarea con el botón de arriba</p>
            </div>
        )
    }

    return (
        <div>
            <p className="task-list-count">
                Mostrando {tareas.length} tarea{tareas.length !== 1 ? 's' : ''}
            </p>
            <div className="task-grid">
                {tareas.map(tarea => (
                    <TaskCard
                        key={tarea.id}
                        tarea={tarea}
                        onEditar={onEditar}
                        onEliminar={onEliminar}
                        onCompletar={onCompletar}
                    />
                ))}
            </div>
        </div>
    )
}

export default TaskList
