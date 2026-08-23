import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/cv", label: "CV" },
    { to: "/blog", label: "Blog", isNew: true },
    { to: "/social", label: "Socials" },
];

const newBadge = (
    <span className="text-[0.62rem] font-bold tracking-[0.04em] uppercase bg-accent-green/18 text-accent-green border border-accent-green/35 rounded py-px px-[5px] leading-[1.4]">
        new
    </span>
);

const soonBadge = (
    <span className="text-[0.62rem] font-bold tracking-[0.04em] uppercase bg-accent-yellow/18 text-accent-yellow border border-accent-yellow/35 rounded py-px px-[5px] leading-[1.4]">
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
                ? "text-accent-green bg-accent-green/10 hover:bg-accent-green/15"
                : "text-black/70 hover:text-black hover:bg-black/6"
        }`;

    const mobileLinkCls = (active) =>
        `flex items-center gap-2 py-[0.65rem] px-2 text-base font-medium no-underline rounded-lg transition-colors duration-150 ${
            active
                ? "text-accent-green bg-accent-green/10 hover:bg-accent-green/15"
                : "text-black/70 hover:text-black hover:bg-black/6"
        }`;

    return (
        <header>
            <div className="flex items-center justify-between h-14 max-w-[1100px] mx-auto px-5">
                <Link to="/" className="text-xl no-underline" onClick={() => setOpen(false)}>
                    <img src="/assets/icons/seedling.svg" alt="Ka Thas" className="h-8 w-8" />
                </Link>

                <nav className="flex items-center gap-1 max-[600px]:hidden">
                    {navLinks.map(({ to, label, soon, isNew }) =>
                        soon ? (
                            <span key={to} className="relative inline-flex items-center gap-[0.4rem] py-[0.35rem] px-3 rounded-lg text-[0.95rem] font-medium text-black/70 opacity-45 cursor-default pointer-events-none">
                                {label}
                                {soonBadge}
                            </span>
                        ) : (
                            <Link key={to} to={to} className={desktopLinkCls(isActive(to))}>
                                {label}
                                {isNew && newBadge}
                            </Link>
                        )
                    )}
                </nav>

                <button
                    className="hidden max-[600px]:flex flex-col justify-center gap-[5px] w-9 h-9 p-[6px] bg-transparent border-none cursor-pointer rounded-lg transition-colors duration-150 hover:bg-black/6"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-full h-[2px] bg-black rounded-sm transition-[transform,opacity] duration-[250ms] ease origin-center${open ? " translate-y-[7px] rotate-45" : ""}`} />
                    <span className={`block w-full h-[2px] bg-black rounded-sm transition-[transform,opacity] duration-[250ms] ease origin-center${open ? " opacity-0 scale-x-0" : ""}`} />
                    <span className={`block w-full h-[2px] bg-black rounded-sm transition-[transform,opacity] duration-[250ms] ease origin-center${open ? " -translate-y-[7px] -rotate-45" : ""}`} />
                </button>
            </div>

            <nav className={`flex flex-col overflow-hidden transition-[max-height,padding] duration-300 ease border-t px-5 ${open ? "max-h-[400px] pt-2 pb-3 border-black/8" : "max-h-0 border-transparent"}`}>
                {navLinks.map(({ to, label, soon, isNew }) =>
                    soon ? (
                        <span key={to} className="flex items-center gap-2 py-[0.65rem] px-2 text-base font-medium text-black/70 rounded-lg opacity-45 cursor-default pointer-events-none">
                            {label}
                            {soonBadge}
                        </span>
                    ) : (
                        <Link key={to} to={to} className={mobileLinkCls(isActive(to))} onClick={() => setOpen(false)}>
                            {label}
                            {isNew && newBadge}
                        </Link>
                    )
                )}
            </nav>
        </header>
    );
}

export default Navbar;
