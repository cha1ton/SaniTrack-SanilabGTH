// app/postulantes-actuales/page.js
"use client";

import { useEffect, useState } from "react";
import { getPostulantesActuales, ESTADOS_POSTULANTE } from "../../services/postulantesActualesService";
import FiltrosPostulantes from "../../components/postulantes-actuales/FiltrosPostulantes";
import TablaPostulantes from "../../components/postulantes-actuales/TablaPostulantes";
import ModalDetalle from "../../components/postulantes-actuales/ModalDetalle";
import ReporteResumido from "../../components/postulantes-actuales/ReporteResumido";
import PostulantesCharts from "../../components/postulantes-actuales/PostulantesCharts";

export default function PostulantesActualesPage() {
  const [todosPostulantes, setTodosPostulantes] = useState([]);
  const [filteredPostulantes, setFilteredPostulantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vistaActual, setVistaActual] = useState("lista");
  
  // Filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroPeriodo, setFiltroPeriodo] = useState("todos");
  const [ocultarAceptados, setOcultarAceptados] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 20;

  async function loadData() {
    setLoading(true);
    const data = await getPostulantesActuales();
    setTodosPostulantes(data);
    setLoading(false);
  }

  // Actualizar estado local después de editar
  const handleEstadoActualizado = (id, nuevoEstado) => {
    setTodosPostulantes(prev => 
      prev.map(p => p.id === id ? { ...p, estado_postulante: nuevoEstado } : p)
    );
  };

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...todosPostulantes];
    
    // Ocultar aceptados si el checkbox está marcado
    if (ocultarAceptados) {
      filtered = filtered.filter(p => p.estado_postulante !== "ACEPTADO (CONFIRMADO)");
    }
    
    // Filtro por estado
    if (filtroEstado !== "todos") {
      filtered = filtered.filter(p => p.estado_postulante === filtroEstado);
    }
    
    // Filtro por período
    if (filtroPeriodo !== "todos") {
      const ahora = new Date();
      let fechaLimite = new Date();
      
      switch(filtroPeriodo) {
        case "1sem":
          fechaLimite.setDate(ahora.getDate() - 7);
          break;
        case "2sem":
          fechaLimite.setDate(ahora.getDate() - 14);
          break;
        case "1mes":
          fechaLimite.setMonth(ahora.getMonth() - 1);
          break;
        case "3meses":
          fechaLimite.setMonth(ahora.getMonth() - 3);
          break;
        default:
          fechaLimite = null;
      }
      
      if (fechaLimite) {
        filtered = filtered.filter(p => {
          if (!p.fecha_postulacion) return false;
          return new Date(p.fecha_postulacion) >= fechaLimite;
        });
      }
    }
    
    // Búsqueda
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(busquedaLower) ||
        p.email.toLowerCase().includes(busquedaLower) ||
        p.carrera.toLowerCase().includes(busquedaLower)
      );
    }
    
    setFilteredPostulantes(filtered);
    setPaginaActual(1);
  }, [todosPostulantes, filtroEstado, filtroPeriodo, busqueda, ocultarAceptados]);

  useEffect(() => {
    loadData();
  }, []);

  // Paginación
  const indexOfLastItem = paginaActual * itemsPorPagina;
  const indexOfFirstItem = indexOfLastItem - itemsPorPagina;
  const currentItems = filteredPostulantes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPostulantes.length / itemsPorPagina);

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando postulantes...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📝 Postulantes Actuales (Formulario Wix)</h2>
        
        {/* Pestañas de navegación */}
        <div className="btn-group" role="group">
          <button 
            className={`btn ${vistaActual === "lista" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setVistaActual("lista")}
          >
            📋 Lista de Postulantes
          </button>
          <button 
            className={`btn ${vistaActual === "reporte" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setVistaActual("reporte")}
          >
            📊 Generar Reporte
          </button>
        </div>
      </div>
      
      <div className="alert alert-info">
        <strong>Total de postulantes:</strong> {todosPostulantes.length} | 
        <strong> Mostrando:</strong> {filteredPostulantes.length} después de filtros
        {ocultarAceptados && <span className="badge bg-success ms-2">🙈 Aceptados ocultos</span>}
      </div>

      {vistaActual === "lista" ? (
        <>
          {/* Filtros */}
          <FiltrosPostulantes
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            filtroEstado={filtroEstado}
            setFiltroEstado={setFiltroEstado}
            filtroPeriodo={filtroPeriodo}
            setFiltroPeriodo={setFiltroPeriodo}
            ocultarAceptados={ocultarAceptados}
            setOcultarAceptados={setOcultarAceptados}
          />

          {/* Tabla de postulantes */}
          <div className="card mt-4">
            <div className="card-header">
              <h4>📋 Lista de Postulantes</h4>
            </div>
            <div className="card-body">
              <TablaPostulantes
                currentItems={currentItems}
                indexOfFirstItem={indexOfFirstItem}
                onEstadoActualizado={handleEstadoActualizado}
              />
              
              {/* Paginación */}
              {totalPages > 1 && (
                <nav className="mt-3">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setPaginaActual(paginaActual - 1)}>Anterior</button>
                    </li>
                    {[...Array(Math.min(totalPages, 10))].map((_, i) => (
                      <li key={i} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setPaginaActual(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                    {totalPages > 10 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                    <li className={`page-item ${paginaActual === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setPaginaActual(paginaActual + 1)}>Siguiente</button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>

          {/* Gráficos */}
          <PostulantesCharts postulantes={filteredPostulantes} />

          {/* Modales */}
          {currentItems.map((postulante) => (
            <ModalDetalle key={`modal-${postulante.id}`} postulante={postulante} />
          ))}
        </>
      ) : (
        <ReporteResumido postulantes={todosPostulantes} />
      )}
    </div>
  );
}