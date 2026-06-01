import { useRef, useEffect, useState } from "react";

export default function Marquee({ text, speed = 60, gap = "4rem", className = "" }) {
    const containerRef = useRef(null);
    const firstCopyRef = useRef(null);
    const [copies, setCopies] = useState(4);
    const [singleWidth, setSingleWidth] = useState(0);
    const [duration, setDuration] = useState("10s");

    useEffect(() => {
        if (!containerRef.current || !firstCopyRef.current) return;

        const update = () => {
            const containerW = containerRef.current.offsetWidth;
            const itemW = firstCopyRef.current.offsetWidth;
            if (!itemW) return;
            const needed = Math.ceil((containerW * 2) / itemW) + 1;
            setCopies(Math.max(needed, 2));
            setSingleWidth(itemW);
            setDuration(`${itemW / speed}s`);
        };

        update();
        const ro = new ResizeObserver(update);
        ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [text, speed]);

    return (
        <div ref={containerRef} className={`overflow-hidden w-full ${className}`}>
            <div
                className="flex"
                style={{
                    animation: `marquee-scroll ${duration} linear infinite`,
                    "--marquee-offset": `-${singleWidth}px`,
                }}
            >
                {Array.from({ length: copies }).map((_, i) => (
                    <span
                        key={i}
                        ref={i === 0 ? firstCopyRef : undefined}
                        className="whitespace-nowrap shrink-0"
                        style={{ paddingRight: gap }}
                    >
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
}
