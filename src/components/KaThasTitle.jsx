import kaThasTitle from "../assets/images/ka-thas-title.webp";

function KaThasTitle({ className = "" }) {
  return (
    <img
      src={kaThasTitle}
      alt="Ka Thas"
      className={`w-full max-w-md mx-auto object-contain md:object-cover aspect-[1773/479] dark:invert dark:hue-rotate-180 ${className}`}
      fetchPriority="high"
      loading="eager"
    />
  );
}

export default KaThasTitle;
