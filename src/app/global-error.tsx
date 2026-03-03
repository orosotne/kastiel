"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7420/ingest/e7b8ea9e-2b53-44dd-b0ba-855cfff29495', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location: 'global-error.tsx', message: 'global error caught', data: { errorMessage: error?.message, digest: error?.digest }, hypothesisId: 'H6', timestamp: Date.now() }),
    }).catch(() => {});
  }, [error]);
  // #endregion
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
            Error / Chyba
          </h1>
          <p style={{ color: "#2C3E50", opacity: 0.6, marginBottom: "2rem" }}>
            Something went wrong. / Niečo sa pokazilo.
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
            Try again / Skúsiť znova
          </button>
        </div>
      </body>
    </html>
  );
}
