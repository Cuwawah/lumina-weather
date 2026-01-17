import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Create a 6-character random ID
    const shortId = nanoid(6);

    try {
      await setDoc(doc(db, "links", shortId), {
        longUrl: url,
        createdAt: new Date(),
      });
      // This creates the link based on your current Replit address
      setShortUrl(`${window.location.origin}/${shortId}`);
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Error: Check if your Firebase Rules are set to Test Mode!");
    }
    setLoading(false);
  };

  return (
    <div id="app-container">
      <div className="card">
        {/* Header Section */}
        <h1 style={{ color: '#60a5fa', fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>
          Linkyy
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.875rem' }}>
          Paste a long URL to make it tiny.
        </p>

        {/* Input Form */}
        <form onSubmit={handleShorten} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="url"
            required
            placeholder="https://example.com/very-long-link"
            style={{ 
              width: '100%', 
              padding: '1rem', 
              borderRadius: '0.75rem', 
              backgroundColor: '#0f172a', 
              border: '1px solid #334155', 
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              padding: '1rem', 
              borderRadius: '0.75rem', 
              fontWeight: '700',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              border: 'none',
              transition: 'background-color 0.2s'
            }}
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {/* Success Result Box */}
        {shortUrl && (
          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            backgroundColor: 'rgba(16, 185, 129, 0.1)', 
            border: '1px solid rgba(16, 185, 129, 0.3)', 
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <span style={{ 
              color: '#34d399', 
              fontSize: '0.85rem', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap', 
              marginRight: '1rem',
              fontWeight: '500'
            }}>
              {shortUrl}
            </span>
            <button 
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                alert("Copied to clipboard!");
              }}
              style={{ 
                fontSize: '0.75rem', 
                backgroundColor: '#10b981', 
                color: '#0f172a', 
                padding: '0.4rem 0.8rem', 
                borderRadius: '0.5rem', 
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              COPY
            </button>
          </div>
        )}
      </div>
    </div>
  );
}