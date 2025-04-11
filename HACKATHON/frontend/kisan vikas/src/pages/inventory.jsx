import React, { useState } from 'react';
import '../styles/inventorymanager.css'; // Adjust the path as necessary

const initialInventory = [
  { id: 1, name: 'Tractor', category: 'Machines' },
  { id: 2, name: 'Hoe', category: 'Tools' },
  { id: 3, name: 'Urea', category: 'Fertilizers' },
  { id: 4, name: 'DDT', category: 'Pesticides' },
  { id: 5, name: 'Neem Oil', category: 'Insecticides' }
];

const categories = ['All', 'Tools', 'Machines', 'Fertilizers', 'Pesticides', 'Insecticides'];

function InventoryManager() {
  const [inventory, setInventory] = useState(initialInventory);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Tools');
  const [filter, setFilter] = useState('All');

  const handleAdd = () => {
    if (name.trim() === '') return;
    const newItem = {
      id: Date.now(),
      name,
      category
    };
    setInventory([...inventory, newItem]);
    setName('');
    setCategory('Tools');
  };

  const filteredInventory = filter === 'All'
    ? inventory
    : inventory.filter(item => item.category === filter);

  return (
    <div className="inventory-container">
      <h2>Crop Inventory Manager</h2>

      <div className="add-form">
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.slice(1).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={handleAdd}>Add Item</button>
      </div>

      <div className="filter-section">
        <label>Filter by category: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <ul className="inventory-list">
        {filteredInventory.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> <em>({item.category})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryManager;