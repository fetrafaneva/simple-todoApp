type Props = {
  total: number;
  urgentCount: number;
  mediumCount: number;
  completedCount: number;
};

export default function StatsGrid({
  total,
  urgentCount,
  mediumCount,
  completedCount,
}: Props) {
  const stats = [
    { label: "Total", value: total, accent: "#0D9488" },
    { label: "Urgentes", value: urgentCount, accent: "#EF4444" },
    { label: "Moyennes", value: mediumCount, accent: "#F59E0B" },
    { label: "Terminées", value: completedCount, accent: "#10B981" },
  ];

  return (
    <div
      className="stats-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 10,
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            background: "#fff",
            border: "1.5px solid #E4FAF8",
            borderRadius: 14,
            padding: "12px 8px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            className="stat-value"
            style={{
              color: s.accent,
              fontWeight: 800,
              fontSize: "1.5rem",
              lineHeight: 1,
            }}
          >
            {s.value}
          </span>
          <span
            style={{ color: "#5EAFA8", fontSize: "0.7rem", fontWeight: 600 }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
