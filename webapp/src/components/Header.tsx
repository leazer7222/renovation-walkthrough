export function Header() {
  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.5rem 1.5rem",
      height: "80px",
      background: "var(--background, #fff)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
    }}>
      <img src="/logo.png" alt="ReformAI" style={{ width: "100px", height: "auto", objectFit: "contain" }} />
    </header>
  );
}
