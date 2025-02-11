import React from 'react';
import { Clock, MapPin, Users, X } from 'lucide-react';
import { SchoolSession } from '../types';

interface SessionDetailsProps {
  session: SchoolSession;
  onClose: () => void;
}

export const SessionDetails: React.FC<SessionDetailsProps> = ({ session, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{session.schoolName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium">説明会時間</div>
              <div className="text-gray-600">
                {session.sessionStartTime} 〜 {session.sessionEndTime}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium">場所</div>
              <div className="text-gray-600">{session.location}</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium">参加者</div>
              <div className="text-gray-600 whitespace-pre-line">{session.participants}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};