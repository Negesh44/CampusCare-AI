import {
  FileText,
  Clock3,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

function DashboardCards({
  total,
  pending,
  progress,
  resolved,
}) {
  const cards = [
    {
      title: "Service Requests",
      value: total,
      color: "#2563eb",
      icon: <FileText size={28} />,
      bg: "#eff6ff",
    },
    {
      title: "Awaiting Review",
      value: pending,
      color: "#f59e0b",
      icon: <Clock3 size={28} />,
      bg: "#fffbeb",
    },
    {
      title: "In Progress",
      value: progress,
      color: "#0ea5e9",
      icon: <LoaderCircle size={28} />,
      bg: "#f0f9ff",
    },
    {
      title: "Resolved Requests",
      value: resolved,
      color: "#22c55e",
      icon: <CheckCircle2 size={28} />,
      bg: "#f0fdf4",
    },
  ];

  return (
    <div className="cards-grid">
      {cards.map((card, index) => (
        <div
          key={index}
          className="card"
          style={{
            borderTop: `4px solid ${card.color}`,
          }}
        >
          <div
            className="card-icon"
            style={{
              background: card.bg,
              color: card.color,
            }}
          >
            {card.icon}
          </div>

          <p className="card-title">
            {card.title}
          </p>

          <h2 className="card-value">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;