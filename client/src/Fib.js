import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const fetchValues = useCallback(async () => {
    try {
      const res = await axios.get('/api/values/current');
      setValues(res.data || {});
    } catch (error) {
      console.error('fetchValues error', error);
      setFeedback({ type: 'error', message: 'Could not fetch calculated values.' });
    }
  }, []);

  const fetchIndexes = useCallback(async () => {
    try {
      const res = await axios.get('/api/values/all');
      setSeenIndexes(res.data || []);
    } catch (error) {
      console.error('fetchIndexes error', error);
      setFeedback({ type: 'error', message: 'Could not fetch seen indexes.' });
    }
  }, []);

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [fetchValues, fetchIndexes]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^\d+$/.test(index.trim())) {
      setFeedback({ type: 'error', message: 'Please enter a whole number between 0 and 40.' });
      return;
    }

    const nextIndex = Number(index);
    if (nextIndex > 40) {
      setFeedback({ type: 'error', message: 'Index must be 40 or lower.' });
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post('/api/values', { index: nextIndex });
      setFeedback({ type: 'success', message: `Index ${nextIndex} has been queued.` });
      setIndex('');
      await Promise.all([fetchValues(), fetchIndexes()]);
    } catch (error) {
      console.error('handleSubmit error', error);
      setFeedback({ type: 'error', message: 'Submit failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickPicks = [3, 5, 8, 12, 20];
  const sortedSeenIndexes = seenIndexes
    .map(({ number }) => Number(number))
    .filter((number) => Number.isInteger(number))
    .sort((a, b) => a - b);

  const entries = Object.entries(values).sort((a, b) => Number(a[0]) - Number(b[0]));
  const highestIndex = sortedSeenIndexes.at(-1) ?? '-';
  const latestEntry = entries.at(-1);
  const latestResult = latestEntry ? `${latestEntry[0]} -> ${latestEntry[1]}` : '-';

  return (
    <section className="fib-layout">
      <article className="control-card">
        <h2>Try an Index</h2>
        <p className="hint">Enter a whole number and we will compute its Fibonacci value.</p>
        <form className="index-form" onSubmit={handleSubmit}>
          <label htmlFor="index-input">Index</label>
          <div className="input-row">
            <input
              id="index-input"
              type="number"
              min="0"
              max="40"
              step="1"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              placeholder="e.g. 12"
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Calculate'}
            </button>
          </div>
        </form>

        <div className="quick-picks">
          {quickPicks.map((item) => (
            <button key={item} type="button" onClick={() => setIndex(String(item))}>
              {item}
            </button>
          ))}
          <button
            type="button"
            className="outline-btn"
            onClick={() => {
              setFeedback({ type: '', message: '' });
              fetchValues();
              fetchIndexes();
            }}
          >
            Refresh
          </button>
        </div>

        {feedback.message ? (
          <p className={feedback.type === 'error' ? 'feedback error' : 'feedback success'}>
            {feedback.message}
          </p>
        ) : null}
      </article>

      <section className="stats-grid">
        <article className="stat-card">
          <p>Total requests</p>
          <strong>{sortedSeenIndexes.length}</strong>
        </article>
        <article className="stat-card">
          <p>Highest index</p>
          <strong>{highestIndex}</strong>
        </article>
        <article className="stat-card">
          <p>Latest result</p>
          <strong>{latestResult}</strong>
        </article>
      </section>

      <article className="data-card">
        <h3>Indexes I have seen</h3>
        <p>
          {sortedSeenIndexes.length ? sortedSeenIndexes.join(', ') : 'No indexes yet. Submit one!'}
        </p>
      </article>

      <article className="data-card">
        <h3>Calculated values</h3>
        {entries.length ? (
          <div className="value-grid">
            {entries.map(([key, value], idx) => (
              <div key={key} className={`value-chip color-${idx % 6}`}>
                <span>Index {key}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        ) : (
          <p>No values available yet.</p>
        )}
      </article>
    </section>
  );
}

export default Fib;
