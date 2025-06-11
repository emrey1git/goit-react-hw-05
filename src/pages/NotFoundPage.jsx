// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
       Return to home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
