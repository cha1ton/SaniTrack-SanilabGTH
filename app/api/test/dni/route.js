// app/api/test/dni/route.js
const SHEET = encodeURIComponent("Base de datos/Acuerdo de compromiso");
const API_URL = process.env.NEXT_PUBLIC_SHEETDB_ONBOARDING;

export async function POST(request) {
  try {
    const { dni } = await request.json();
    console.log(`[TEST] Buscando DNI: ${dni}`);
    
    const res = await fetch(`${API_URL}?sheet=${SHEET}`);
    const data = await res.json();
    
    const usuario = data.find(item => item["DNI (Documento de Identificación)"] === dni);
    
    if (!usuario) {
      console.log(`[TEST] DNI ${dni} no encontrado`);
      return Response.json({ error: "DNI no encontrado" }, { status: 404 });
    }
    
    const nombre = usuario["Nombre y Apellidos"];
    console.log(`[TEST] Nombre encontrado: ${nombre}`);
    
    return Response.json({ nombre, dni, encontrado: true });
    
  } catch (error) {
    console.error("[TEST] Error:", error);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}