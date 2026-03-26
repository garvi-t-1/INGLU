import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/contacts',
  withCredentials: true,
});

// Get all contacts
export const fetchContacts = (search = '', category = 'all') =>
  apiClient.get('/', { params: { search, category } })
    .then(r => r.data.data);

// Get one contact
export const fetchContact = (id) =>
  apiClient.get(`/${id}`)
    .then(r => r.data.data);

// Create
export const createContact = (data) =>
  apiClient.post('/', data)
    .then(r => r.data.data);

// Update
export const updateContact = (id, data) =>
  apiClient.put(`/${id}`, data)
    .then(r => r.data.data);

// Delete
export const deleteContact = (id) =>
  apiClient.delete(`/${id}`)
    .then(r => r.data);