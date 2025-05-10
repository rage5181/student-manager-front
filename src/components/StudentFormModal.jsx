import { useState } from 'react';

const StudentFormModal = ({ onClose, onSubmit, groups }) => {
  const [form, setForm] = useState({
    name: '',
    studentId: '',
    grade: '',
    major: '',
    groupId: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">학생 등록</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* 🔽 그룹 선택 콤보박스 추가 */}
      <select
        name="groupId"
        value={form.groupId}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">그룹 선택</option>
        {groups.map(group => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>

          <input
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="studentId"
            placeholder="학번 (예: S2024001)"
            value={form.studentId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="grade"
            placeholder="학년"
            value={form.grade}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="major"
            placeholder="전공"
            value={form.major}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
