import { CheckSquare } from "lucide-react";

type Props = { completedCount: number; total: number; progress: number };

export default function Header({ completedCount, total, progress }: Props) {
  return (
    <>
      <div className="app-header flex items-center gap-3">
        <div
          style={{
            background: "#0D9488",
            width: 44,
            height: 44,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <CheckSquare style={{ width: 22, height: 22, color: "#fff" }} />
        </div>
        <div style={{ flex: 1 }}>
          <h1
            style={{
              color: "#134E4A",
              fontWeight: 800,
              fontSize: "1.4rem",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Mes Tâches
          </h1>
          <p
            style={{
              color: "#5EAFA8",
              fontSize: "0.8rem",
              fontWeight: 500,
              margin: 0,
            }}
          >
            {completedCount} sur {total} terminées
          </p>
        </div>
      </div>

      {total > 0 && (
        <div>
          <div
            style={{
              background: "#CCFBF1",
              borderRadius: 999,
              height: 7,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "#0D9488",
                width: `${progress}%`,
                height: "100%",
                borderRadius: 999,
                transition: "width 300ms ease",
              }}
            />
          </div>
          <p
            style={{
              color: "#5EAFA8",
              fontSize: "0.72rem",
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            {progress}% accompli
          </p>
        </div>
      )}
    </>
  );
}
