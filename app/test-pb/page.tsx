'use client';

import { useState } from 'react';
import { pb } from '@/lib/pocketbase';

export default function TestPBPage() {
  const [status, setStatus] = useState<string>('Ready');
  const [data, setData] = useState<any>(null);

  const testConnection = async () => {
    setStatus('Testing...');
    try {
      // Test if PocketBase is reachable
      const health = await pb.health.check();
      setStatus('✅ Connected to PocketBase!');
      setData(health);
    } catch (error: any) {
      setStatus('❌ Failed to connect: ' + error.message);
      setData(null);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>PocketBase Connection Test</h1>
      <button 
        onClick={testConnection}
        style={{
          padding: '12px 24px',
          background: '#8A61FF',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Test Connection
      </button>
      <div style={{ marginTop: '20px', padding: '20px', background: '#F8F8F8', borderRadius: '8px' }}>
        <strong>Status:</strong> {status}
        {data && (
          <pre style={{ marginTop: '10px', background: 'white', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
      <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
        Make sure PocketBase is running at: {process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090'}
      </p>
    </div>
  );
}