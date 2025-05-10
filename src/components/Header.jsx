import { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { getUserInfo } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const user = getUserInfo();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full flex justify-between items-center px-4 py-3 bg-white shadow-md relative z-10">
      
      <div className="w-full text-lg text-center font-bold ">학생관리</div>
      <div className="relative absolute right-4" ref={menuRef}>
        <div
          className="flex items-center space-x-2 cursor-pointer min-w-[80px]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaUserCircle className="text-2xl text-gray-600" />
          <span className="text-sm text-gray-800 truncate">{user?.name ?? '사용자'}</span>
        </div>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md text-sm">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate('/profile')}
            >
              내 정보
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>

  
  );
};

export default Header;
