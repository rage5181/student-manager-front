import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import StudentFormModal from '../components/StudentFormModal';

const StudentListPage = () => {
  const token = localStorage.getItem('token');

  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('ALL'); // ✅ 그룹 필터 상태
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      const res = await axios.get('/api/groups');
      setGroups(res.data);
    } catch (err) {
      console.error('그룹 불러오기 실패:', err);
    } 
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error('❌ 목록 로딩 실패:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchGroups();
  }, []);

  // ✅ 그룹 필터링
  useEffect(() => {
    if (selectedGroupId === 'ALL') {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter((s) => String(s.group_id) === selectedGroupId)
      );
    }
  }, [selectedGroupId, students]);

  const handleAddStudent = async (newStudent) => {
    try {
      const res = await axios.post('/api/students', newStudent);
      const updatedStudents = [...students, res.data];
      setStudents(updatedStudents);
    } catch (err) {
      console.error('❌ 등록 실패:', err);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">📋 학생 목록</h1>

      {/* ✅ 그룹 선택 콤보박스 */}
      <div className="flex justify-between items-center mb-2">
        <select
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="ALL">전체 그룹</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + 학생 추가
        </button>
      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-center text-gray-500">등록된 학생이 없습니다.</p>
      ) : (
        <table className="w-full bg-white rounded shadow text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">그룹</th>
              <th className="p-2 text-left">이름</th>
              <th className="p-2 text-left">학번</th>
              <th className="p-2 text-left">전공</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate(`/students/${s.id}`)}
              >
                <td className="p-2">{s.groupName || '-'}</td>
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.studentId}</td>
                <td className="p-2">{s.major}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 등록 폼 모달 */}
      {showModal && (
        <StudentFormModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddStudent}
          groups={groups}
        />
      )}
    </div>
  );
};

export default StudentListPage;
