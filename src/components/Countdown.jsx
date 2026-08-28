function daysBetween(date) {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / 86400000);
}

function Countdown({ date, label, className }) {
  const diff = daysBetween(date);
  const days = Math.abs(diff);
  const unit = days === 1 ? "day" : "days";

  return (
    <div
      className={
        className ??
        "bg-[rgba(150,200,150,0.12)] border border-white/7 rounded-xl py-4 px-5 text-center"
      }
    >
      {diff === 0 ? (
        <div className="text-[1.3rem] font-bold text-black leading-none">
          Today — {label}
        </div>
      ) : (
        <>
          <div className="text-[1.8rem] font-bold text-accent-green leading-none">{days}</div>
          <div className="text-[0.85rem] text-black/70 mt-1">
            {unit} {diff > 0 ? "until" : "since"} {label}
          </div>
        </>
      )}
    </div>
  );
}

export default Countdown;
