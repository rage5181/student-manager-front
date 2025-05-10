
import { jwtDecode } from 'jwt-decode';

export function getUserInfo() {
  const token = localStorage.getItem('token');
  console.log('jwtDecode >>', jwtDecode(token));
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
}

