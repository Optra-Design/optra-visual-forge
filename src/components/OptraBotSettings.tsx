
import React from 'react';
import { X, Brain, RefreshCw } from 'lucide-react';
import { freeLLMService } from '../utils/freeLlmService';

interface OptraBotSettingsProps {
  onClose: () => void;
  setIsLLMLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptraBotSettings: React.FC<OptraBotSettingsProps> = ({ onClose, setIsLLMLoaded }) => {
  const [isReinitializing, setIsReinitializing] = React.useState(false);

  const handleReloadModel = async () => {
    setIsReinitializing(true);
    try {
      const success = await freeLLMService.initialize();
      setIsLLMLoaded(success);
    } catch (error) {
      console.error("Failed to reinitialize model:", error);
    } finally {
      setIsReinitializing(false);
    }
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gradient flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Bot Settings
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-foreground/60 hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <h4 className="flex items-center gap-2 mb-2 font-medium text-blue-400">
            <Brain className="w-4 h-4" />
            Open Source LLM
          </h4>
          <p className="text-xs text-blue-300 mb-3">
            OptraBot now uses a free and open-source language model that runs directly in your browser. No API keys or server calls needed!
          </p>
          <div className="text-xs text-foreground/70">
            Model: <span className="text-white">Qwen2.5-0.5B-Instruct</span>
          </div>
          <div className="mt-4">
            <button
              onClick={handleReloadModel}
              disabled={isReinitializing}
              className="w-full flex items-center justify-center gap-2 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-md transition-colors text-sm disabled:opacity-50"
            >
              {isReinitializing ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-300"></div>
                  Reloading...
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3" />
                  Reload Model
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-gray-500/10 rounded-lg border border-gray-500/20">
          <h4 className="font-medium mb-2 text-gray-300">Performance</h4>
          <p className="text-xs text-gray-400">
            The chat is optimized to use minimal resources. The LLM model is loaded only when you first interact with the bot.
          </p>
        </div>
        
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <h4 className="font-medium mb-2 text-green-300">Privacy</h4>
          <p className="text-xs text-green-400">
            All processing happens locally in your browser. Your conversations are not sent to any server or stored in any database.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OptraBotSettings;
