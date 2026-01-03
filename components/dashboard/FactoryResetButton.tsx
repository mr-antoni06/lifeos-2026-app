'use client';

import { useState } from 'react';
import { useLifeOSStore } from '@/lib/store';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export default function FactoryResetButton() {
  const { resetAll } = useLifeOSStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleReset = () => {
    if (confirmText.toUpperCase() === 'RESET') {
      resetAll();
      setShowConfirm(false);
      setConfirmText('');
    }
  };

  return (
    <>
      {/* Factory Reset Button - Fixed Bottom Right */}
      <button
        onClick={() => setShowConfirm(true)}
        className="fixed bottom-6 right-6 p-3 bg-cyber-panel border border-cyber-gray hover:border-cyber-red rounded-full transition-all group z-40"
        title="Factory Reset"
      >
        <RotateCcw className="w-5 h-5 text-cyber-text-dim group-hover:text-cyber-red transition-all group-hover:rotate-180 duration-500" />
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-cyber-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-cyber-panel border border-cyber-red rounded-lg p-6 max-w-md w-full">
            {/* Warning Icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-cyber-red/10 border border-cyber-red flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-cyber-red" />
              </div>
              <h3 className="text-lg font-bold text-cyber-red">FACTORY RESET</h3>
            </div>

            {/* Warning Message */}
            <div className="mb-6 space-y-3">
              <p className="text-sm text-cyber-text-muted">
                This will permanently delete:
              </p>
              <ul className="text-sm text-cyber-text-dim space-y-1 pl-4">
                <li>• All protocols (habits)</li>
                <li>• All progress logs</li>
                <li>• All XP and levels</li>
                <li>• All streaks</li>
                <li>• Anti-scroll data</li>
                <li>• Settings</li>
              </ul>
              <p className="text-sm text-cyber-red font-bold mt-4">
                ⚠️ THIS ACTION CANNOT BE UNDONE
              </p>
            </div>

            {/* Confirmation Input */}
            <div className="mb-6">
              <label className="block text-xs text-cyber-text-dim uppercase tracking-wider mb-2">
                Type "RESET" to confirm
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="RESET"
                className="w-full px-4 py-2 bg-cyber-gray border border-cyber-gray-light focus:border-cyber-red rounded text-white outline-none uppercase"
                autoFocus
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setConfirmText('');
                }}
                className="flex-1 px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded text-sm text-cyber-text-muted hover:text-white hover:border-cyber-neon transition-all uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                disabled={confirmText.toUpperCase() !== 'RESET'}
                className="flex-1 px-4 py-3 bg-cyber-red border border-cyber-red rounded text-sm text-white font-bold hover:bg-cyber-red/80 transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
