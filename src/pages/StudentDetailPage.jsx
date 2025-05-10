import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState({
    name: '',
    studentId: '',
    grade: '',
    major: '',
  });

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/students/${id}`);
      setStudent(res.data);
      setForm(res.data);
    } catch (err) {
      console.error('❌ 학생 정보 로딩 실패:', err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/api/students/${id}`, form);
      alert('✅ 수정 완료!');
      navigate('/');
    } catch (err) {
      console.error('❌ 수정 실패:', err);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:4000/api/students/${id}`);
      alert('🗑️ 삭제 완료!');
      navigate('/');
    } catch (err) {
      console.error('❌ 삭제 실패:', err);
    }
  };

  if (!student) return <p className="text-center mt-10">불러오는 중...</p>;

  return (
    <div className="max-w-xl mx-auto py-8 px-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">👤 학생 상세 정보</h2>
      <div className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="이름"
          required
        />
        <input
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="학번"
          required
        />
        <input
          name="grade"
          value={form.grade}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="학년"
        />
        <input
          name="major"
          value={form.major}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="전공"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          삭제
        </button>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default StudentDetailPage;
