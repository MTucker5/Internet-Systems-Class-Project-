'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-wrapper">
      <h2>Something went wrong</h2>
      <p>There was a problem loading your data. Please try again.</p>
      <button className="add-btn" onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
