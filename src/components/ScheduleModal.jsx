import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axiosInstance';

const ScheduleModal = ({ isOpen, onClose, selectedEvent }) => {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title || '');
      setDate(selectedEvent.date || '');
      setTime(selectedEvent.time || '');
      setDescription(selectedEvent.description || '');
    } else {
      setTitle('');
      setDate('');
      setTime('');
      setDescription('');
    }
  }, [selectedEvent, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduleData = {
      title,
      date,
      time,
      description,
      user_id: user?.id,
    };

    try {
      if (selectedEvent) {
        // 수정
        await axios.put(`/schedules/${selectedEvent.id}`, scheduleData);
        console.log('수정 완료');
      } else {
        // 등록
        await axios.post(`/schedules`, scheduleData);
        console.log('등록 완료');
      }

      onClose(); // 저장 후 모달 닫기
    } catch (err) {
      console.error('일정 저장 실패:', err);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/schedules/${selectedEvent.id}`);
        console.log('삭제 완료');
        onClose(); // 삭제 후 모달 닫기
      } catch (err) {
        console.error('일정 삭제 실패:', err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">{selectedEvent ? '일정 수정' : '일정 등록'}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              취소
            </button>

            {selectedEvent && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                삭제
              </button>
            )}

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {selectedEvent ? '수정 완료' : '등록 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
