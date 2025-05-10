import { useState } from 'react';
import axios from '../api/axiosInstance'; // 인증 포함된 axios 인스턴스
import { useAuth } from '../context/AuthContext';

const GroupForm = ({ onGroupCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const {user}  = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/groups/register', {name, description, "id":user.id });
      onGroupCreated(res.data); // 등록 후 콜백
      setName('');
      setDescription('');
    } catch (err) {
      console.error('그룹 생성 실패:', err.response?.data || err.message);
      alert('그룹 생성에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded space-y-3">
      <h2 className="text-lg font-bold">새 그룹 등록</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="그룹 이름"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        등록
      </button>
    </form>
  );
};

export default GroupForm;
