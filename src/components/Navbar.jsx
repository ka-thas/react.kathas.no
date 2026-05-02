import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/cv", label: "CV" },
    { to: "/blog", label: "Blog", soon: true },
    { to: "/social", label: "Socials" },
];

const soonBadge = (
    <span className="text-[0.62rem] font-bold tracking-[0.04em] uppercase bg-[rgba(239,255,120,0.18)] text-[#efff78] border border-[rgba(239,255,120,0.35)] rounded py-px px-[5px] leading-[1.4]">
        soon
    </span>
);

function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const isActive = (to) => {
        if (to === "/") return location.pathname === "/";
        return location.pathname.toLowerCase().startsWith(to.toLowerCase());
    };

    const desktopLinkCls = (active) =>
        `relative inline-flex items-center gap-[0.4rem] py-[0.35rem] px-3 rounded-lg text-[0.95rem] font-medium no-underline transition-colors duration-150 ${
            active
                ? "text-[#00ff80] bg-[rgba(0,255,128,0.1)] hover:bg-[rgba(0,255,128,0.15)]"
                : "text-white/72 hover:text-white hover:bg-white/7"
        }`;

    const mobileLinkCls = (active) =>
        `flex items-center gap-2 py-[0.65rem] px-2 text-base font-medium no-underline rounded-lg transition-colors duration-150 ${
            active
                ? "text-[#00ff80] bg-[rgba(0,255,128,0.1)] hover:bg-[rgba(0,255,128,0.15)]"
                : "text-white/72 hover:text-white hover:bg-white/6"
        }`;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(20,38,28,0.82)] backdrop-blur-[14px] border-b border-white/7">
            <div className="flex items-center justify-between h-14 max-w-[1100px] mx-auto px-5">
                <Link to="/" className="text-xl no-underline" onClick={() => setOpen(false)}>
                    <span className="gradient-text font-bold">Ka Thas</span>
                </Link>

                <nav className="flex items-center gap-1 max-[600px]:hidden">
                    {navLinks.map(({ to, label, soon }) =>
                        soon ? (
                            <span key={to} className="relative inline-flex items-center gap-[0.4rem] py-[0.35rem] px-3 rounded-lg text-[0.95rem] font-medium text-white/72 opacity-45 cursor-default pointer-events-none">
                                {label}
                                {soonBadge}
                            </span>
                        ) : (
                            <Link key={to} to={to} className={desktopLinkCls(isActive(to))}>
                                {label}
                            </Link>
                        )
                    )}
                </nav>

                <button
                    className="hidden max-[600px]:flex flex-col justify-center gap-[5px] w-9 h-9 p-[6px] bg-transparent border-none cursor-pointer rounded-lg transition-colors duration-150 hover:bg-white/7"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-full h-[2px] bg-white rounded-sm transition-[transform,opacity] duration-[250ms] ease origin-center${open ? " translate-y-[7px] rotate-45" : ""}`} />
                    <span className={`block w-full h-[2px] bg-white rounded-sm transition-[transform,opacity] duration-[250ms] ease origin-center${open ? " opacity-0 scale-x-0" : ""}`} />
                    <span className={`block w-full h-[2px] bg-white rounded-sm transition-[transform,opacity] duration-[250ms] ease origin-center${open ? " -translate-y-[7px] -rotate-45" : ""}`} />
                </button>
            </div>

            <nav className={`flex flex-col overflow-hidden transition-[max-height,padding] duration-300 ease border-t px-5 ${open ? "max-h-[400px] pt-2 pb-3 border-white/7" : "max-h-0 border-transparent"}`}>
                {navLinks.map(({ to, label, soon }) =>
                    soon ? (
                        <span key={to} className="flex items-center gap-2 py-[0.65rem] px-2 text-base font-medium text-white/72 rounded-lg opacity-45 cursor-default pointer-events-none">
                            {label}
                            {soonBadge}
                        </span>
                    ) : (
                        <Link key={to} to={to} className={mobileLinkCls(isActive(to))} onClick={() => setOpen(false)}>
                            {label}
                        </Link>
                    )
                )}
            </nav>
        </header>
    );
}

export default Navbar;
