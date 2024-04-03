"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="p-20">
          <h2>Something went wrong!</h2>
          <button
            onClick={() => {
              reset();
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
