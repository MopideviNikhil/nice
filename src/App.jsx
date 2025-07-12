import React, { useState, useEffect } from 'react';
import Json from './verbs.json'
import './App.css'


const DataTable = () => {

  const columns = ['v1', 'tel', 'v2', 'v3', 'v4', 'v5'];
  const columnLabels = {
    v1: 'Base',
    tel: 'Telugu',
    v2: 'Past',
    v3: 'Past Participle',
    v4: 'Present Participle',
    v5: 'Third Person Singular'
  };

  const [visibleColumns, setVisibleColumns] = useState({
    tel: true,
    v1: true,
    v2: true,
    v3: true,
    v4: true,
    v5: true
  });

  const [filterLetter, setFilterLetter] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Load voices for TTS
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      if (!selectedVoice && voices.length) {
        const preferred = voices.find(v => v.name.includes("Google") || v.name.includes("Microsoft")) || voices[0];
        setSelectedVoice(preferred);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [selectedVoice]);

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({
      ...prev,
      [col]: !prev[col]
    }));
  };

  const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

  const filteredData = filterLetter
    ? Json.verbs.filter(item => item.v1.toLowerCase().startsWith(filterLetter.toLowerCase()))
    : Json.verbs;

  // 🔊 Read aloud filtered v1 words
  const speakAllWords = () => {
    if (!window.speechSynthesis) {
      alert("Speech Synthesis not supported in this browser.");
      return;
    }

    const text = filteredData.map(item => item.v1).join(', ');
    const utterance = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    speechSynthesis.cancel(); // Stop any ongoing speech
    speechSynthesis.speak(utterance);
  };

  // ⬇️ Download filtered words as .txt
  const downloadWords = () => {
    const rows = filteredData.map(item =>
      columns.map(col => (visibleColumns[col] ? item[col] : '')).join('\t')
    );
    const header = columns.filter(col => visibleColumns[col]).map(col => columnLabels[col]).join('\t');
    const text = [header, ...rows].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'filtered-verbs.txt';
    link.click();
  };

  // 🔊 Record and Download Audio
  const downloadAudio = () => {
    const utteranceText = filteredData.map(item => item.v1).join(', ');
    const utterance = new SpeechSynthesisUtterance(utteranceText);
    const stream = new MediaStream();

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Use MediaRecorder to record the speech
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/wav' });

    mediaRecorder.ondataavailable = (event) => {
      const audioBlob = event.data;
      const audioUrl = URL.createObjectURL(audioBlob);
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'spoken-verbs.wav';
      link.click();
    };

    mediaRecorder.start();

    // Start the speech synthesis and stop recording when done
    speechSynthesis.speak(utterance);
    utterance.onend = () => {
      mediaRecorder.stop();
    };
  };

  return (
    <div className="p-4 font-sans">
      <h2 className="text-xl font-bold mb-4">Verb Table (Filter, Read, Download)</h2>

      {/* Filter by letter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => setFilterLetter(letter)}
            className={`px-3 py-1 border rounded ${filterLetter === letter ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {letter}
          </button>
        ))}
        <button
          onClick={() => setFilterLetter('')}
          className="ml-4 px-3 py-1 border rounded bg-gray-200"
        >
          Reset
        </button>
      </div>

      {/* Column toggles */}
      <div className="flex flex-wrap gap-2 mb-4">
        {columns.map(col => (
          <button
            key={col}
            onClick={() => toggleColumn(col)}
            className={`px-3 py-1 rounded text-sm font-medium ${visibleColumns[col] ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          >
            {visibleColumns[col] ? `Hide ${columnLabels[col]}` : `Show ${columnLabels[col]}`}
          </button>
        ))}
      </div>

      {/* Voice select, Read and Download buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select
          className="px-3 py-1 border rounded"
          value={selectedVoice?.name || ''}
          onChange={(e) => {
            const voice = availableVoices.find(v => v.name === e.target.value);
            setSelectedVoice(voice);
          }}
        >
          {availableVoices.map(voice => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>

        <button
          onClick={speakAllWords}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          🔊 Read All Words
        </button>

        <button
          onClick={downloadWords}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ⬇️ Download Words
        </button>

        {/* Download Audio Button */}
        <button
          onClick={downloadAudio}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          🎧 Download Audio
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map(col => visibleColumns[col] && (
                <th key={col} className="border px-4 py-2 text-left font-medium">
                  {columnLabels[col]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                  No matching results for "{filterLetter}"
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map(col => visibleColumns[col] && (
                    <td key={col} className="border px-4 py-2">
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
