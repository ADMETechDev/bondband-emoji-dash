
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Send, MessageSquare, MapPin } from 'lucide-react';
import { toast } from "sonner";

interface Kid {
  id: number;
  name: string;
  color: string;
  avatar: string;
}

interface EmojiPanelProps {
  selectedKid: number | null;
  kids: Kid[];
}

const EmojiPanel: React.FC<EmojiPanelProps> = ({ selectedKid, kids }) => {
  const [isEmojiDialogOpen, setIsEmojiDialogOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'received', content: '👋', time: '15 mins ago', isEmoji: true, from: 'Emma' },
    { id: 2, type: 'sent', content: '❤️', time: '12 mins ago', isEmoji: true },
    { id: 3, type: 'received', content: '🎮', time: '8 mins ago', isEmoji: true, from: 'Alex' },
    { id: 4, type: 'sent', content: '👍', time: '5 mins ago', isEmoji: true },
  ]);

  const quickEmojis = ['👍', '❤️', '🏃', '👋', '🎉', '🏠', '🚗', '📚', '🎮', '⚽', '🍎', '😴'];

  const handleSendEmoji = (emoji: string) => {
    const newMessage = {
      id: Date.now(),
      type: 'sent' as const,
      content: emoji,
      time: 'Just now',
      isEmoji: true
    };
    setChatMessages(prev => [...prev, newMessage]);
    toast.success(`Sent ${emoji}`);
    setIsEmojiDialogOpen(false);
  };

  const handleShareLocation = () => {
    if (selectedKid) {
      const kid = kids.find(k => k.id === selectedKid);
      toast.success(`Shared your location with ${kid?.name}`);
    } else {
      toast.success('Shared your location with all kids');
    }
  };

  const selectedKidInfo = kids.find(k => k.id === selectedKid);

  return (
    <>
      <div className="space-y-4">
        {/* Target Selection */}
        {selectedKid ? (
          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm text-gray-600">Chatting with:</span>
            <Badge 
              variant="outline" 
              className="text-gray-700 border-gray-300 bg-gray-100"
            >
              {selectedKidInfo?.avatar} {selectedKidInfo?.name}
            </Badge>
          </div>
        ) : (
          <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-sm text-gray-500">Select a kid to chat</p>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex flex-col h-[200px]">
          <div className="flex-1 overflow-y-auto space-y-2 mb-3 px-1">
            {kids.length === 0 ? (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">No messages yet</p>
              </div>
            ) : (
              chatMessages.map((msg) => (
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
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => setIsEmojiDialogOpen(true)}
            disabled={!selectedKid}
            className="flex-1 bg-black hover:bg-gray-800 disabled:opacity-50 text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          <Button
            onClick={handleShareLocation}
            variant="outline"
            className="border-gray-300 hover:bg-gray-50"
          >
            <MapPin className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Emoji Picker Dialog */}
      <Dialog open={isEmojiDialogOpen} onOpenChange={setIsEmojiDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Quick Message</DialogTitle>
            <DialogDescription>
              {selectedKid 
                ? `Send a quick emoji to ${selectedKidInfo?.name}`
                : 'Select an emoji to send'}
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
    </>
  );
};

export default EmojiPanel;
