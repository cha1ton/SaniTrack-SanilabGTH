// components/Sidebar.js

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/onboarding", label: "Onboarding" },
    { href: "/postulantes-antiguos", label: "Postulantes Antiguos" },
    { href: "/postulantes-actuales", label: "Postulantes Actuales (Wix)" },
  ];

  return (
    <aside
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h4>
        <Link href="/" className="text-white text-decoration-none">
          Seguimiento de postulantes - GTH
        </Link>
      </h4>
      <img src="/logo-sanilab.png" alt="Logo" className="img-fluid mb-3" />
      <hr />

      <ul className="nav flex-column">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.href}>
            <Link
              href={item.href}
              className={`nav-link text-white ${
                pathname === item.href ? "active" : ""
              }`}
            >
              {item.label}
            </Link>
            <hr />
          </li>
        ))}
      
      </ul>
    </aside>
  );
};

export default Sidebar;