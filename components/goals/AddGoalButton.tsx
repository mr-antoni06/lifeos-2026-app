'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import EditGoalModal from './EditGoalModal';

export default function AddGoalButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-cyber-neon text-cyber-black rounded-lg font-medium text-sm tracking-wide hover:bg-cyber-neon/80 transition-all hover:scale-105"
      >
        <Plus className="w-4 h-4" />
        NEW GOAL
      </button>

      {showModal && (
        <EditGoalModal
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
