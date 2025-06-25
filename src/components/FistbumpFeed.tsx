
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Zap, Palette } from 'lucide-react';

interface Fistbump {
  id: number;
  kid1: string;
  kid2: string;
  time: string;
  color1: string;
  color2: string;
  blendedColor: string;
}

interface FistbumpFeedProps {
  fistbumps: Fistbump[];
}

const FistbumpFeed: React.FC<FistbumpFeedProps> = ({ fistbumps }) => {
  return (
    <div className="space-y-4">
      {fistbumps.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <Zap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No fistbumps yet today!</p>
          <p className="text-sm text-gray-400 mt-1">
            When kids fistbump, their colors will blend and create new combinations
          </p>
        </div>
      ) : (
        fistbumps.map((fistbump) => (
          <div
            key={fistbump.id}
            className="relative p-4 rounded-xl border-2 border-gray-200 bg-gray-50 hover:scale-105 transition-transform duration-300"
          >
            {/* Fistbump Animation Icon */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Zap className="w-4 h-4 text-white" />
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">👊</div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {fistbump.kid1} + {fistbump.kid2}
                  </div>
                  <div className="text-sm text-gray-600">{fistbump.time}</div>
                </div>
              </div>
            </div>

            {/* Color Blend Visualization */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                <div
                  className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: fistbump.color1 }}
                />
                <span className="text-xs text-gray-600">{fistbump.kid1}</span>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-0.5 bg-gray-400" />
                  <div className="w-2 h-0.5 bg-gray-400" />
                  <div className="w-2 h-0.5 bg-gray-400" />
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <div
                  className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: fistbump.color2 }}
                />
                <span className="text-xs text-gray-600">{fistbump.kid2}</span>
              </div>
            </div>

            {/* Blended Result */}
            <div className="flex items-center justify-center p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">New blend:</span>
                <div
                  className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-lg"
                  style={{ backgroundColor: fistbump.blendedColor }}
                />
                <Badge
                  variant="outline"
                  className="text-xs border-gray-400 text-gray-600 bg-gray-100"
                >
                  Color Shared!
                </Badge>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Info Banner */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">How Fistbumps Work</h4>
            <p className="text-sm text-gray-700">
              When kids wearing BondBand watches get close and fistbump, their NFC sensors detect each other. 
              The watches play a fun animation and blend their background colors, creating a unique shared color 
              that represents their friendship moment!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FistbumpFeed;
