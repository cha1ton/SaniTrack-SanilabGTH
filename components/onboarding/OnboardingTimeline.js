// components/onboarding/OnboardingTimeline.js

"use client";

export default function OnboardingTimeline({ progreso }) {
  // Si no hay progreso, crear uno por defecto
  const pasos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  // Calcular cuántos pasos completados
  const completados = Object.values(progreso || {}).filter(v => v === 'completado').length;
  const todosCompletados = completados === 9;
  
  // Color de fondo según progreso
  const getCircleColor = (pasoNumero) => {
    if (todosCompletados) return '#ffc107'; // Dorado si todos completados
    const estado = progreso?.[`paso${pasoNumero}`];
    return estado === 'completado' ? '#198754' : '#6c757d'; // Verde o gris
  };
  
  return (
    <div className="onboarding-timeline">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        {pasos.map((paso) => (
          <div key={paso} className="text-center mb-2" style={{ flex: 1, minWidth: '60px' }}>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
              style={{
                width: 35,
                height: 35,
                backgroundColor: getCircleColor(paso),
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              {paso}
            </div>
            <small style={{ fontSize: '10px', display: 'block', marginTop: '4px' }}>
              Paso {paso}
            </small>
          </div>
        ))}
      </div>
      <div className="text-center mt-1">
        <small className={`fw-bold ${todosCompletados ? 'text-warning' : completados === 9 ? 'text-success' : 'text-muted'}`}>
          {todosCompletados ? '🎉 COMPLETADO' : `${completados}/9 pasos`}
        </small>
      </div>
    </div>
  );
}