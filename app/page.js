// app/page.js

import { ClipboardList, Users, BarChart3, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero / Encabezado */}
      <div className="hero mb-4">
        <div className="d-flex align-items-center gap-3">
          <Sparkles className="feature-icon" />
          <div>
            <h1 className="display-5 fw-bold">SaniTrack</h1>
            <p className="lead mb-0">
              Plataforma de gestión y seguimiento del talento humano
            </p>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-primary">
                📋 Sobre la plataforma
              </h5>

              <p className="card-text">
                SaniTrack centraliza la información relacionada con los
                procesos de onboarding y gestión de postulantes, facilitando el
                seguimiento, la organización y el acceso a datos clave del área
                de Talento Humano.
              </p>

              <hr />

              <h5 className="card-title text-primary">🎯 Objetivo</h5>

              <p className="card-text">
                Optimizar la gestión del talento mediante herramientas que
                permitan supervisar el avance de nuevos integrantes, consultar
                información de postulantes y apoyar la toma de decisiones con
                datos organizados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Características */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <ClipboardList className="feature-icon text-primary" />

              <h5 className="card-title">Onboarding</h5>

              <p className="card-text text-muted">
                Seguimiento del progreso e integración de nuevos miembros.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <Users className="feature-icon text-primary" />

              <h5 className="card-title">Postulantes</h5>

              <p className="card-text text-muted">
                Consulta y administración de postulantes actuales e históricos.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <BarChart3 className="feature-icon text-primary" />

              <h5 className="card-title">Reportes y Análisis</h5>

              <p className="card-text text-muted">
                Visualización de métricas e indicadores para apoyar decisiones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Beneficios */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-primary">
                ✨ Beneficios principales
              </h5>

              <ul className="benefit-list mt-3 mb-0">
                <li>
                  <Sparkles size={18} />
                  <span>Centralización de información en una sola plataforma.</span>
                </li>
                <li>
                  <Sparkles size={18} />
                  <span>Seguimiento estructurado del proceso de onboarding.</span>
                </li>
                <li>
                  <Sparkles size={18} />
                  <span>Acceso rápido a información de postulantes.</span>
                </li>
                <li>
                  <Sparkles size={18} />
                  <span>Mejor organización y trazabilidad de datos.</span>
                </li>
                <li>
                  <Sparkles size={18} />
                  <span>Soporte para el análisis y la toma de decisiones.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}