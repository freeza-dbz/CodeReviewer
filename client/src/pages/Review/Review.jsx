import React, { useState, useEffect } from 'react';
import { Play, Activity } from 'lucide-react';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import FileExplorer from '../../components/FileExplorer/FileExplorer';
import UploadBox from '../../components/UploadBox/UploadBox';
import IssueList from '../../components/IssueList/IssueList';
import ReviewSummary from '../../components/ReviewSummary/ReviewSummary';
import Button from '../../components/Button/Button';
import { useUpload } from '../../hooks/useUpload';
import { useReview } from '../../hooks/useReview';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

const Review = () => {
  const { files, handleFileUpload } = useUpload();
  const { loading, result, analyzeCode } = useReview();
  const [activeFile, setActiveFile] = useState(null);
  const [code, setCode] = useState('// Paste or upload your code here...');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    if (files.length > 0 && !activeFile) {
      setActiveFile(files[0]);
    }
  }, [files, activeFile]);

  useEffect(() => {
    if (activeFile && activeFile.raw) {
      const reader = new FileReader();
      reader.onload = (e) => setCode(e.target.result);
      reader.readAsText(activeFile.raw);
      
      const ext = activeFile.name.split('.').pop();
      const lang = SUPPORTED_LANGUAGES.find(l => l.extension.includes(ext));
      if (lang) setLanguage(lang.id);
    }
  }, [activeFile]);

  const handleReview = () => {
    analyzeCode(code, language);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Code Review</h1>
        <div className="flex items-center gap-4">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
          <Button onClick={handleReview} loading={loading} className="shadow-lg shadow-blue-500/20">
            <Play className="w-4 h-4 mr-2" />
            Analyze Code
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left Panel: Explorer & Editor */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {files.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
               <UploadBox onFileUpload={handleFileUpload} />
            </div>
          ) : (
            <div className="flex-1 flex gap-4 overflow-hidden">
              <div className="w-64 bg-gray-900 border border-gray-800 rounded-xl overflow-y-auto">
                <div className="p-3 border-b border-gray-800 font-medium text-sm text-gray-300">Files</div>
                <FileExplorer files={files} activeFile={activeFile} onSelectFile={setActiveFile} />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden shadow-2xl">
                 <CodeEditor code={code} language={language} onChange={setCode} />
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Issues & Summary */}
        <div className="w-1/3 bg-gray-900 border border-gray-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 font-medium text-gray-200 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Analysis Results
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <p>Analyzing your code...</p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                <ReviewSummary stats={result.stats} summary={result.summary} />
                <IssueList issues={result.issues} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-center px-8">
                Run an analysis to see issues, suggestions, and security vulnerabilities here.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="mt-4 h-8 bg-gray-900 border border-gray-800 rounded-lg flex items-center px-4 text-xs text-gray-400 justify-between">
        <div className="flex items-center gap-4">
          <span>Language: <span className="text-gray-200 capitalize">{language}</span></span>
          {result && <span>Model: <span className="text-gray-200">{result.stats.model}</span></span>}
        </div>
        <div className="flex items-center gap-4">
          {result && <span>Tokens: <span className="text-gray-200">{result.stats.tokensUsed}</span></span>}
          {result && <span>Time: <span className="text-gray-200">{result.stats.responseTime}</span></span>}
          <span className="flex items-center gap-1">
            Status: {loading ? <span className="text-blue-400">Processing</span> : result ? <span className="text-green-400">Completed</span> : <span>Ready</span>}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Review;
