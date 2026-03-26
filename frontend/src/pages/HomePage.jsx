import { useState, useEffect } from 'react';
import { fetchContacts } from '../api/contactsApi';
import ContactCard from '../components/ContactCard';

function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('all');
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      loadContacts();
    }, 300); // debounce search input by 300ms
    return () => clearTimeout(timer);
  }, [search, category]);

  const loadContacts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchContacts(search, category);
      setContacts(data);
    } catch {
      setError('Could not load contacts. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  // Called by ContactCard after a successful delete
  const handleDelete = (id) => {
    setContacts(prev => prev.filter(c => c._id !== id));
  };

  return (
    <div className="page">
      {/* Search + filter bar */}
      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={category} onChange={e => setCategory(e.target.value)} className="filter-select">
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="family">Family</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* States */}
      {loading && <p className="state-msg">Loading contacts...</p>}
      {error   && <p className="state-msg error">{error}</p>}
      {!loading && !error && contacts.length === 0 && (
        <p className="state-msg">No contacts found. Try a different search or add one!</p>
      )}

      {/* Contact grid */}
      <div className="contacts-grid">
        {contacts.map(contact => (
          <ContactCard key={contact._id} contact={contact} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;