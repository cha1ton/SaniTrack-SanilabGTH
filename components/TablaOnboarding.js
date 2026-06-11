// components/TablaOnboarding.js

"use client";

import OnboardingTimeline from "./OnboardingTimeline";

export default function TablaOnboarding({ currentItems, indexOfFirstItem }) {
  console.log('[Tabla] Renderizando', currentItems.length, 'empleados');
  
  return (
    <div className="row g-3">
      {currentItems.length === 0 ? (
        <div className="col-12">
          <div className="alert alert-secondary text-center py-5">
            No hay empleados en proceso de onboarding
          </div>
        </div>
      ) : (
        currentItems.map((empleado, idx) => {
          const pasos = ['paso1', 'paso2', 'paso3', 'paso4', 'paso5', 'paso6', 'paso7', 'paso8', 'paso9'];
          const completados = pasos.filter(p => empleado[p] === 'completado').length;
          
          return (
            <div key={empleado.id || empleado.dni} className="col-12">
              <div className="card shadow-sm border-0">
                {/* Header compacto como tenía la tabla */}
                <div className="card-header bg-white py-2 px-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                      <span className="badge bg-secondary">#{indexOfFirstItem + idx + 1}</span>
                      <span className="fw-bold">{empleado.nombre || 'N/A'}</span>
                      <span className="text-muted small">DNI: {empleado.dni}</span>
                    </div>
                    <span className="badge bg-primary">
                      {completados}/9 pasos
                    </span>
                  </div>
                </div>
                
                {/* Body compacto */}
                <div className="card-body p-3">
                  {/* Información en grid horizontal compacta como la tabla */}
                  <div className="row g-2 mb-3 small">
                    <div className="col-md-3 col-6">
                      <span className="text-muted">🎓 Carrera:</span>
                      <div className="fw-semibold">{empleado.carrera || 'N/A'}</div>
                    </div>
                    <div className="col-md-2 col-6">
                      <span className="text-muted">🏢 Área:</span>
                      <div className="fw-semibold">{empleado.area || 'No asignada'}</div>
                    </div>
                    <div className="col-md-2 col-6">
                      <span className="text-muted">📞 Celular:</span>
                      <div className="fw-semibold">{empleado.celular || 'N/A'}</div>
                    </div>
                    <div className="col-md-3 col-6">
                      <span className="text-muted">🕒 Última actualización:</span>
                      <div className="fw-semibold">{empleado.ultima_actualizacion || 'N/A'}</div>
                    </div>
                  </div>
                  
                  {/* Timeline ocupa todo el ancho */}
                  <OnboardingTimeline progreso={empleado} />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww