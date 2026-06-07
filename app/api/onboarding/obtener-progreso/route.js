// app/api/onboarding/obtener-progreso/route.js

const SHEET_PROGRESO = encodeURIComponent("onboarding_progreso");
const SHEET_ACUERDO = encodeURIComponent("Base de datos/Acuerdo de compromiso");

const API_URL = process.env.NEXT_PUBLIC_SHEETDB_ONBOARDING;

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://www.sanilabperu.com",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const dni = searchParams.get("dni");

    if (!dni) {
      return new Response(JSON.stringify({ error: "DNI requerido" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    console.log("[Obtener] Buscando DNI:", dni);

    // 1. BUSCAR EN ONBOARDING_PROGRESO

    const progresoRes = await fetch(`${API_URL}?sheet=${SHEET_PROGRESO}`);

    const progresoData = await progresoRes.json();

    let usuario = progresoData.find((item) => item.dni === dni);

    // 2. SI NO EXISTE -> BUSCAR EN ACUERDO

    if (!usuario) {
      console.log("[Obtener] No existe en onboarding_progreso");

      const acuerdoRes = await fetch(`${API_URL}?sheet=${SHEET_ACUERDO}`);

      const acuerdoData = await acuerdoRes.json();

      const empleado = acuerdoData.find(
        (item) => item["DNI (Documento de Identificación)"] === dni,
      );

      if (!empleado) {
        console.log(
          "[Obtener] DNI no encontrado en Base de datos/Acuerdo de compromiso",
        );

        return new Response(
          JSON.stringify({
            error: "DNI no encontrado",
          }),
          {
            status: 404,
            headers: corsHeaders,
          },
        );
      }

      const nuevoRegistro = {
        dni,
        nombre: empleado["Nombre y Apellidos"] || "",
        carrera: empleado["Carrera"] || "",
        universidad: empleado["Centro de estudios"] || "",
        celular: `'${empleado["Número de celular"] || ''}`,
        paso1: "pendiente",
        paso2: "pendiente",
        paso3: "pendiente",
        paso4: "pendiente",
        paso5: "pendiente",
        paso6: "pendiente",
        paso7: "pendiente",
        paso8: "pendiente",
        paso9: "pendiente",
        ultima_actualizacion: new Date().toLocaleString("es-PE", {
          timeZone: "America/Lima",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      console.log("[Obtener] Creando fila automática:", nuevoRegistro);

      await fetch(`${API_URL}?sheet=${SHEET_PROGRESO}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: nuevoRegistro,
        }),
      });

      usuario = nuevoRegistro;
    }

    // 3. DEVOLVER PROGRESO

    const progreso = {
      paso1: usuario.paso1 || "pendiente",
      paso2: usuario.paso2 || "pendiente",
      paso3: usuario.paso3 || "pendiente",
      paso4: usuario.paso4 || "pendiente",
      paso5: usuario.paso5 || "pendiente",
      paso6: usuario.paso6 || "pendiente",
      paso7: usuario.paso7 || "pendiente",
      paso8: usuario.paso8 || "pendiente",
      paso9: usuario.paso9 || "pendiente",
    };

    console.log("[Obtener] Progreso encontrado:", progreso);

    return new Response(
      JSON.stringify({
        dni: usuario.dni,
        nombre: usuario.nombre || "",
        carrera: usuario.carrera || "",
        universidad: usuario.universidad || "",
        celular: usuario.celular || "",
        progreso,
      }),
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  } catch (error) {
    console.error("[Obtener] Error:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
}
