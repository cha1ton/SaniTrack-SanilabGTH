// app/onboarding/page.js

"use client";

import { useEffect, useState } from "react";
import { getOnboarding } from "../../services/onboardingService";
import Timeline from "../../components/Timeline";

export default function OnboardingPage() {
  const [data, setData] = useState([]);

  async function loadData() {
    const res = await getOnboarding();
    const mapped = res.map((item) => ({
      id: item.id,
      nombre: item["Nombre y Apellidos"],
      celular: item["Número de celular"],
      dni: item["DNI (Documento de Identificación)"],
      carrera: item["Carrera"],
      area: item["Área a la que ingresaras(mencionada en la entrevista) "],
      estado: item["Onboarding Estado"] || "Inicio",
      fecha: item["Fecha que se envió"],
    }));

    const sorted = mapped.sort((a, b) => {
      const fechaA = new Date(a.fecha || 0);
      const fechaB = new Date(b.fecha || 0);
      return fechaB - fechaA;
    });

    setData(sorted.slice(0, 20));
  }

  useEffect(() => {
    loadData();
  }, []);

  const getEstadoBadge = (estado) => {
    const badges = {
      "Inicio": "secondary",
      "Creación de correo Sanilab": "info",
      "Carta de Compromiso": "primary",
      "Presentación con jefe de área": "warning",
      "Leer manuales": "info",
      "Evaluación Final": "danger",
      "Finalizado": "success"
    };
    return badges[estado] || "secondary";
  };

  return (
    <div>
      <h2>📌 Onboarding</h2>
      <p className="text-muted mb-4">
        Se muestra la lista de los últimos 20 empleados en proceso de onboarding. 
        Ordenados por fecha de envío (más recientes primero).
      </p>

      <div className="row">
        {data.map((emp, index) => (
          <div key={index} className="col-12 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-bottom pt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{emp.nombre}</h5>
                  <span className={`badge bg-${getEstadoBadge(emp.estado)} px-3 py-2`}>
                    {emp.estado}
                  </span>
                </div>
              </div>
              
              <div className="card-body">
                {/* Información en línea */}
                <div className="mb-4">
                  <span className="me-3">📞 Celular: {emp.celular || "No especificado"}</span>
                  <span className="me-3">🎫 DNI: {emp.dni || "No especificado"}</span>
                  <span className="me-3">🎓 Carrera: {emp.carrera || "No especificado"}</span>
                  <span>🏢 Área: {emp.area || "No especificado"}</span>
                </div>

                <Timeline employee={emp} reload={loadData} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="alert alert-warning text-center">
          No hay empleados en proceso de onboarding.
        </div>
      )}
    </div>
  );
}