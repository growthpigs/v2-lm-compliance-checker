import React from 'react';
import { populateTestData, clearTestData } from '../utils/test-data';
import { useNavigate } from 'react-router-dom';

export default function TestDataControls() {
  const navigate = useNavigate();

  const handlePopulateAndNavigate = () => {
    populateTestData();
    navigate('/scan-results');
  };

  return (
    <div className="fixed bottom-4 right-4 flex gap-2 bg-white p-4 rounded-lg shadow-lg z-50">
      <button
        onClick={handlePopulateAndNavigate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Load Test Data & View Results
      </button>
      <button
        onClick={clearTestData}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Clear Test Data
      </button>
    </div>
  );
} 