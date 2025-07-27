import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleClick = async () => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
      setError('');
    } catch (err) {
      setError(err.message);
      setResponse('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gemini React App</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API Key"
          style={{ width: '300px', padding: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          rows="10"
          style={{ width: '500px', padding: '5px' }}
        />
      </div>
      <button onClick={handleClick} style={{ padding: '10px 15px' }}>
        Generate
      </button>
      {response && (
        <div style={{ marginTop: '20px' }}>
          <h2>Response:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f4f4f4', padding: '10px' }}>{response}</pre>
        </div>
      )}
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
