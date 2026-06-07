// app/api/test/guardar-respuesta/route.js

const SHEET_RESPUESTAS = encodeURIComponent("onboarding_respuestas_dni");
const API_URL = process.env.NEXT_PUBLIC_SHEETDB_ONBOARDING;

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.sanilabperu.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    const dataToSend = {
      dni: body.dni,
      nombre: body.nombre,
      carrera: body.carrera,
      universidad: body.universidad,
      celular: body.celular,
      confirmacion_dni: body.confirmacion,
      fecha_respuesta: new Date().toLocaleDateString("es-PE"),
      timestamp: new Date().toISOString()
    };
    
    await fetch(`${API_URL}?sheet=${SHEET_RESPUESTAS}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: dataToSend })
    });
    
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: corsHeaders }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al guardar" }),
      { status: 500, headers: corsHeaders }
    );
  }
}