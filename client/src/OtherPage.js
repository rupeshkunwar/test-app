import React from 'react';
import { Link } from 'react-router-dom';

function OtherPage() {
  const tips = [
    'Try small values first to see instant results.',
    'Use quick picks to compare growth patterns.',
    'Refresh to sync values from Redis and Postgres.',
  ];

  return (
    <section className="tips-page">
      <h2>Fibonacci Tips</h2>
      <p>Explore how fast this sequence grows and compare different indexes.</p>
      <div className="tips-grid">
        {tips.map((tip) => (
          <article key={tip} className="tip-card">
            {tip}
          </article>
        ))}
      </div>
      <Link className="nav-link active back-link" to="/">
        Go back home
      </Link>
    </section>
  );
}

export default OtherPage;
