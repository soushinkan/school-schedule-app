import React from 'react';
import { Calendar, Clock, MapPin, Users, X } from 'lucide-react';

interface SessionFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export const SessionForm: React.FC<SessionFormProps> = ({ onSubmit, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      id: crypto.randomUUID(),
      schoolName: formData.get('schoolName'),
      applicationStartDate: formData.get('applicationStartDate'),
      applicationDeadline: formData.get('applicationDeadline'),
      sessionDate: formData.get('sessionDate'),
      sessionStartTime: formData.get('sessionStartTime'),
      sessionEndTime: formData.get('sessionEndTime'),
      location: formData.get('location'),
      participants: formData.get('participants'),
    };
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">新規登録</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">学校名</label>
            <input
              type="text"
              name="schoolName"
              required
              className="block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="学校名を入力"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">申し込み開始日</label>
              <input
                type="date"
                name="applicationStartDate"
                required
                className="block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">申し込み締切日</label>
              <input
                type="date"
                name="applicationDeadline"
                required
                className="block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">説明会日</label>
            <input
              type="date"
              name="sessionDate"
              required
              className="block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">開始時間</label>
              <input
                type="time"
                name="sessionStartTime"
                required
                className="block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">終了時間</label>
              <input
                type="time"
                name="sessionEndTime"
                required
                className="block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">場所</label>
            <input
              type="text"
              name="location"
              required
              className="block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="場所を入力"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">参加者</label>
            <textarea
              name="participants"
              rows={3}
              className="block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="参加者の情報を入力"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};