"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF9F6",
          padding: "1rem",
          fontFamily: "system-ui, sans-serif"
        }}>
          <h1 style={{ fontSize: "2rem", color: "#2C3E50", marginBottom: "1rem" }}>
            Nastala chyba
          </h1>
          <p style={{ color: "#2C3E50", opacity: 0.6, marginBottom: "2rem" }}>
            Ospravedlňujeme sa, niečo sa pokazilo.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "#C9A050",
              color: "#2C3E50",
              border: "none",
              cursor: "pointer",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}
          >
            Skúsiť znova
          </button>
        </div>
      </body>
    </html>
  );
}





