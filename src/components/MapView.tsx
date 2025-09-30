
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
  if (kids.length === 0) {
    return (
      <div className="relative w-full h-full bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center p-8">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No Devices to Track</p>
          <p className="text-sm text-gray-400 mt-2">Device locations will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Simulated Map Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-150"></div>
        {/* Street grid to simulate city map */}
        <div className="absolute inset-0">
          {/* Horizontal streets */}
          {[15, 25, 40, 55, 70, 85].map((pos, i) => (
            <div 
              key={`h-${i}`}
              className="absolute w-full h-1 bg-white"
              style={{ top: `${pos}%` }}
            />
          ))}
          {/* Vertical streets */}
          {[20, 35, 50, 65, 80].map((pos, i) => (
            <div 
              key={`v-${i}`}
              className="absolute h-full w-1 bg-white"
              style={{ left: `${pos}%` }}
            />
          ))}
          {/* City blocks */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gray-300 opacity-30"
                style={{
                  left: `${15 + (i % 4) * 20}%`,
                  top: `${20 + Math.floor(i / 4) * 15}%`,
                  width: `${8 + Math.random() * 6}%`,
                  height: `${6 + Math.random() * 4}%`,
                }}
              />
            ))}
          </div>
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
              className="absolute inset-0 rounded-full animate-ping opacity-50"
              style={{ backgroundColor: kid.color }}
            />
            
            {/* Main marker */}
            <div 
              className={`relative w-10 h-10 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-lg ${
                isSelected ? 'ring-4 ring-gray-400' : ''
              }`}
              style={{ backgroundColor: kid.color }}
            >
              {kid.avatar}
            </div>

            {/* Name label */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 whitespace-nowrap shadow-sm border border-gray-200">
              {kid.name}
            </div>
          </div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors border border-gray-200">
          +
        </button>
        <button className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors border border-gray-200">
          -
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <MapPin className="w-3 h-3" />
          <span>Live GPS Tracking</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
