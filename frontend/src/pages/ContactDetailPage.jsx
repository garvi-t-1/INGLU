import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchContact, deleteContact } from '../api/contactsApi';
import toast from 'react-hot-toast';

function ContactDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContact(id)
      .then(setContact)
      .catch(() => { toast.error('Contact not found'); navigate('/'); })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${contact.name}?`)) return;
    try {
      await deleteContact(id);
      toast.success('Contact deleted');
      navigate('/');
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <p className="state-msg">Loading...</p>;
  if (!contact) return null;

  return (
    <div className="page page-narrow">
      <div className="detail-card">
        <div className="detail-avatar">{contact.name.slice(0, 2).toUpperCase()}</div>
        <h2>{contact.name}</h2>
        <p> {contact.email}</p>
        {contact.phone && <p> {contact.phone}</p>}
        <p> <strong>{contact.category}</strong></p>
        {contact.notes && <p> {contact.notes}</p>}
        <p className="detail-date">Added: {new Date(contact.createdAt).toLocaleDateString()}</p>

        <div className="detail-actions">
          <button onClick={() => navigate(`/edit/${id}`)} className="btn btn-outline">Edit</button>
          <button onClick={handleDelete}                  className="btn btn-danger">Delete</button>
          <button onClick={() => navigate('/')}           className="btn btn-ghost">← Back</button>
        </div>
      </div>
    </div>
  );
}

export default ContactDetailPage;