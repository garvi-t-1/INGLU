import { useNavigate } from 'react-router-dom';
import { deleteContact } from '../api/contactsApi';
import toast from 'react-hot-toast';

const CATEGORY_COLORS = {
  work:     '#3b82f6',
  personal: '#10b981',
  family:   '#f59e0b',
  other:    '#8b5cf6',
};

function ContactCard({ contact, onDelete }) {
  const navigate = useNavigate();

  const initials = contact.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${contact.name}?`)) return;
    try {
      await deleteContact(contact._id);
      toast.success(`${contact.name} deleted`);
      onDelete(contact._id);
    } catch {
      toast.error('Failed to delete contact');
    }
  };

  return (
    <div className="contact-card">
      {/* Avatar */}
      <div
        className="avatar"
        style={{ background: CATEGORY_COLORS[contact.category] || '#8b5cf6' }}
      >
        {initials}
      </div>

      {/* Info */}
      <div className="card-info">
        <h3>{contact.name}</h3>
        <p>{contact.email}</p>
        {contact.phone && <p>{contact.phone}</p>}
        <span className="badge" style={{ background: CATEGORY_COLORS[contact.category] }}>
          {contact.category}
        </span>
      </div>

      {/* Actions */}
      <div className="card-actions">
        <button onClick={() => navigate(`/contact/${contact._id}`)} className="btn btn-ghost">View</button>
        <button onClick={() => navigate(`/edit/${contact._id}`)}    className="btn btn-outline">Edit</button>
        <button onClick={handleDelete}                               className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}

export default ContactCard;