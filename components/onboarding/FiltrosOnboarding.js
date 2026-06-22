// components/onboarding/FiltrosOnboarding.js

"use client";

export default function FiltrosOnboarding({ 
  areas, 
  filtroArea, 
  setFiltroArea, 
  filtroEstado, 
  setFiltroEstado,
  empleadosCount 
}) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-md-4">
        <label className="form-label fw-bold">Filtrar por Área</label>
        <select 
          className="form-select" 
          value={filtroArea} 
          onChange={(e) => setFiltroArea(e.target.value)}
        >
          <option value="todas">Todas las áreas</option>
          {areas.map((area, idx) => (
            <option key={idx} value={area}>{area}</option>
          ))}
        </select>
      </div>
      
      <div className="col-md-4">
        <label className="form-label fw-bold">Filtrar por Estado</label>
        <select 
          className="form-select" 
          value={filtroEstado} 
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="completado">Completados (9/9)</option>
          <option value="en_proceso">En proceso (1-8/9)</option>
          <option value="sin_avance">Sin avance (0/9)</option>
        </select>
      </div>
      
      <div className="col-md-4">
        <label className="form-label fw-bold">Estadística</label>
        <div className="alert alert-info mb-0 py-2">
          📊 Total empleados: <strong>{empleadosCount}</strong>
        </div>
      </div>
    </div>
  );
}