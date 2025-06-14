
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Battery, MapPin, Clock } from 'lucide-react';

interface Kid {
  id: number;
  name: string;
  age: number;
  color: string;
  location: { lat: number; lng: number; address: string };
  battery: number;
  lastSeen: string;
  status: string;
  avatar: string;
}

interface KidProfileProps {
  kid: Kid;
  isSelected: boolean;
  onSelect: () => void;
}

const KidProfile: React.FC<KidProfileProps> = ({ kid, isSelected, onSelect }) => {
  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-500';
    if (battery > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'playing': return 'bg-green-100 text-green-700 border-green-200';
      case 'walking': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resting': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'exploring': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
        isSelected ? 'border-purple-400 shadow-lg' : 'border-white/30 hover:border-purple-200'
      } bg-white/70 backdrop-blur-sm`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${kid.color}20`, border: `2px solid ${kid.color}` }}
          >
            {kid.avatar}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{kid.name}</h3>
            <p className="text-sm text-gray-600">Age {kid.age}</p>
          </div>
          <div 
            className="w-4 h-4 rounded-full animate-pulse"
            style={{ backgroundColor: kid.color }}
          />
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Battery className={`w-4 h-4 ${getBatteryColor(kid.battery)}`} />
              <span className="text-gray-600">{kid.battery}%</span>
            </div>
            <Badge variant="outline" className={getStatusColor(kid.status)}>
              {kid.status}
            </Badge>
          </div>

          <div className="flex items-center space-x-1 text-gray-600">
            <MapPin className="w-3 h-3" />
            <span className="truncate text-xs">{kid.location.address}</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="w-3 h-3" />
            <span className="text-xs">{kid.lastSeen}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KidProfile;
