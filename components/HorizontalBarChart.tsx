'use client'

import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BarChartProps {
  data: { name: string; value: number }[];
  colors: string[];
  title: string;
}

const HorizontalBarChart: React.FC<BarChartProps> = ({ data, colors, title }) => {
  const setHoveredItem = useState<number | null>(null)[1];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="relative h-10 overflow-hidden bg-gray-200">
        {data.map((item, index) => {
          const width = (item.value / total) * 100;
          const left = data.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.value / total) * 100, 0);
          return (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="absolute top-0 h-full cursor-pointer"
                    style={{
                      width: `${width}%`,
                      left: `${left}%`,
                      backgroundColor: colors[index],
                    }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                  <p>${item.value.toLocaleString()}</p>
                  <p>{(width).toFixed(2)}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      <div className="flex justify-between">
        {data.map((item, index) => (
          <div key={item.name} className="text-left">
            <div className="text-sm font-medium" style={{ color: colors[index] }}>{item.name}</div>
            <div className="text-xs text-gray-500">${item.value.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalBarChart;