
import React from 'react';
import { MapPin } from 'lucide-react';

interface Kid {
  id: number;
  name: string;
  color: string;
  location: { lat: number; lng: number; address: string };
  avatar: string;
}

interface MapViewProps {
  kids: Kid[];
  selectedKid: number | null;
}

const MapView: React.FC<MapViewProps> = ({ kids, selectedKid }) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-green-200 via-blue-200 to-purple-200"></div>
        {/* Grid lines to simulate map */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div key={i}>
              <div 
                className="absolute w-full h-px bg-white/30"
                style={{ top: `${i * 10}%` }}
              />
              <div 
                className="absolute h-full w-px bg-white/30"
                style={{ left: `${i * 10}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Kid Markers */}
      {kids.map((kid, index) => {
        const isSelected = selectedKid === kid.id;
        // Simulate different positions on the map
        const positions = [
          { top: '20%', left: '25%' },
          { top: '60%', left: '70%' },
          { top: '40%', left: '40%' },
          { top: '75%', left: '20%' }
        ];
        
        return (
          <div
            key={kid.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              isSelected ? 'scale-125 z-20' : 'z-10'
            }`}
            style={positions[index]}
          >
            {/* Pulse animation */}
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: `${kid.color}40` }}
            />
            
            {/* Main marker */}
            <div 
              className={`relative w-10 h-10 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-lg ${
                isSelected ? 'ring-4 ring-purple-300' : ''
              }`}
              style={{ backgroundColor: kid.color }}
            >
              {kid.avatar}
            </div>

            {/* Name label */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 whitespace-nowrap shadow-sm">
              {kid.name}
            </div>
          </div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-white/90 transition-colors">
          +
        </button>
        <button className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-white/90 transition-colors">
          -
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <MapPin className="w-3 h-3" />
          <span>Live GPS Tracking</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
