import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/cv", label: "CV", soon: true },
    { to: "/blog", label: "Blog", soon: true },
    { to: "/social", label: "Socials" },
];

function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const isActive = (to) => {
        if (to === "/") return location.pathname === "/";
        return location.pathname.toLowerCase().startsWith(to.toLowerCase());
    };

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
                    <span className="gradient-text font-bold">Ka Thas</span>
                </Link>

                <nav className="navbar-desktop">
                    {navLinks.map(({ to, label, soon }) =>
                        soon ? (
                            <span key={to} className="navbar-link navbar-link--soon">
                                {label}
                                <span className="navbar-soon-badge">soon</span>
                            </span>
                        ) : (
                            <Link
                                key={to}
                                to={to}
                                className={`navbar-link${isActive(to) ? " navbar-link--active" : ""}`}
                            >
                                {label}
                            </Link>
                        )
                    )}
                </nav>

                <button
                    className={`navbar-hamburger${open ? " is-open" : ""}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            <nav className={`navbar-mobile${open ? " is-open" : ""}`}>
                {navLinks.map(({ to, label, soon }) =>
                    soon ? (
                        <span key={to} className="navbar-mobile-link navbar-link--soon">
                            {label}
                            <span className="navbar-soon-badge">soon</span>
                        </span>
                    ) : (
                        <Link
                            key={to}
                            to={to}
                            className={`navbar-mobile-link${isActive(to) ? " navbar-link--active" : ""}`}
                            onClick={() => setOpen(false)}
                        >
                            {label}
                        </Link>
                    )
                )}
            </nav>
        </header>
    );
}

export default Navbar;
