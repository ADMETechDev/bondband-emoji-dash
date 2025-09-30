
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Heart } from 'lucide-react';

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
  const demoMessages = [
    { from: "Emma", emoji: "❤️", time: "2m ago" },
    { from: "Alex", emoji: "🎮", time: "5m ago" },
  ];
  const recentMessages = kids.length > 0 ? demoMessages : [];

  const emojis = [
    { emoji: "❤️", label: "Love" },
    { emoji: "👋", label: "Hi" },
    { emoji: "🎮", label: "Play" },
    { emoji: "🍎", label: "Hungry" },
    { emoji: "😴", label: "Tired" },
    { emoji: "🏃", label: "Running" },
    { emoji: "📚", label: "Study" },
    { emoji: "🎉", label: "Happy" },
    { emoji: "🚗", label: "Car" },
    { emoji: "🏠", label: "Home" },
    { emoji: "⚽", label: "Sports" },
    { emoji: "🎵", label: "Music" },
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

      {/* Emoji Grid */}
      <div className="grid grid-cols-4 gap-2">
        {emojis.map((item) => (
          <button
            key={item.emoji}
            className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
              selectedEmoji === item.emoji
                ? 'border-gray-600 bg-gray-100 shadow-md'
                : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedEmoji(item.emoji)}
            disabled={!selectedKid}
          >
            <div className="text-2xl mb-1">{item.emoji}</div>
            <div className="text-xs text-gray-600">{item.label}</div>
          </button>
        ))}
      </div>

      {/* Send Button */}
      <Button
        onClick={handleSendEmoji}
        disabled={!selectedEmoji || !selectedKid}
        className="w-full bg-black hover:bg-gray-800 disabled:opacity-50 text-white"
      >
        <Send className="w-4 h-4 mr-2" />
        Send {selectedEmoji}
      </Button>

      {/* Recent Messages */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Messages</h4>
        <div className="space-y-2">
          {recentMessages.length === 0 ? (
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-sm text-gray-500">No messages yet</p>
            </div>
          ) : (
            recentMessages.map((msg, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{msg.emoji}</span>
                  <span className="text-sm text-gray-600">from {msg.from}</span>
                </div>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmojiPanel;
