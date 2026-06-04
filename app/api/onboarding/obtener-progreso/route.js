// app/api/onboarding/obtener-progreso/route.js

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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const dni = searchParams.get('dni');
    const nombre = searchParams.get('nombre') || '';
    
    console.log('[Obtener] Buscando progreso para DNI:', dni);
    
    const res = await fetch(`${API_URL}?sheet=${SHEET_PROGRESO}`);
    const data = await res.json();
    
    let usuario = data.find(item => item.dni === dni);
    
    // ✅ Si no existe, CREAR la fila automáticamente
    if (!usuario) {
      console.log('[Obtener] DNI no encontrado, creando nueva fila...');
      
      const nuevoRegistro = {
        dni: dni,
        nombre: nombre,
        paso1: 'pendiente',
        paso2: 'pendiente',
        paso3: 'pendiente',
        paso4: 'pendiente',
        paso5: 'pendiente',
        paso6: 'pendiente',
        paso7: 'pendiente',
        paso8: 'pendiente',
        paso9: 'pendiente',
        ultima_actualizacion: new Date().toLocaleString('es-PE')
      };
      
      await fetch(`${API_URL}?sheet=${SHEET_PROGRESO}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: nuevoRegistro })
      });
      
      console.log('[Obtener] Fila creada para DNI:', dni);
      
      // Devolver progreso vacío
      return new Response(
        JSON.stringify({ 
          dni, 
          nombre, 
          progreso: {
            paso1: 'pendiente', paso2: 'pendiente', paso3: 'pendiente',
            paso4: 'pendiente', paso5: 'pendiente', paso6: 'pendiente',
            paso7: 'pendiente', paso8: 'pendiente', paso9: 'pendiente'
          }
        }),
        { status: 200, headers: corsHeaders }
      );
    }
    
    // Extraer solo los pasos
    const progreso = {
      paso1: usuario.paso1 || 'pendiente',
      paso2: usuario.paso2 || 'pendiente',
      paso3: usuario.paso3 || 'pendiente',
      paso4: usuario.paso4 || 'pendiente',
      paso5: usuario.paso5 || 'pendiente',
      paso6: usuario.paso6 || 'pendiente',
      paso7: usuario.paso7 || 'pendiente',
      paso8: usuario.paso8 || 'pendiente',
      paso9: usuario.paso9 || 'pendiente',
    };
    
    console.log('[Obtener] Progreso encontrado:', progreso);
    
    return new Response(
      JSON.stringify({ dni, nombre: usuario.nombre, progreso }),
      { status: 200, headers: corsHeaders }
    );
    
  } catch (error) {
    console.error('[Obtener] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}