import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Header from '../components/Header';

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: '학생 목록', path: '/' },
    { name: '그룹 목록', path: '/groups' },
    { name: '일정 관리', path: '/calendar' },
    // { name: '설정', path: '/settings' }, // 나중에 추가 가능
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-blue-600 text-white w-64 p-4 space-y-4 
        ${menuOpen ? 'block' : 'hidden'} 
        md:block fixed md:relative z-50`}

        style={{
          backgroundImage: "url('/images/캐릭터2.png')", // 이미지 경로
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 90%', // 아래보다 살짝 위
          backgroundSize: '100px auto', // 필요시 'contain' 도 가능
        }}
      >



        <h2 className="text-xl font-bold mb-6">📚 학생 관리</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)} // 모바일에서 메뉴 닫기
              className={`block p-2 rounded hover:bg-blue-700 ${
                location.pathname === item.path ? 'bg-blue-800' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

      {/* TimeTech 로고 하단 고정 */}
  <div className="absolute bottom-4 left-4 flex items-center space-x-1 text-sm font-bold text-pink-200 opacity-80">
    <span>Time</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-blue-200"
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3L4.5 9.75M14.25 21l5.25-6.75M3 14.25l6.75 5.25M21 9.75l-6.75-5.25" />
    </svg>
    <span>Tech</span>
  </div>
      

      
        
      </div>

     


      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden absolute top-4 left-4 z-50 bg-white p-2 rounded shadow"
      >
        <Menu />
      </button>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 p-6 overflow-auto w-full">
        <Header />
        <Outlet />
      </div>

      

    </div>
  );
};

export default Dashboard;
