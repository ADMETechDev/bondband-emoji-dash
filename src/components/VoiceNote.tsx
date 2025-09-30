
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Play, Pause, Send, Volume2 } from 'lucide-react';

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
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const demoVoiceNotes = [
    { from: "Sophie", duration: "0:15", time: "10m ago" },
    { from: "Jake", duration: "0:08", time: "15m ago" },
  ];
  const recentVoiceNotes = kids.length > 0 ? demoVoiceNotes : [];

  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const selectedKidInfo = kids.find(k => k.id === selectedKid);

  const startRecording = () => {
    if (!selectedKid) return;
    
    setIsRecording(true);
    setRecordingTime(0);
    
    // Simulate recording timer
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    // Here you would start actual audio recording
    console.log('Starting voice recording...');
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    
    // Simulate recorded audio
    setRecordedAudio(`recorded-audio-${Date.now()}`);
    console.log('Recording stopped');
  };

  const playRecording = () => {
    if (!recordedAudio) return;
    setIsPlaying(true);
    
    // Simulate playback
    setTimeout(() => {
      setIsPlaying(false);
    }, recordingTime * 1000);
    
    console.log('Playing recorded audio...');
  };

  const sendVoiceNote = () => {
    if (!recordedAudio || !selectedKid) return;
    
    const kid = kids.find(k => k.id === selectedKid);
    console.log(`Sending voice note to ${kid?.name}`);
    
    // Reset state
    setRecordedAudio(null);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Target Selection */}
      {selectedKid ? (
        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
          <span className="text-sm text-gray-600">Recording for:</span>
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

      {/* Recording Interface */}
      <div className="space-y-3">
        {isRecording && (
          <div className="text-center p-4 bg-gray-100 rounded-lg border border-gray-300">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">Recording...</span>
            </div>
            <div className="text-2xl font-mono text-gray-700">
              {formatTime(recordingTime)}
            </div>
          </div>
        )}

        {recordedAudio && !isRecording && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700 font-medium">Voice note ready</span>
              <span className="text-sm text-gray-600">{formatTime(recordingTime)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={playRecording}
                disabled={isPlaying}
                className="flex-1 border-gray-300 hover:bg-gray-50"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Playing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Preview
                  </>
                )}
              </Button>
              
              <Button
                size="sm"
                onClick={sendVoiceNote}
                className="flex-1 bg-gray-700 hover:bg-gray-800 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        )}

        {/* Record Button */}
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={!selectedKid}
          className={`w-full h-16 text-lg ${
            isRecording 
              ? 'bg-gray-700 hover:bg-gray-800' 
              : 'bg-gray-600 hover:bg-gray-700'
          } text-white`}
        >
          {isRecording ? (
            <>
              <MicOff className="w-6 h-6 mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-6 h-6 mr-2" />
              {recordedAudio ? 'Record New' : 'Start Recording'}
            </>
          )}
        </Button>
      </div>

      {/* Recent Voice Notes */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Voice Notes</h4>
        <div className="space-y-2">
          {recentVoiceNotes.length === 0 ? (
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-sm text-gray-500">No voice notes yet</p>
            </div>
          ) : (
            recentVoiceNotes.map((note, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">from {note.from}</span>
                  <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                    {note.duration}
                  </Badge>
                </div>
                <span className="text-xs text-gray-400">{note.time}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceNote;
