
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Mic, Circle, Volume2 } from 'lucide-react';
import { toast } from "sonner";

interface Kid {
  id: number;
  name: string;
  color: string;
  avatar: string;
}

interface VoiceNoteProps {
  selectedKid: number | null;
  kids: Kid[];
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
}

const VoiceNote: React.FC<VoiceNoteProps> = ({ 
  selectedKid, 
  kids, 
  isRecording, 
  setIsRecording 
}) => {
  const [isVoiceDialogOpen, setIsVoiceDialogOpen] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceMessages, setVoiceMessages] = useState([
    { id: 1, type: 'received', duration: '0:15', time: '10 mins ago', from: 'Sophie' },
    { id: 2, type: 'sent', duration: '0:12', time: '8 mins ago' },
    { id: 3, type: 'received', duration: '0:08', time: '5 mins ago', from: 'Jake' },
  ]);

  const selectedKidInfo = kids.find(k => k.id === selectedKid);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 30) {
          clearInterval(interval);
          handleStopRecording();
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    const newVoiceMessage = {
      id: Date.now(),
      type: 'sent' as const,
      duration: `0:${recordingTime.toString().padStart(2, '0')}`,
      time: 'Just now'
    };
    setVoiceMessages(prev => [...prev, newVoiceMessage]);
    toast.success('Voice note sent');
    setIsVoiceDialogOpen(false);
    setRecordingTime(0);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Target Selection */}
        {selectedKid ? (
          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm text-gray-600">Voice chat with:</span>
            <Badge 
              variant="outline" 
              className="text-gray-700 border-gray-300 bg-gray-100"
            >
              {selectedKidInfo?.avatar} {selectedKidInfo?.name}
            </Badge>
          </div>
        ) : (
          <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-sm text-gray-500">Select a kid to send voice notes</p>
          </div>
        )}

        {/* Voice Messages */}
        <div className="flex flex-col h-[200px]">
          <div className="flex-1 overflow-y-auto space-y-2 mb-3 px-1">
            {kids.length === 0 ? (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">No voice notes yet</p>
              </div>
            ) : (
              voiceMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-3 py-2 ${
                      msg.type === 'sent'
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Volume2 className={`w-4 h-4 ${msg.type === 'sent' ? 'text-white' : 'text-gray-600'}`} />
                      <span className="text-sm font-medium">{msg.duration}</span>
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        msg.type === 'sent' ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Record Button */}
        <Button
          onClick={() => setIsVoiceDialogOpen(true)}
          disabled={!selectedKid}
          className="w-full bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white"
        >
          <Mic className="w-5 h-5 mr-2" />
          Record Voice Note
        </Button>
      </div>

      {/* Voice Recording Dialog */}
      <Dialog open={isVoiceDialogOpen} onOpenChange={setIsVoiceDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Voice Note</DialogTitle>
            <DialogDescription>
              {isRecording ? 'Recording...' : 'Tap the button to start recording (max 30s)'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-6 p-6">
            <button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                isRecording 
                  ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {isRecording ? (
                <Circle className="w-8 h-8 text-white fill-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </button>
            {isRecording && (
              <div className="text-2xl font-bold text-gray-800">
                0:{recordingTime.toString().padStart(2, '0')}
              </div>
            )}
            <p className="text-sm text-gray-600">
              {isRecording ? 'Tap to stop and send' : 'Tap to start recording'}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VoiceNote;
