export function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "28px 24px",
        marginTop: "24px",
        borderTop: "1px solid var(--pulse-border)",
        background: "var(--pulse-surface)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--pulse-text-muted)", lineHeight: 1.6 }}>
          © 2026 MindLink. Empowering the global collective mind. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

