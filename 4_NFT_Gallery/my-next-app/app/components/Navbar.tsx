// components/Navbar.tsx
import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <nav style={{ backgroundColor: "#333", padding: "24px" }}>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <li>
          <Link
            href="/"
            style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/services"
            style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};
