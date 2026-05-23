import { useState, useEffect } from 'react'

const TAREA_VACIA = {
    titulo: '',
    descripcion: '',
    prioridad: 'media',
    estado: 'pendiente',
    fechaLimite: '',
}

function TaskForm({ tareaEditando, onGuardar, onCancelar }) {
    const [formulario, setFormulario] = useState(TAREA_VACIA)
    const [error, setError] = useState('')


    useEffect(() => {
        if (tareaEditando) {
            setFormulario(tareaEditando)
        } else {
            setFormulario(TAREA_VACIA)
        }
    }, [tareaEditando])

    function handleChange(e) {
        const { name, value } = e.target
        setFormulario({ ...formulario, [name]: value })
        setError('') 
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!formulario.titulo.trim()) {
            setError('El título es obligatorio.')
            return
        }

        onGuardar(formulario)
    }

    const esEdicion = !!tareaEditando

    return (
        <div className="task-form-wrapper">
            <h2>{esEdicion ? 'Editar tarea' : 'Nueva tarea'}</h2>

            <form onSubmit={handleSubmit}>
                {/* Título */}
                <div className="form-field">
                    <label>Título *</label>
                    <input
                        type="text"
                        name="titulo"
                        value={formulario.titulo}
                        onChange={handleChange}
                        maxLength={100}
                        placeholder="Escribe el título de la tarea..."
                    />
                    <small>{formulario.titulo.length}/100</small>
                </div>

                {/* Descripción */}
                <div className="form-field">
                    <label>Descripción</label>
                    <textarea
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={handleChange}
                        maxLength={500}
                        rows={3}
                        placeholder="Descripción opcional..."
                    />
                    <small>{formulario.descripcion.length}/500</small>
                </div>

                {/* Prioridad, Estado y Fecha en la misma fila */}
                <div className="form-row">
                    <div className="form-row-item">
                        <label>Prioridad</label>
                        <select name="prioridad" value={formulario.prioridad} onChange={handleChange}>
                            <option value="alta">🔴 Alta</option>
                            <option value="media">🟡 Media</option>
                            <option value="baja">🟢 Baja</option>
                        </select>
                    </div>

                    <div className="form-row-item">
                        <label>Estado</label>
                        <select name="estado" value={formulario.estado} onChange={handleChange}>
                            <option value="pendiente">Pendiente</option>
                            <option value="en-progreso">En progreso</option>
                            <option value="completada">Completada</option>
                        </select>
                    </div>

                    <div className="form-row-item">
                        <label>Fecha límite</label>
                        <input
                            type="date"
                            name="fechaLimite"
                            value={formulario.fechaLimite}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Error */}
                {error && <p className="form-error">{error}</p>}

                {/* Botones */}
                <div className="form-buttons">
                    <button type="submit" className="btn-guardar">
                        {esEdicion ? 'Guardar Cambios' : 'Crear Tarea'}
                    </button>
                    <button type="button" className="btn-cancelar" onClick={onCancelar}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm
