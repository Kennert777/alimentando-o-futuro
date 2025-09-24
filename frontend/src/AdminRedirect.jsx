import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin/login');
  }, [navigate]);

  return null;
}