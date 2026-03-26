import axios from 'axios';

const BASE = '/api/contacts';

const apiClient = axios.create({
  withCredentials: true, // Important for cookies
});


// Get all contacts (optional search & category query params)
export const fetchContacts = (search = '', category = 'all') =>
  axios.get(BASE, { params: { search, category } }).then(r => r.data.data);

// Get one contact by id
export const fetchContact = (id) =>
  axios.get(`${BASE}/${id}`).then(r => r.data.data);

// Create a new contact
export const createContact = (data) =>
  axios.post(BASE, data).then(r => r.data.data);

// Update an existing contact
export const updateContact = (id, data) =>
  axios.put(`${BASE}/${id}`, data).then(r => r.data.data);

// Delete a contact
export const deleteContact = (id) =>
  axios.delete(`${BASE}/${id}`).then(r => r.data);