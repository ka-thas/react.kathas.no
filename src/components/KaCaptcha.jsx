import React, { useState } from "react";
import { captchaImages } from "../assets/captchaImages";

const all_images = Object.values(captchaImages);

const placeholders = [
  { id: 1, src: captchaImages.squid_game, verified: true },
  { id: 2, src: captchaImages.kyoto_gold },
  { id: 3, src: captchaImages.seoul },
  { id: 4, src: captchaImages.kyoto_red },
  { id: 5, src: captchaImages.leiden },
  { id: 0, src: captchaImages.escape },
  { id: 6, src: captchaImages.itaewon },
  { id: 7, src: captchaImages.conbini },
  { id: 8, src: captchaImages.bosnia },
];

function KaCaptcha() {
  const [selected, setSelected] = useState(new Set());
  const [verified, setVerified] = useState(false);

  const toggle = (id) => {
    if (verified) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleVerify = () => setVerified(true);
  const handleReset = () => {
    setSelected(new Set());
    setVerified(false);
  };

  return (
    <div className="w-[300px] border border-[rgba(255,255,255,0.15)] rounded-[6px] overflow-hidden bg-[rgba(20,38,28,0.6)] shadow-[0_4px_24px_rgba(0,40,0,0.4)] text-[0.9rem] select-none">
      <div className="flex flex-col gap-[2px] px-4 py-3 bg-[rgba(0,255,128,0.08)] border-b border-[rgba(255,255,255,0.1)]">
        <span className="text-[0.78rem] uppercase tracking-[0.08em] text-white/50">
          Select all images with
        </span>
        <span className="text-[1.05rem] font-bold text-white">Ka</span>
      </div>

      <div className="grid grid-cols-3 gap-[2px] bg-black/30 p-[2px]">
        {placeholders.map(({ id, src }) => {
          const isSelected = selected.has(id);
          return (
            <button
              key={id}
              className={`relative aspect-square bg-[rgba(30,50,38,0.8)] border-none p-0 cursor-pointer overflow-hidden transition-[filter] duration-150 hover:[filter:brightness(1.15)]${isSelected ? " outline outline-[3px] outline-[#00ff80] [outline-offset:-3px]" : ""}`}
              onClick={() => toggle(id)}
              aria-pressed={isSelected}
            >
              {src ? (
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[linear-gradient(135deg,rgba(0,255,128,0.05),rgba(239,255,120,0.05))]" />
              )}
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,255,128,0.25)]">
                  <svg
                    className="w-7 h-7 text-[#00ff80] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-3 px-3 py-[0.6rem] border-t border-[rgba(255,255,255,0.08)]">
        {verified ? (
          <>
            <span className="flex items-center gap-[0.4rem] text-[#00ff80] font-semibold text-[0.9rem]">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Verified
            </span>
            <button
              className="py-[0.35rem] px-3 rounded-[5px] border border-[rgba(255,255,255,0.15)] bg-transparent text-white/55 text-[0.85rem] cursor-pointer transition-colors duration-150 hover:bg-[rgba(255,255,255,0.06)]"
              onClick={handleReset}
            >
              Try again
            </button>
          </>
        ) : (
          <button
            className="py-[0.35rem] px-4 rounded-[5px] bg-[rgba(0,255,128,0.18)] text-[#00ff80] font-semibold text-[0.9rem] cursor-pointer border border-[rgba(0,255,128,0.35)] transition-colors duration-150 enabled:hover:bg-[rgba(0,255,128,0.28)] disabled:opacity-35 disabled:cursor-default"
            onClick={handleVerify}
            disabled={selected.size === 0}
          >
            Verify
          </button>
        )}
      </div>
    </div>
  );
}

export default KaCaptcha;
