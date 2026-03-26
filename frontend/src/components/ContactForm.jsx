import { useState } from 'react';

const EMPTY_FORM = { name: '', email: '', phone: '', category: 'other', notes: '' };

function ContactForm({ initialData = EMPTY_FORM, onSubmit, submitLabel = 'Save Contact' }) {
  const [form, setForm]       = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          id="name" name="name" type="text"
          value={form.name} onChange={handleChange}
          placeholder="e.g. Ravi Kumar"
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error-msg">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          id="email" name="email" type="email"
          value={form.email} onChange={handleChange}
          placeholder="e.g. ravi@example.com"
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone" name="phone" type="tel"
          value={form.phone} onChange={handleChange}
          placeholder="e.g. 9876543210"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={form.category} onChange={handleChange}>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="family">Family</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes" name="notes"
          value={form.notes} onChange={handleChange}
          placeholder="Any additional notes..."
          rows={3}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}

export default ContactForm;