'use client';

import { useLifeOSStore } from '@/lib/store';
import { Settings as SettingsIcon, Trash2, Download, Upload, Info } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const { settings, habits, logs, updateSettings, resetAll } = useLifeOSStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleExportData = () => {
    const data = {
      habits,
      logs,
      settings,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lifeos-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          // In a real implementation, you'd want to validate and merge this data
          console.log('Import data:', data);
          alert('Import feature coming soon! Data logged to console.');
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (showResetConfirm) {
      resetAll();
      setShowResetConfirm(false);
      alert('All data has been reset!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-2 border-cyber-neon bg-cyber-dark p-6 rounded-lg shadow-neon">
        <h1 className="text-4xl font-bold mb-2 text-cyber-neon glitch" data-text="SYSTEM CONFIG">
          SYSTEM CONFIG
        </h1>
        <p className="text-cyber-neon/70 text-sm">
          {'>'} ADJUSTING PARAMETERS | STATUS: UNLOCKED
        </p>
      </div>

      {/* System Info */}
      <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-cyber-neon" />
          <h3 className="text-xl font-bold text-cyber-neon">System Information</h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between p-3 bg-cyber-black rounded">
            <span className="text-cyber-neon/70">Total Habits</span>
            <span className="text-cyber-neon font-semibold">{habits.length}</span>
          </div>
          <div className="flex justify-between p-3 bg-cyber-black rounded">
            <span className="text-cyber-neon/70">Total Logs</span>
            <span className="text-cyber-neon font-semibold">{logs.length}</span>
          </div>
          <div className="flex justify-between p-3 bg-cyber-black rounded">
            <span className="text-cyber-neon/70">Storage Type</span>
            <span className="text-cyber-neon font-semibold">LocalStorage</span>
          </div>
          <div className="flex justify-between p-3 bg-cyber-black rounded">
            <span className="text-cyber-neon/70">Version</span>
            <span className="text-cyber-neon font-semibold">v2.0.77</span>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <SettingsIcon className="w-5 h-5 text-cyber-neon" />
          <h3 className="text-xl font-bold text-cyber-neon">Preferences</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-cyber-black rounded-lg">
            <div>
              <p className="text-cyber-neon font-semibold">Sound Effects</p>
              <p className="text-sm text-cyber-neon/50">Enable audio feedback</p>
            </div>
            <button
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-14 h-7 rounded-full transition-all ${
                settings.soundEnabled ? 'bg-cyber-neon' : 'bg-cyber-gray'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-cyber-black transition-all ${
                  settings.soundEnabled ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="p-4 bg-cyber-black rounded-lg">
            <label className="block text-cyber-neon font-semibold mb-2">XP Multiplier</label>
            <p className="text-sm text-cyber-neon/50 mb-3">Boost XP gain for power mode</p>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={settings.xpMultiplier}
              onChange={(e) => updateSettings({ xpMultiplier: parseFloat(e.target.value) })}
              className="w-full accent-cyber-neon"
            />
            <div className="flex justify-between text-sm text-cyber-neon/70 mt-1">
              <span>1x</span>
              <span className="text-cyber-neon font-semibold">{settings.xpMultiplier}x</span>
              <span>3x</span>
            </div>
          </div>

          <div className="p-4 bg-cyber-black rounded-lg">
            <label className="block text-cyber-neon font-semibold mb-2">Daily Reset Time</label>
            <p className="text-sm text-cyber-neon/50 mb-3">When your daily goals reset</p>
            <input
              type="time"
              value={settings.dailyGoalTime}
              onChange={(e) => updateSettings({ dailyGoalTime: e.target.value })}
              className="w-full px-4 py-2 bg-cyber-darker border border-cyber-neon/30 focus:border-cyber-neon rounded text-cyber-neon outline-none"
            />
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-5 h-5 text-cyber-neon" />
          <h3 className="text-xl font-bold text-cyber-neon">Data Management</h3>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleExportData}
            className="w-full px-4 py-3 bg-cyber-blue/20 border-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/30 font-semibold rounded transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export Data
          </button>

          <label className="block w-full px-4 py-3 bg-cyber-purple/20 border-2 border-cyber-purple text-cyber-purple hover:bg-cyber-purple/30 font-semibold rounded transition-all cursor-pointer text-center">
            <div className="flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" />
              Import Data
            </div>
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-cyber-dark border-2 border-cyber-red rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trash2 className="w-5 h-5 text-cyber-red" />
          <h3 className="text-xl font-bold text-cyber-red">Danger Zone</h3>
        </div>

        <p className="text-sm text-cyber-neon/70 mb-4">
          Reset all data including habits, logs, and settings. This action cannot be undone.
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full px-4 py-3 bg-cyber-red/20 border-2 border-cyber-red text-cyber-red hover:bg-cyber-red/30 font-semibold rounded transition-all"
          >
            Reset All Data
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-cyber-red font-semibold text-center mb-2">
              Are you absolutely sure?
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-3 bg-cyber-gray hover:bg-cyber-gray/70 text-cyber-neon font-semibold rounded transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-3 bg-cyber-red hover:bg-cyber-red/80 text-cyber-black font-semibold rounded transition-all"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
