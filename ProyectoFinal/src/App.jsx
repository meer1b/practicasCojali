import { useState, useEffect } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

// Clave para guardar en localStorage
const STORAGE_KEY = 'mis-tareas'

function App() {
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem(STORAGE_KEY)
    return guardadas ? JSON.parse(guardadas) : []
  })

  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const [tareaEditando, setTareaEditando] = useState(null)

  const [filtros, setFiltros] = useState({
    estado: 'todas',
    prioridad: 'todas',
    orden: 'recientes',
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas))
  }, [tareas])

  function crearTarea(datosTarea) {
    const nuevaTarea = {
      id: Date.now(), 
      ...datosTarea,
      fechaCreacion: new Date().toISOString(),
    }
    setTareas([...tareas, nuevaTarea])
    setMostrarFormulario(false)
  }

  function editarTarea(datosTarea) {
    setTareas(tareas.map(t => (t.id === datosTarea.id ? datosTarea : t)))
    setTareaEditando(null)
    setMostrarFormulario(false)
  }

  function eliminarTarea(id) {
    if (window.confirm('Seguro que quieres eliminar esta tarea?')) {
      setTareas(tareas.filter(t => t.id !== id))
    }
  }

  function completarTarea(id) {
    setTareas(tareas.map(t =>
      t.id === id ? { ...t, estado: t.estado === 'completada' ? 'pendiente' : 'completada' } : t
    ))
  }

  function abrirEdicion(tarea) {
    setTareaEditando(tarea)
    setMostrarFormulario(true)
  }

  function cerrarFormulario() {
    setMostrarFormulario(false)
    setTareaEditando(null)
  }

  function obtenerTareasFiltradas() {
    let resultado = [...tareas]

    if (filtros.estado !== 'todas') {
      resultado = resultado.filter(t => t.estado === filtros.estado)
    }

    if (filtros.prioridad !== 'todas') {
      resultado = resultado.filter(t => t.prioridad === filtros.prioridad)
    }

    const prioridadOrden = { alta: 3, media: 2, baja: 1 }
    if (filtros.orden === 'recientes') {
      resultado.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
    } else if (filtros.orden === 'antiguos') {
      resultado.sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion))
    } else if (filtros.orden === 'fechaLimite') {
      resultado.sort((a, b) => {
        if (!a.fechaLimite) return 1
        if (!b.fechaLimite) return -1
        return new Date(a.fechaLimite) - new Date(b.fechaLimite)
      })
    } else if (filtros.orden === 'prioridadAlta') {
      resultado.sort((a, b) => prioridadOrden[b.prioridad] - prioridadOrden[a.prioridad])
    } else if (filtros.orden === 'prioridadBaja') {
      resultado.sort((a, b) => prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad])
    } else if (filtros.orden === 'tituloAZ') {
      resultado.sort((a, b) => a.titulo.localeCompare(b.titulo))
    } else if (filtros.orden === 'tituloZA') {
      resultado.sort((a, b) => b.titulo.localeCompare(a.titulo))
    }

    return resultado
  }

  const tareasFiltradas = obtenerTareasFiltradas()

  return (
    <div>
      <Header
        totalTareas={tareas.length}
        onNuevaTarea={() => { setTareaEditando(null); setMostrarFormulario(true) }}
      />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px' }}>
        {mostrarFormulario && (
          <TaskForm
            tareaEditando={tareaEditando}
            onGuardar={tareaEditando ? editarTarea : crearTarea}
            onCancelar={cerrarFormulario}
          />
        )}

        <FilterBar filtros={filtros} onCambiarFiltros={setFiltros} />

        <TaskList
          tareas={tareasFiltradas}
          onEditar={abrirEdicion}
          onEliminar={eliminarTarea}
          onCompletar={completarTarea}
        />
      </main>
    </div>
  )
}

export default App
