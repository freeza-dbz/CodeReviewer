import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import toast from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    fontSize: '14',
    defaultLanguage: 'javascript',
    aiModel: 'gpt-4o',
    notifications: true,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = async () => {
    setSaving(true);
    // mock save
    setTimeout(() => {
      setSaving(false);
      toast.success('Settings saved successfully!');
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your AI Code Reviewer experience.</p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-medium text-white mb-4">Appearance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Theme</label>
              <select name="theme" value={settings.theme} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Editor Font Size</label>
              <select name="fontSize" value={settings.fontSize} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-medium text-white mb-4">Review Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Default Language</label>
              <select name="defaultLanguage" value={settings.defaultLanguage} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Preferred AI Model</label>
              <select name="aiModel" value={settings.aiModel} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                <option value="gpt-4o">GPT-4o (Recommended)</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-medium text-white mb-4">Notifications</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              name="notifications" 
              checked={settings.notifications} 
              onChange={handleChange}
              className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-300">Enable email notifications for completed reviews</span>
          </label>
        </div>

        <div className="p-6 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-4">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary" onClick={handleSave} loading={saving}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
