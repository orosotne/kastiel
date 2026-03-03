const DEBUG_ENDPOINT = 'http://127.0.0.1:7420/ingest/e7b8ea9e-2b53-44dd-b0ba-855cfff29495';

export function debugLog(params: {
  location: string;
  message: string;
  data?: Record<string, unknown>;
  hypothesisId?: string;
  runId?: string;
}) {
  const payload = {
    ...params,
    timestamp: Date.now(),
  };
  try {
    fetch(DEBUG_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch {
    // ignore
  }
}
