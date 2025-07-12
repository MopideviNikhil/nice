import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import Json from './verbs.json'
import './App.css';

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
    tel: true, v1: true, v2: true, v3: true, v4: true, v5: true
  });
  const [filterLetter, setFilterLetter] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

  const filteredData = filterLetter
    ? Json.verbs.filter(item => item.v1.toLowerCase().startsWith(filterLetter.toLowerCase()))
    : Json.verbs;

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

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

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen p-4 font-sans`}>
      {/* 🔄 Dark Mode Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-2xl focus:outline-none"
          title="Toggle Dark Mode"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Verb Table (Filter & Download)</h2>

      {/* 🔤 Alphabet Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => setFilterLetter(letter)}
            className={`px-3 py-1 border rounded ${filterLetter === letter
              ? 'bg-blue-500 text-white'
              : 'bg-white dark:bg-gray-800 text-black dark:text-white'}`}
          >
            {letter}
          </button>
        ))}
        <button
          onClick={() => setFilterLetter('')}
          className="ml-4 px-3 py-1 border rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          Reset
        </button>
      </div>

      {/* Toggle Columns */}
      <div className="flex flex-wrap gap-2 mb-4">
        {columns.map(col => (
          <button
            key={col}
            onClick={() => toggleColumn(col)}
            className={`px-3 py-1 rounded text-sm font-medium ${visibleColumns[col]
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'}`}
          >
            {visibleColumns[col] ? `Hide ${columnLabels[col]}` : `Show ${columnLabels[col]}`}
          </button>
        ))}
      </div>

      {/* ⬇️ Download Words */}
      <div className="mb-6">
        <button
          onClick={downloadWords}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ⬇️ Download Words
        </button>
      </div>

      {/* 📋 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-600 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {columns.map(col => visibleColumns[col] && (
                <th key={col} className="border px-4 py-2 text-left font-medium dark:border-gray-700">
                  {columnLabels[col]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center text-gray-500 dark:text-gray-300">
                  No matching results for "{filterLetter}"
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {columns.map(col => visibleColumns[col] && (
                    <td key={col} className="border px-4 py-2 dark:border-gray-700">{row[col]}</td>
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
