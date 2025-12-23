'use client';

import { useState, useEffect } from 'react';
import chainhooksClient from '@/lib/chainhooks';

export default function ChainhooksExample() {
  const [status, setStatus] = useState<string>('Checking API status...');
  const [chainhooks, setChainhooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const status = await chainhooksClient.getStatus();
        setStatus(`API Status: ${status.status} (${status.server_version})`);
        
        // Fetch chainhooks (you'll need an API key for this to work)
        const { results } = await chainhooksClient.getChainhooks({ limit: 10 });
        setChainhooks(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch chainhooks');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chainhooks Client Example</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-2">API Status</h3>
        <p className="mb-4">{status}</p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong>Error: </strong> {error}
            <p className="mt-2 text-sm">
              Make sure you have set up your environment variables:
              <code className="block bg-gray-100 p-2 rounded mt-1">
                NEXT_PUBLIC_CHAINHOOKS_API_KEY=your_api_key_here
              </code>
            </p>
          </div>
        )}
        
        <h3 className="text-lg font-semibold mb-2 mt-6">Your Chainhooks</h3>
        {loading ? (
          <p>Loading chainhooks...</p>
        ) : chainhooks.length > 0 ? (
          <div className="space-y-4">
            {chainhooks.map((hook) => (
              <div key={hook.uuid} className="border p-4 rounded">
                <p><strong>Name:</strong> {hook.definition.name}</p>
                <p><strong>UUID:</strong> {hook.uuid}</p>
                <p><strong>Status:</strong> {hook.status}</p>
                <p><strong>Created At:</strong> {new Date(hook.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No chainhooks found. Create your first chainhook to see it here.</p>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">Next Steps:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Create a <code>.env.local</code> file in your project root</li>
          <li>Add your Chainhooks API key: <code>NEXT_PUBLIC_CHAINHOOKS_API_KEY=your_api_key_here</code></li>
          <li>Restart your development server</li>
        </ol>
      </div>
    </div>
  );
}
