import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ScheduleModal from './ScheduleModal';
import axios from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

const Calendar = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // ⭐ 수정할 때 필요한 상태 추가

  // 일정 조회
  const fetchSchedules = async () => {
    try {
      const res = await axios.get(`/schedules?user_id=${user?.id}`);

      console.log('백엔드 응답 >>', res.data);

      const schedules = res.data.map(schedule => {
        let dateObj = new Date(schedule.date); // 서버에서 받은 date (UTC)

        // KST (한국시간) 변환
        const KSTDate = new Date(dateObj.getTime() + 9 * 60 * 60 * 1000);

        const dateStr = KSTDate.toISOString().slice(0, 10); // YYYY-MM-DD
        const timeStr = schedule.time?.slice(0, 5); // HH:mm (00초 제거)

        const startDateTimeStr = `${dateStr}T${timeStr}`; // ex) 2025-04-26T19:34

        const dateCheck = new Date(startDateTimeStr);
        if (isNaN(dateCheck)) {
          console.error('잘못된 날짜/시간 조합:', startDateTimeStr);
          return null;
        }

        return {
          id: schedule.id,
          title: schedule.title,
          start: startDateTimeStr,
          allDay: false,
          extendedProps: {  // ✨ 상세정보 필요할 때 쓰기 위해 추가
            description: schedule.description,
          }
        };
      }).filter(Boolean); // 유효하지 않은 데이터는 제외

      setEvents(schedules);
    } catch (err) {
      console.error('일정 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchSchedules();
    }
  }, [user]);

  // 일정 추가 버튼 클릭
  const handleOpenModal = () => {
    setSelectedEvent(null); // 새 일정 추가라서 초기화
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    fetchSchedules(); // 등록/수정 후 새로고침
  };

  // 📌 일정 클릭했을 때
  const handleEventClick = (clickInfo) => {
    console.log('클릭한 이벤트 >>', clickInfo.event);

    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      date: clickInfo.event.startStr.split('T')[0],  // YYYY-MM-DD
      time: clickInfo.event.startStr.split('T')[1]?.slice(0,5), // HH:mm
      description: clickInfo.event.extendedProps.description || '',
    });

    setIsModalOpen(true);
  };

  return (
    <div className="calendar-container p-2 sm:p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">일정 관리</h1>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          일정 추가
        </button>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        eventClick={handleEventClick} // ✨ 이벤트 클릭 연결
        height="auto"
      />

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedEvent={selectedEvent} // ⭐ 수정 시 사용할 데이터 전달
      />
    </div>
  );
};

export default Calendar;
