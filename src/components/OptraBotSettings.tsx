
import React from 'react';
import { X, Zap, RefreshCw, Key, Trash2 } from 'lucide-react';
import { apiLLMService } from '../utils/apiLlmService';

interface OptraBotSettingsProps {
  onClose: () => void;
  setIsLLMLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptraBotSettings: React.FC<OptraBotSettingsProps> = ({ onClose }) => {
  const [hasApiKey, setHasApiKey] = React.useState(false);

  React.useEffect(() => {
    const savedApiKey = apiLLMService.getApiKey();
    setHasApiKey(!!savedApiKey);
  }, []);

  const handleRemoveApiKey = () => {
    localStorage.removeItem('openai_api_key');
    setHasApiKey(false);
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gradient flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Bot Settings
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <h4 className="flex items-center gap-2 mb-2 font-medium text-blue-400">
            <Key className="w-4 h-4" />
            API Integration
          </h4>
          <p className="text-xs text-blue-300 mb-3">
            OptraBot now uses OpenAI's API for fast, intelligent responses. No heavy models loaded in your browser!
          </p>
          <div className="text-xs text-gray-300">
            Status: <span className={hasApiKey ? 'text-green-400' : 'text-yellow-400'}>
              {hasApiKey ? 'API Key Connected' : 'No API Key'}
            </span>
          </div>
          {hasApiKey && (
            <div className="mt-4">
              <button
                onClick={handleRemoveApiKey}
                className="w-full flex items-center justify-center gap-2 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-md transition-colors text-sm"
              >
                <Trash2 className="w-3 h-3" />
                Remove API Key
              </button>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <h4 className="font-medium mb-2 text-green-300">Performance</h4>
          <p className="text-xs text-green-400">
            Lightning fast responses using cloud APIs. No more waiting for models to load!
          </p>
        </div>
        
        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <h4 className="font-medium mb-2 text-purple-300">Privacy</h4>
          <p className="text-xs text-purple-400">
            Your API key is stored locally in your browser. Conversations go directly to the AI provider you choose.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OptraBotSettings;
