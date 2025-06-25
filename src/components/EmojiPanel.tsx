import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Heart, Hand, Gamepad2, Apple, Moon, Car, Home, Book, Music, Zap, Coffee } from 'lucide-react';

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
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [recentMessages, setRecentMessages] = useState([
    { from: "Emma", emoji: "heart", time: "2m ago" },
    { from: "Alex", emoji: "gamepad", time: "5m ago" },
  ]);

  const emojis = [
    { emoji: "heart", label: "Love", Icon: Heart },
    { emoji: "hand", label: "Hi", Icon: Hand },
    { emoji: "gamepad", label: "Play", Icon: Gamepad2 },
    { emoji: "apple", label: "Hungry", Icon: Apple },
    { emoji: "moon", label: "Tired", Icon: Moon },
    { emoji: "zap", label: "Running", Icon: Zap },
    { emoji: "book", label: "Study", Icon: Book },
    { emoji: "coffee", label: "Happy", Icon: Coffee },
    { emoji: "car", label: "Car", Icon: Car },
    { emoji: "home", label: "Home", Icon: Home },
    { emoji: "gamepad", label: "Sports", Icon: Gamepad2 },
    { emoji: "music", label: "Music", Icon: Music },
  ];

  const handleSendEmoji = () => {
    if (selectedEmoji && selectedKid) {
      const kid = kids.find(k => k.id === selectedKid);
      console.log(`Sending ${selectedEmoji} to ${kid?.name}`);
      setSelectedEmoji(null);
      // Here you would send the emoji to the selected kid
    }
  };

  const selectedKidInfo = kids.find(k => k.id === selectedKid);

  const getMessageIcon = (emoji: string) => {
    const emojiData = emojis.find(e => e.emoji === emoji);
    return emojiData?.Icon || Heart;
  };

  return (
    <div className="space-y-4">
      {/* Target Selection */}
      {selectedKid ? (
        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
          <span className="text-sm text-gray-600">Sending to:</span>
          <Badge 
            variant="outline" 
            className="text-gray-700 border-gray-300 bg-gray-100"
          >
            {selectedKidInfo?.avatar} {selectedKidInfo?.name}
          </Badge>
        </div>
      ) : (
        <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-sm text-gray-500">Select a kid to send emojis</p>
        </div>
      )}

      {/* Icon Grid */}
      <div className="grid grid-cols-4 gap-2">
        {emojis.map((item) => {
          const IconComponent = item.Icon;
          return (
            <button
              key={item.emoji}
              className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                selectedEmoji === item.emoji
                  ? 'border-gray-600 bg-gray-100 shadow-md'
                  : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedEmoji(item.emoji)}
              disabled={!selectedKid}
              aria-label={`Send ${item.label} message`}
            >
              <div className="flex flex-col items-center">
                <IconComponent className="w-6 h-6 mb-1 text-gray-700" />
                <div className="text-xs text-gray-600">{item.label}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Send Button */}
      <Button
        onClick={handleSendEmoji}
        disabled={!selectedEmoji || !selectedKid}
        className="w-full bg-black hover:bg-gray-800 disabled:opacity-50 text-white"
        aria-label="Send selected message"
      >
        <Send className="w-4 h-4 mr-2" />
        Send Message
      </Button>

      {/* Recent Messages */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Messages</h4>
        <div className="space-y-2">
          {recentMessages.map((msg, index) => {
            const MessageIcon = getMessageIcon(msg.emoji);
            return (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-2">
                  <MessageIcon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">from {msg.from}</span>
                </div>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmojiPanel;
