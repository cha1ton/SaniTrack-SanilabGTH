// app/onboarding/page.js

"use client";

import { useEffect, useState } from "react";
import { getOnboardingProgreso } from "../../services/onboardingService";
import TablaOnboarding from "../../components/onboarding/TablaOnboarding";
import FiltrosOnboarding from "../../components/onboarding/FiltrosOnboarding";

export default function OnboardingPage() {
  const [empleados, setEmpleados] = useState([]);
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para filtros
  const [filtroArea, setFiltroArea] = useState('todas');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  
  // Estados para paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 20;
  
  // Lista única de áreas
  const [areas, setAreas] = useState([]);
  
  useEffect(() => {
    cargarDatos();
  }, []);
  
  async function cargarDatos() {
    console.log('[Onboarding] Iniciando carga de datos...');
    setLoading(true);
    setError(null);
    
    try {
      // Obtener datos de onboarding_progreso (ya incluye área y fecha_inicio)
      const progreso = await getOnboardingProgreso();
      console.log('[Onboarding] Datos recibidos:', progreso.length, 'registros');
      
      // Ordenar por ID descendente (último primero)
      const ordenados = [...progreso].sort((a, b) => {
        const idA = parseInt(a.id) || 0;
        const idB = parseInt(b.id) || 0;
        return idB - idA;
      });
      
      console.log('[Onboarding] Ordenados:', ordenados.length, 'registros');
      
      setEmpleados(ordenados);
      
      // Extraer áreas únicas
      const uniqueAreas = [...new Set(ordenados.map(e => e.area).filter(a => a && a !== ''))];
      setAreas(uniqueAreas);
      console.log('[Onboarding] Áreas encontradas:', uniqueAreas.length);
      
    } catch (err) {
      console.error('[Onboarding] Error:', err);
      setError('Error al cargar los datos de onboarding');
    } finally {
      setLoading(false);
    }
  }
  
  // Aplicar filtros cuando cambien
  useEffect(() => {
    console.log('[Filtros] Aplicando filtros...');
    
    let filtrados = [...empleados];
    
    // Filtrar por área
    if (filtroArea !== 'todas') {
      filtrados = filtrados.filter(e => e.area === filtroArea);
      console.log('[Filtros] Por área:', filtrados.length);
    }
    
    // Filtrar por estado
    if (filtroEstado !== 'todos') {
      filtrados = filtrados.filter(e => {
        const pasos = ['paso1', 'paso2', 'paso3', 'paso4', 'paso5', 'paso6', 'paso7', 'paso8', 'paso9'];
        const completados = pasos.filter(p => e[p] === 'completado').length;
        
        if (filtroEstado === 'completado') return completados === 9;
        if (filtroEstado === 'en_proceso') return completados > 0 && completados < 9;
        if (filtroEstado === 'sin_avance') return completados === 0;
        return true;
      });
      console.log('[Filtros] Por estado:', filtrados.length);
    }
    
    setFilteredEmpleados(filtrados);
    setPaginaActual(1); // Resetear página al filtrar
    
  }, [empleados, filtroArea, filtroEstado]);
  
  // Paginación
  const indexOfLastItem = paginaActual * itemsPorPagina;
  const indexOfFirstItem = indexOfLastItem - itemsPorPagina;
  const currentItems = filteredEmpleados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmpleados.length / itemsPorPagina);
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando datos de onboarding...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="alert alert-danger m-4">
        <h5>Error</h5>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={cargarDatos}>Reintentar</button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🎯 Seguimiento de Onboarding</h2>
        <button 
          className="btn btn-outline-primary btn-sm" 
          onClick={cargarDatos}
          title="Actualizar datos"
        >
          🔄 Actualizar
        </button>
      </div>
      
      <p className="text-muted mb-4">
        Visualiza el progreso de los nuevos empleados en su proceso de onboarding.
        Cada círculo representa un paso del 1 al 9.
      </p>
      
      <FiltrosOnboarding 
        areas={areas}
        filtroArea={filtroArea}
        setFiltroArea={setFiltroArea}
        filtroEstado={filtroEstado}
        setFiltroEstado={setFiltroEstado}
        empleadosCount={filteredEmpleados.length}
      />
      
      <div className="card">
        <div className="card-header bg-white">
          <h5>📋 Lista de Empleados en Onboarding</h5>
        </div>
        <div className="card-body">
          <TablaOnboarding 
            currentItems={currentItems}
            indexOfFirstItem={indexOfFirstItem}
          />
          
          {/* Paginación */}
          {totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPaginaActual(paginaActual - 1)}>
                    Anterior
                  </button>
                </li>
                
                {[...Array(Math.min(totalPages, 10))].map((_, i) => (
                  <li key={i} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setPaginaActual(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                
                {totalPages > 10 && (
                  <li className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                )}
                
                <li className={`page-item ${paginaActual === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPaginaActual(paginaActual + 1)}>
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
      
      {/* Resumen rápido */}
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card text-center bg-primary text-white">
            <div className="card-body">
              <h3>{empleados.length}</h3>
              <p>Total Empleados</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center bg-success text-white">
            <div className="card-body">
              <h3>{empleados.filter(e => {
                const pasos = ['paso1', 'paso2', 'paso3', 'paso4', 'paso5', 'paso6', 'paso7', 'paso8', 'paso9'];
                return pasos.filter(p => e[p] === 'completado').length === 9;
              }).length}</h3>
              <p>Completaron Onboarding</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center bg-warning text-dark">
            <div className="card-body">
              <h3>{empleados.filter(e => {
                const pasos = ['paso1', 'paso2', 'paso3', 'paso4', 'paso5', 'paso6', 'paso7', 'paso8', 'paso9'];
                const completados = pasos.filter(p => e[p] === 'completado').length;
                return completados > 0 && completados < 9;
              }).length}</h3>
              <p>En Proceso</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center bg-secondary text-white">
            <div className="card-body">
              <h3>{empleados.filter(e => {
                const pasos = ['paso1', 'paso2', 'paso3', 'paso4', 'paso5', 'paso6', 'paso7', 'paso8', 'paso9'];
                return pasos.filter(p => e[p] === 'completado').length === 0;
              }).length}</h3>
              <p>Sin Avance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}