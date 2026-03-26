import { useNavigate } from 'react-router-dom';
import { createContact } from '../api/contactsApi';
import ContactForm from '../components/ContactForm';
import toast from 'react-hot-toast';

function AddContactPage() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createContact(formData);
      toast.success('Contact added successfully!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create contact';
      toast.error(msg);
    }
  };

  return (
    <div className="page page-narrow">
      <h2>Add New Contact</h2>
      <ContactForm onSubmit={handleSubmit} submitLabel="Add Contact" />
    </div>
  );
}

export default AddContactPage;