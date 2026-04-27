import { useEffect, useState } from 'react';
import { getItems } from './api';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import './App.css';
function App() {
const [items, setItems] = useState([]);
const [error, setError] = useState('');
const fetchItems = async () => {
try {
const res = await getItems();
setItems(Array.isArray(res.data) ? res.data : []);
setError('');
} catch (e) {
setItems([]);
setError('Could not reach backend API. Start backend and check VITE_API_URL.');
}
};
useEffect(() => {
fetchItems();
}, []);
return (
<div style={{ maxWidth: '700px', margin: '2rem auto', fontFamily: 'sans-serif' }}>


<h1>Item Manager</h1>
{error && <p style={{ color: 'crimson' }}>{error}</p>}
<ItemForm onItemAdded={fetchItems} />
<ItemList items={items} onRefresh={fetchItems} />
</div>
);
}
export default App;
