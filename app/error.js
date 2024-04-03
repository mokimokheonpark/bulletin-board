"use client";

export default function Error({ error, reset }) {
  return (
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
  );
}
