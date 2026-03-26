import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddContactPage from './pages/AddContactPage';
import EditContactPage from './pages/EditContactPage';
import ContactDetailPage from './pages/ContactDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/"            element={<HomePage />} />
          <Route path="/add"         element={<AddContactPage />} />
          <Route path="/edit/:id"    element={<EditContactPage />} />
          <Route path="/contact/:id" element={<ContactDetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;