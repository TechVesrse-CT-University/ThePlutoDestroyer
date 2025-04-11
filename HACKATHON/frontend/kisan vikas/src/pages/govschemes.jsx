import React, { useState } from 'react';
import '../styles/govschemes.css'; // Adjust the path as necessary

const initialData = [
  {
    id: 1,
    name: 'PM-KISAN',
    type: 'Scheme',
    description: 'Income support of ₹6000 per year to farmers in three equal installments.',
  },
  {
    id: 2,
    name: 'Kisan Credit Card',
    type: 'Loan',
    description: 'Short-term credit to farmers at subsidized interest rates.',
  },
  {
    id: 3,
    name: 'PMFBY',
    type: 'Scheme',
    description: 'Crop insurance against crop loss due to natural calamities.',
  },
  {
    id: 4,
    name: 'NABARD Agriculture Loan',
    type: 'Loan',
    description: 'Financing for agricultural equipment, irrigation, and crop inputs.',
  },
  {
    id: 5,
    name: 'Soil Health Card',
    type: 'Scheme',
    description: 'Scheme to provide soil quality information to farmers.',
  },
];

function GovSchemes() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredData = initialData.filter((item) => {
    return (
      (filter === 'All' || item.type === filter) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="gov-container">
      <h2>Government Schemes & Loans</h2>

      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Scheme">Schemes</option>
          <option value="Loan">Loans</option>
        </select>

        <input
          type="text"
          placeholder="Search schemes or loans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="scheme-list">
        {filteredData.length === 0 ? (
          <p>No results found.</p>
        ) : (
          filteredData.map((item) => (
            <li key={item.id} className="scheme-item">
              <h3>{item.name} <span>({item.type})</span></h3>
              <p>{item.description}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default GovSchemes;