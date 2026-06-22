const FloatingOrbs = () => (
  <div
    aria-hidden="true"
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      overflow: "hidden",
      pointerEvents: "none",
    }}
  >
    <style>{`
        @keyframes floatOrb {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(var(--tx), var(--ty)) scale(1.08); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          animation: floatOrb var(--dur) ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

    {/* Grand orbe teal — haut gauche */}
    <div
      className="orb"
      style={
        {
          width: 420,
          height: 420,
          background: "#0D9488",
          opacity: 0.12,
          top: -120,
          left: -100,
          "--dur": "8s",
          "--tx": "30px",
          "--ty": "20px",
        } as React.CSSProperties
      }
    />

    {/* Orbe orange — haut droit */}
    <div
      className="orb"
      style={
        {
          width: 260,
          height: 260,
          background: "#F97316",
          opacity: 0.1,
          top: -60,
          right: -60,
          "--dur": "6s",
          "--tx": "-20px",
          "--ty": "25px",
          animationDelay: "1.5s",
        } as React.CSSProperties
      }
    />

    {/* Orbe teal clair — milieu droite */}
    <div
      className="orb"
      style={
        {
          width: 180,
          height: 180,
          background: "#14B8A6",
          opacity: 0.13,
          top: "38%",
          right: "5%",
          "--dur": "7s",
          "--tx": "-25px",
          "--ty": "-30px",
          animationDelay: "3s",
        } as React.CSSProperties
      }
    />

    {/* Petit orbe orange — milieu gauche */}
    <div
      className="orb"
      style={
        {
          width: 120,
          height: 120,
          background: "#F97316",
          opacity: 0.08,
          top: "45%",
          left: "8%",
          "--dur": "5s",
          "--tx": "20px",
          "--ty": "-20px",
          animationDelay: "0.8s",
        } as React.CSSProperties
      }
    />

    {/* Orbe teal — bas gauche */}
    <div
      className="orb"
      style={
        {
          width: 300,
          height: 300,
          background: "#0D9488",
          opacity: 0.1,
          bottom: -80,
          left: -60,
          "--dur": "9s",
          "--tx": "25px",
          "--ty": "-20px",
          animationDelay: "2s",
        } as React.CSSProperties
      }
    />

    {/* Petit orbe teal clair — bas droit */}
    <div
      className="orb"
      style={
        {
          width: 150,
          height: 150,
          background: "#14B8A6",
          opacity: 0.1,
          bottom: "10%",
          right: "12%",
          "--dur": "6.5s",
          "--tx": "-15px",
          "--ty": "20px",
          animationDelay: "4s",
        } as React.CSSProperties
      }
    />
  </div>
);

export default FloatingOrbs;
