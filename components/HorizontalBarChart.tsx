'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BarChartProps {
  data: { name: string; value: number }[];
  colors: string[];
  title: string;
}

const HorizontalBarChart: React.FC<BarChartProps> = ({ data, colors, title }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [visibleLabels, setVisibleLabels] = useState<number[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.value - a.value);
  }, [data]);

  const total = useMemo(() => {
    return sortedData.reduce((sum, item) => sum + item.value / 100, 0);
  }, [sortedData]);

  useEffect(() => {
    const updateVisibleLabels = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      let currentWidth = 0;
      const newVisibleLabels: number[] = [];

      labelRefs.current.forEach((ref, index) => {
        if (ref) {
          const labelWidth = ref.offsetWidth;
          if (currentWidth + labelWidth <= containerWidth) {
            newVisibleLabels.push(index);
            currentWidth += labelWidth;
          }
        }
      });

      setVisibleLabels(newVisibleLabels);
    };

    updateVisibleLabels();
    window.addEventListener('resize', updateVisibleLabels);
    return () => window.removeEventListener('resize', updateVisibleLabels);
  }, [sortedData]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold truncate" title={title}>{title}</h3>
      <div className="relative h-10 overflow-hidden bg-gray-200">
        {sortedData.map((item, index) => {
          const adjustedValue = item.value / 100;
          const width = (adjustedValue / total) * 100;
          const left = sortedData.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.value / 100 / total) * 100, 0);
          return (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="absolute top-0 h-full cursor-pointer transition-opacity duration-200"
                    style={{
                      width: `${width}%`,
                      left: `${left}%`,
                      background: `linear-gradient(135deg, ${colors[index % colors.length]} 0%, ${lightenColor(colors[index % colors.length], 20)} 100%)`,
                      opacity: hoveredItem === index || hoveredItem === null ? 1 : 0.7,
                    }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                  <p>${adjustedValue.toLocaleString()}</p>
                  <p>{width.toFixed(2)}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-between" ref={containerRef}>
        {sortedData.map((item, index) => {
          const adjustedValue = item.value / 100;
          const percentage = (adjustedValue / total) * 100;
          return (
            <div
              key={item.name}
              className={`text-left ${visibleLabels.includes(index) ? '' : 'hidden'}`}
              ref={el => {
                if (el) {
                  labelRefs.current[index] = el;
                }
              }}
            >
              <div className="text-sm font-medium truncate max-w-[100px]" style={{ color: colors[index % colors.length] }} title={item.name}>
                {item.name}
              </div>
              <div className="text-xs text-gray-500">{percentage.toFixed(2)}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to lighten a color
function lightenColor(color: string, amount: number): string {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

export default HorizontalBarChart;