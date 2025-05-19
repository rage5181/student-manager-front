import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import GroupForm from '../components/GroupForm';
import GroupEditModal from '../components/GroupEditModal'; // 추가

const GroupPage = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoding] = useState(true);   //로딩상태추가

  const fetchGroups = async () => {
    try {
      const res = await axios.get('/groups');
      setGroups(res.data);
    } catch (err) {
      console.error('그룹 불러오기 실패:', err);
    } finally{
      setLoding(false);   // 데이터 가져오면 로딩 false
    }
  };

  const handleGroupCreated = (newGroup) => {
    setGroups((prev) => [...prev, newGroup]);
  };

  const handleUpdateGroup = async (updatedGroup) => {
    try {
      await axios.put(`/groups/${updatedGroup.id}`, updatedGroup);
      fetchGroups();
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('그룹 수정 실패:', err);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(`/groups/${groupId}`);
      fetchGroups();
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('그룹 삭제 실패:', err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const openEditModal = (group) => {
    setSelectedGroup(group);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedGroup(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-blue-700">그룹 목록</h1>
      <GroupForm onGroupCreated={handleGroupCreated} />
     
      {loading ? (
          <div className="text-center text-gray-400 mt-8">로딩 중...</div>

      ) : groups.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          등록된 그룹이 없습니다.
        </div>
      ) : (
     
      <ul className="space-y-3">
        {groups.map((group) => (
          <li key={group.id} className="p-4 border rounded shadow-sm bg-blue-50 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-blue-700">{group.name}</h3>
                <p className="text-sm text-gray-600">{group.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(group)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeleteGroup(group.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  삭제
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      )}
      {/* 수정 모달 */}
      <GroupEditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        group={selectedGroup}
        onUpdate={handleUpdateGroup}
        onDelete={handleDeleteGroup}
      />
    </div>
  );
};

export default GroupPage;
