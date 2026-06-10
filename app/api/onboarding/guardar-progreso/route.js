// app/api/onboarding/guardar-progreso/route.js

const SHEET_PROGRESO = encodeURIComponent("onboarding_progreso");
const API_URL = process.env.NEXT_PUBLIC_SHEETDB_ONBOARDING;

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.sanilabperu.com',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('[Guardar] Recibido:', body);
    
    const { dni, nombre, carrera, universidad, celular, area, fecha_inicio, paso1, paso2, paso3, paso4, paso5, paso6, paso7, paso8, paso9} = body;
    
    // Primero buscar si ya existe este DNI
    const searchRes = await fetch(`${API_URL}?sheet=${SHEET_PROGRESO}`);
    const data = await searchRes.json();
    
    const existe = data.find(item => item.dni === dni);
    
    const ultima_actualizacion = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    
    let resultado;
    if (existe) {
      // Actualizar fila existente (usando el ID de SheetDB)
      const id = existe.id;
      resultado = await fetch(`${API_URL}/id/${id}?sheet=${SHEET_PROGRESO}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            paso1, paso2, paso3, paso4, paso5, paso6, paso7, paso8, paso9,
            ultima_actualizacion
          }
        })
      });
      console.log('[Guardar] Actualizando fila existente ID:', id);
    } else {
      // Crear nueva fila
      resultado = await fetch(`${API_URL}?sheet=${SHEET_PROGRESO}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { dni, nombre, carrera, universidad, celular, area, fecha_inicio, paso1, paso2, paso3, paso4, paso5, paso6, paso7, paso8, paso9, ultima_actualizacion }
        })
      });
      console.log('[Guardar] Creando nueva fila');
    }
    
    const responseData = await resultado.json();
    console.log('[Guardar] Respuesta SheetDB:', responseData);
    
    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      { status: 200, headers: corsHeaders }
    );
    
  } catch (error) {
    console.error('[Guardar] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}