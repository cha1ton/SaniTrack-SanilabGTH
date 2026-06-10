// services/onboardingService.js

const API_ONBOARDING = process.env.NEXT_PUBLIC_SHEETDB_ONBOARDING;
const SHEET_PROGRESO = encodeURIComponent("onboarding_progreso");


// Obtener todos los registros de onboarding_progreso
export async function getOnboardingProgreso() {
  console.log('[Service] Obteniendo datos de onboarding_progreso...');
  
  const res = await fetch(`${API_ONBOARDING}?sheet=${SHEET_PROGRESO}`, {
    cache: "no-store",
  });
  
  const data = await res.json();
  console.log(`[Service] Obtenidos ${Array.isArray(data) ? data.length : 0} registros`);
  
  return Array.isArray(data) ? data : [];
}

// Actualizar un paso específico (solo si se necesita en el futuro)
export async function updatePaso(id, paso, valor) {
  console.log(`[Service] Actualizando paso ${paso} para ID: ${id}`);
  
  const res = await fetch(`${API_ONBOARDING}/id/${id}?sheet=${SHEET_PROGRESO}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: { [paso]: valor }
    })
  });
  
  const data = await res.json();
  console.log('[Service] Respuesta actualización:', data);
  
  return data;
}