// components/TablaOnboarding.js

"use client";

import OnboardingTimeline from "./OnboardingTimeline";

export default function TablaOnboarding({ currentItems, indexOfFirstItem }) {
  console.log('[Tabla] Renderizando', currentItems.length, 'empleados');
  
  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>DNI</th>
            <th>Nombre Completo</th>
            <th>Carrera</th>
            <th>Área</th>
            <th>Celular</th>
            <th>Progreso</th>
            <th>Última Actualización</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-muted py-5">
                No hay empleados en proceso de onboarding
              </td>
            </tr>
          ) : (
            currentItems.map((empleado, idx) => {
              // Calcular progreso
              const pasos = ['paso1', 'paso2', 'paso3', 'paso4', 'paso5', 'paso6', 'paso7', 'paso8', 'paso9'];
              const completados = pasos.filter(p => empleado[p] === 'completado').length;
              
              console.log(`[Tabla] Empleado ${empleado.nombre}: ${completados}/9 pasos`);
              
              return (
                <tr key={empleado.id || empleado.dni}>
                  <td>{indexOfFirstItem + idx + 1}</td>
                  <td>{empleado.dni}</td>
                  <td className="fw-bold">{empleado.nombre || 'N/A'}</td>
                  <td>{empleado.carrera || 'N/A'}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {empleado.area || 'No asignada'}
                    </span>
                  </td>
                  <td>{empleado.celular || 'N/A'}</td>
                  <td style={{ minWidth: '280px' }}>
                    <OnboardingTimeline progreso={empleado} />
                  </td>
                  <td style={{ fontSize: '12px' }}>
                    {empleado.ultima_actualizacion || 'N/A'}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}