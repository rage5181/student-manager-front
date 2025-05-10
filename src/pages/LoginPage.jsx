import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      
      const token = res.data.token;
      console.log('받은 토큰:', token); // 👈 확인용
     
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      navigate('/'); // 로그인 후 메인으로 이동

    } catch (err) {
      alert('로그인 실패');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded w-96">
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          로그인
        </button>

        {/* 👇 회원가입 링크 위치 조정 */}
        <p className="text-center text-sm mt-4">
        아직 계정이 없으신가요?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
            회원가입
        </Link>
        </p>

      </div>

      
    </div>
  );
}

export default LoginPage;
