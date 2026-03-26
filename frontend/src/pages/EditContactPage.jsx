import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchContact, updateContact } from '../api/contactsApi';
import ContactForm from '../components/ContactForm';
import toast from 'react-hot-toast';

function EditContactPage() {
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

  const handleSubmit = async (formData) => {
    try {
      await updateContact(id, formData);
      toast.success('Contact updated!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update contact';
      toast.error(msg);
    }
  };

  if (loading) return <p className="state-msg">Loading...</p>;

  return (
    <div className="page page-narrow">
      <h2>Edit Contact</h2>
      <ContactForm initialData={contact} onSubmit={handleSubmit} submitLabel="Update Contact" />
    </div>
  );
}

export default EditContactPage;