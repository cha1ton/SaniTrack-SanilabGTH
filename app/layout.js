// app/layout.js

import Script from "next/script";
import Sidebar from "../components/Sidebar";
import "./globals.css";

export const metadata = {
  title: "Sanilab - Seguimiento de postulantes",
  description: "Sistema de Gestión de Talento Humano",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <div className="d-flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Contenido */}
          <main className="flex-grow-1 p-4 bg-light">
            {children}
          </main>
        </div>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}