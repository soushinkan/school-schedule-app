import React, { useState } from 'react';
import { CalendarView } from './components/Calendar';
import { SessionForm } from './components/SessionForm';
import { SessionDetails } from './components/SessionDetails';
import { SchoolSession } from './types';
import { Plus } from 'lucide-react';

function App() {
  const [sessions, setSessions] = useState<SchoolSession[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SchoolSession | null>(null);

  const handleSubmit = (data: SchoolSession) => {
    setSessions([...sessions, data]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto p-4">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">学校説明会スケジュール</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>新規登録</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <CalendarView 
            sessions={sessions}
            onSchoolClick={setSelectedSession}
          />
        </div>

        {showForm && (
          <SessionForm
            onSubmit={handleSubmit}
            onClose={() => setShowForm(false)}
          />
        )}

        {selectedSession && (
          <SessionDetails
            session={selectedSession}
            onClose={() => setSelectedSession(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;