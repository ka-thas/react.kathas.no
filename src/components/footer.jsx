import React, { useRef } from "react";

function Footer() {
    const pRef = useRef(null);

    const handleSpin = () => {
        if (pRef.current) {
            pRef.current.classList.add("spin");
            setTimeout(() => {
                pRef.current.classList.remove("spin");
            }, 1000); // Duration matches the animation
        }
    };

    return (
        <>
            <p
                className="text-center p-2 mt-2 cursor-pointer"
                ref={pRef}
                onClick={handleSpin}
                style={{ cursor: "pointer" }}
            >
                🌱
            </p>
        </>
    );
}

export default Footer;