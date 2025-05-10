import { useState, useEffect } from 'react';

const GroupEditModal = ({ isOpen, onClose, group, onUpdate, onDelete }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (group) {
      setName(group.name);
      setDescription(group.description);
    }
  }, [group]);

  if (!isOpen || !group) return null;

  const handleUpdate = () => {
    onUpdate({ ...group, name, description });
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onDelete(group.id);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold">그룹 수정</h2>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="그룹 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            수정
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            삭제
          </button>
          <button onClick={onClose} className="border px-4 py-2 rounded hover:bg-gray-100">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupEditModal;
