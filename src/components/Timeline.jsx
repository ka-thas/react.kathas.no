function toDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Timeline({ start, end, milestones, className }) {
  const startTime = toDay(start.date);
  const endTime = toDay(end.date);
  const today = toDay(new Date());
  const progress = Math.min(
    100,
    Math.max(0, ((today - startTime) / (endTime - startTime)) * 100)
  );

  const items = [start, ...milestones, end].sort(
    (a, b) => toDay(a.date) - toDay(b.date)
  );

  return (
    <div
      className={
        className ??
        "bg-[rgba(150,200,150,0.12)] border border-white/7 rounded-xl py-5 px-5"
      }
    >
      <div className="flex justify-between text-[0.85rem] text-black/70 mb-2">
        <span>{formatDate(start.date)}</span>
        <span>{Math.round(progress)}%</span>
        <span>{formatDate(end.date)}</span>
      </div>
      <div className="h-2 rounded-full bg-black/10 overflow-hidden mb-6">
        <div
          className="h-full bg-accent-green"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ol className="border-l-2 border-black/15 ml-1.5">
        {items.map(({ date, label }) => {
          const done = toDay(date) <= today;
          return (
            <li key={`${date}-${label}`} className="relative pl-5 pb-4 last:pb-0">
              <span
                className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 border-accent-green ${
                  done ? "bg-accent-green" : "bg-white"
                }`}
              />
              <div className="text-[0.8rem] text-black/60 leading-none mb-1">
                {formatDate(date)}
              </div>
              <div className={done ? "text-black/70" : "font-bold text-black"}>
                {label}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Timeline;
