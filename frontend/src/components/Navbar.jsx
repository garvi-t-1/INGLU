import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">📋 ContactsApp</Link>
      <div className="navbar-links">
        <Link to="/"    className={pathname === '/'    ? 'active' : ''}>All Contacts</Link>
        <Link to="/add" className={pathname === '/add' ? 'active' : ''}>+ Add New</Link>
      </div>
    </nav>
  );
}

export default Navbar;