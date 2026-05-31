export default function Stat({ n, label, sub }) {
  return (
    <div>
      <div className="text-3xl font-black tracking-tight">{n}</div>
      <div className="text-xs font-semibold tracking-wider mt-1">{label}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
        {sub}
      </div>
    </div>
  );
}
