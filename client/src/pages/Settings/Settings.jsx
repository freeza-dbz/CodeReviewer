import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import toast from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import { updateSettings } from '../../api/userApi';

const Settings = () => {
  const { theme, setTheme: setGlobalTheme } = useContext(ThemeContext);
  const { user, updateUser } = useAuth();
  
  const [settings, setSettings] = useState({
    theme: theme || 'dark',
    aiModel: 'gemini-3.5-flash',
    apiKey: '',
    notifications: true,
  });
  
  useEffect(() => {
    if (user) {
      setSettings((prev) => ({
        ...prev,
        theme: user.theme || prev.theme,
        aiModel: user.preferredModel || prev.aiModel,
        apiKey: user.apiKey || prev.apiKey,
      }));
    }
  }, [user]);

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateSettings({
        preferredModel: settings.aiModel,
        apiKey: settings.apiKey,
        theme: settings.theme,
      });
      setGlobalTheme(settings.theme);
      updateUser(res.data);
      toast.success('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
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
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-medium text-white mb-4">Review Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">LLM API Key</label>
              <textarea
                name="apiKey"
                value={settings.apiKey}
                onChange={handleChange}
                placeholder="Enter your API Key here..."
                rows={2}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Preferred AI Model</label>
              <textarea
                name="aiModel"
                value={settings.aiModel}
                onChange={handleChange}
                placeholder="gemini-3.5-flash"
                rows={2}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
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
