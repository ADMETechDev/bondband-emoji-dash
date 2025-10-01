import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, Battery, MapPin, Clock, Navigation, MessageSquare, Mic, Circle } from 'lucide-react';
import { toast } from "sonner";

const EmergencyView = () => {
  const { kidId } = useParams();
  const navigate = useNavigate();
  const [isEmojiDialogOpen, setIsEmojiDialogOpen] = useState(false);
  const [isVoiceDialogOpen, setIsVoiceDialogOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'received', content: '👋', time: '10 mins ago', isEmoji: true },
    { id: 2, type: 'sent', content: '❤️', time: '8 mins ago', isEmoji: true },
    { id: 3, type: 'received', content: '🏃', time: '7 mins ago', isEmoji: true },
    { id: 4, type: 'sent', content: '👍', time: '5 mins ago', isEmoji: true },
    { id: 5, type: 'sent', content: '📍', time: '3 mins ago', isEmoji: true },
    { id: 6, type: 'received', content: '🚨', time: '2 mins ago', isEmoji: true },
    { id: 7, type: 'sent', content: '❤️', time: '1 min ago', isEmoji: true },
  ]);

  // Demo kid data - in production this would come from your data store
  const kid = {
    id: 2,
    name: "Alex",
    age: 10,
    color: "#888888",
    location: { lat: 40.7614, lng: -73.9776, address: "Times Square, NYC" },
    battery: 92,
    lastSeen: "1 min ago",
    status: "PANIC",
    avatar: "👦",
    isPanic: true
  };

  const distanceToKid = "0.8 miles"; // Mock distance
  const estimatedTime = "12 min walk";

  const recentVoiceNotes = [
    { id: 1, duration: '0:15', time: '3 mins ago' },
    { id: 2, duration: '0:22', time: '8 mins ago' },
  ];

  const quickEmojis = ['👍', '❤️', '🏃', '📍', '🚨', '✅', '👋', '🙏', '💪', '🏠', '🚗', '⚠️'];

  const handleSendEmoji = (emoji: string) => {
    const newMessage = {
      id: Date.now(),
      type: 'sent' as const,
      content: emoji,
      time: 'Just now',
      isEmoji: true
    };
    setChatMessages(prev => [...prev, newMessage]);
    toast.success(`Sent ${emoji} to ${kid.name}`);
    setIsEmojiDialogOpen(false);
  };

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
    toast.success(`Voice note sent to ${kid.name}`);
    setIsVoiceDialogOpen(false);
    setRecordingTime(0);
  };

  return (
    <div className="min-h-screen bg-red-50">
      {/* Emergency Header */}
      <header className="bg-red-600 text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-white hover:bg-red-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <Badge className="bg-white text-red-600 font-bold animate-pulse">
              🚨 EMERGENCY MODE
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
              {kid.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{kid.name}'s Emergency Alert</h1>
              <p className="text-red-100">Last seen: {kid.lastSeen}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-red-200 bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Distance</p>
                  <p className="text-lg font-bold text-gray-800">{distanceToKid}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Est. Time</p>
                  <p className="text-lg font-bold text-gray-800">{estimatedTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Battery className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Battery</p>
                  <p className="text-lg font-bold text-gray-800">{kid.battery}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Emergency Map */}
          <div className="lg:col-span-2">
            <Card className="h-[500px] border-red-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg text-gray-800">
                  <MapPin className="w-5 h-5 mr-2 text-red-600" />
                  Live Location & Directions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 h-full">
                <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                  {/* Simulated Map Background */}
                  <div className="absolute inset-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-150"></div>
                    {/* Street grid */}
                    <div className="absolute inset-0">
                      {[15, 25, 40, 55, 70, 85].map((pos, i) => (
                        <div 
                          key={`h-${i}`}
                          className="absolute w-full h-1 bg-white"
                          style={{ top: `${pos}%` }}
                        />
                      ))}
                      {[20, 35, 50, 65, 80].map((pos, i) => (
                        <div 
                          key={`v-${i}`}
                          className="absolute h-full w-1 bg-white"
                          style={{ left: `${pos}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Emergency Marker */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ top: '60%', left: '70%' }}
                  >
                    <div className="absolute inset-0 rounded-full animate-ping bg-red-600 opacity-75" />
                    <div className="relative w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-2xl bg-red-600 animate-pulse">
                      {kid.avatar}
                    </div>
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg">
                      🚨 {kid.name} - SOS
                    </div>
                  </div>

                  {/* Your Location */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ top: '30%', left: '40%' }}
                  >
                    <div className="w-12 h-12 rounded-full border-4 border-blue-600 bg-blue-500 shadow-lg flex items-center justify-center">
                      <Navigation className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap shadow-sm">
                      You
                    </div>
                  </div>

                  {/* Direction Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                    <line
                      x1="40%"
                      y1="30%"
                      x2="70%"
                      y2="60%"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeDasharray="10,5"
                      className="animate-pulse"
                    />
                  </svg>

                  {/* Get Directions Button */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Communication Panel */}
          <div className="space-y-4">
            {/* BondBand Status */}
            <Card className="border-red-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">BondBand Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Battery</span>
                  <div className="flex items-center space-x-2">
                    <Battery className="w-4 h-4 text-gray-800" />
                    <span className="font-bold text-gray-800">{kid.battery}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Ping</span>
                  <span className="font-bold text-gray-800">{kid.lastSeen}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Location</span>
                  <span className="text-xs text-gray-600">{kid.location.address}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <Badge className="bg-red-100 text-red-800 border-red-300 w-full justify-center">
                    Emergency Mode Active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Chat Messages */}
            <Card className="border-red-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between text-gray-800">
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-gray-600" />
                    Chat with {kid.name}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-[280px]">
                  {/* Messages Container */}
                  <div className="flex-1 overflow-y-auto space-y-2 mb-3 px-1">
                    {chatMessages.map((msg) => (
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
                          <div className={msg.isEmoji ? 'text-3xl' : 'text-sm'}>
                            {msg.content}
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
                    ))}
                  </div>
                  
                  {/* Send Button */}
                  <Button 
                    className="w-full bg-gray-800 hover:bg-gray-700"
                    onClick={() => setIsEmojiDialogOpen(true)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Quick Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Voice Notes */}
            <Card className="border-red-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-gray-800">
                  <Mic className="w-5 h-5 mr-2 text-gray-600" />
                  Recent Voice Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentVoiceNotes.map((note) => (
                    <div key={note.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Mic className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{note.duration}</span>
                      </div>
                      <span className="text-xs text-gray-500">{note.time}</span>
                    </div>
                  ))}
                  <Button 
                    className="w-full mt-2 bg-gray-800 hover:bg-gray-700"
                    onClick={() => setIsVoiceDialogOpen(true)}
                  >
                    Record Voice Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quick Message Dialog */}
      <Dialog open={isEmojiDialogOpen} onOpenChange={setIsEmojiDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Quick Message to {kid.name}</DialogTitle>
            <DialogDescription>
              Send a quick emoji message to let them know you're coming
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-3 p-4">
            {quickEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleSendEmoji(emoji)}
                className="text-4xl p-4 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Voice Note Dialog */}
      <Dialog open={isVoiceDialogOpen} onOpenChange={setIsVoiceDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Voice Note for {kid.name}</DialogTitle>
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
    </div>
  );
};

export default EmergencyView;
