// app/api/test/dni/route.js

const SHEET = encodeURIComponent("Base de datos/Acuerdo de compromiso");
const API_URL = process.env.NEXT_PUBLIC_SHEETDB_ONBOARDING;

export async function POST(request) {
  // Headers CORS para permitir peticiones desde Wix
  const headers = {
    'Access-Control-Allow-Origin': 'https://www.sanilabperu.com',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Manejar preflight request (OPTIONS)
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    const { dni } = await request.json();
    console.log(`[TEST] Buscando DNI: ${dni}`);
    
    const res = await fetch(`${API_URL}?sheet=${SHEET}`);
    const data = await res.json();
    
    const usuario = data.find(item => item["DNI (Documento de Identificación)"] === dni);
    
    if (!usuario) {
      return Response.json({ error: "DNI no encontrado" }, { status: 404, headers });
    }
    
    const nombre = usuario["Nombre y Apellidos"];
    
    return Response.json({ nombre, dni, encontrado: true }, { headers });
    
  } catch (error) {
    return Response.json({ error: "Error interno" }, { status: 500, headers });
  }
}