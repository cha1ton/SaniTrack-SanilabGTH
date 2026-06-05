// app/api/test/dni/route.js

const SHEET = encodeURIComponent("Base de datos/Acuerdo de compromiso");
const API_URL = process.env.NEXT_PUBLIC_SHEETDB_ONBOARDING;

// Configuración CORS para todas las respuestas
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.sanilabperu.com',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Manejar OPTIONS (preflight)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Manejar POST
export async function POST(request) {
  try {
    const { dni } = await request.json();
    console.log(`[TEST] Buscando DNI: ${dni}`);
    
    const res = await fetch(`${API_URL}?sheet=${SHEET}`);
    const data = await res.json();
    
    const usuario = data.find(item => item["DNI (Documento de Identificación)"] === dni);
    
    if (!usuario) {
      return new Response(
        JSON.stringify({ error: "DNI no encontrado" }),
        { status: 404, headers: corsHeaders }
      );
    }
    
    const nombre = usuario["Nombre y Apellidos"];
    const carrera = usuario["Carrera"];
    const universidad = usuario["Centro de estudios"];
    
    return new Response(
      JSON.stringify({ nombre, dni, carrera, universidad, encontrado: true }),
      { status: 200, headers: corsHeaders }
    );
    
  } catch (error) {
    console.error("[TEST] Error:", error);
    return new Response(
      JSON.stringify({ error: "Error interno" }),
      { status: 500, headers: corsHeaders }
    );
  }
}