
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, Mic, MicOff, Volume2, Users, Zap } from 'lucide-react';
import KidProfile from '../components/KidProfile';
import MapView from '../components/MapView';
import EmojiPanel from '../components/EmojiPanel';
import FistbumpFeed from '../components/FistbumpFeed';
import VoiceNote from '../components/VoiceNote';

const Index = () => {
  const [selectedKid, setSelectedKid] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const kids = [
    {
      id: 1,
      name: "Emma",
      age: 8,
      color: "#FF6B9D",
      location: { lat: 40.7128, lng: -74.0060, address: "Central Park, NYC" },
      battery: 85,
      lastSeen: "2 mins ago",
      status: "playing",
      avatar: "👧"
    },
    {
      id: 2,
      name: "Alex",
      age: 10,
      color: "#4ECDC4",
      location: { lat: 40.7614, lng: -73.9776, address: "Times Square, NYC" },
      battery: 92,
      lastSeen: "1 min ago",
      status: "walking",
      avatar: "👦"
    },
    {
      id: 3,
      name: "Sophie",
      age: 6,
      color: "#45B7D1",
      location: { lat: 40.7505, lng: -73.9934, address: "Bryant Park, NYC" },
      battery: 78,
      lastSeen: "5 mins ago",
      status: "resting",
      avatar: "👧"
    },
    {
      id: 4,
      name: "Jake",
      age: 9,
      color: "#96CEB4",
      location: { lat: 40.7589, lng: -73.9851, address: "Rockefeller Center, NYC" },
      battery: 65,
      lastSeen: "3 mins ago",
      status: "exploring",
      avatar: "👦"
    }
  ];

  const [recentFistbumps, setRecentFistbumps] = useState([
    {
      id: 1,
      kid1: "Emma",
      kid2: "Alex",
      time: "5 mins ago",
      color1: "#FF6B9D",
      color2: "#4ECDC4",
      blendedColor: "#B284B4"
    },
    {
      id: 2,
      kid1: "Sophie",
      kid2: "Jake",
      time: "12 mins ago",
      color1: "#45B7D1",
      color2: "#96CEB4",
      blendedColor: "#6DC7B2"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BondBand
              </h1>
              <p className="text-sm text-gray-600">Family Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Users className="w-3 h-3 mr-1" />
              4 Kids Online
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Kids Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kids.map((kid) => (
            <KidProfile
              key={kid.id}
              kid={kid}
              isSelected={selectedKid === kid.id}
              onSelect={() => setSelectedKid(selectedKid === kid.id ? null : kid.id)}
            />
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map View */}
          <div className="lg:col-span-2">
            <Card className="h-96 overflow-hidden shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Live Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <MapView kids={kids} selectedKid={selectedKid} />
              </CardContent>
            </Card>
          </div>

          {/* Communication Panel */}
          <div className="space-y-4">
            {/* Emoji Communication */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Send Message</CardTitle>
              </CardHeader>
              <CardContent>
                <EmojiPanel selectedKid={selectedKid} kids={kids} />
              </CardContent>
            </Card>

            {/* Voice Notes */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Mic className="w-5 h-5 mr-2 text-purple-600" />
                  Voice Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VoiceNote
                  selectedKid={selectedKid}
                  kids={kids}
                  isRecording={isRecording}
                  setIsRecording={setIsRecording}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fistbump Activity Feed */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Zap className="w-5 h-5 mr-2 text-yellow-600" />
              Recent Fistbumps & Color Blends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FistbumpFeed fistbumps={recentFistbumps} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
