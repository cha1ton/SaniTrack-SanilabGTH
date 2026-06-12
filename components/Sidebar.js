// components/Sidebar.js

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
      {/* Logo centrado */}
      <div className="text-center mb-3">
        <Image
          src="/logo-sanilab.webp"
          alt="Sanilab"
          width={218}
          height={65}
          className="img-fluid"
          priority
        />
      </div>
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