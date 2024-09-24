import React from 'react';

interface BarChartProps {
  data: { name: string; value: number }[];
  colors: string[];
}

const HorizontalBarChart: React.FC<BarChartProps> = ({ data, colors }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      <div className="relative h-10 overflow-hidden bg-gray-200 rounded-full">
        {data.map((item, index) => {
          const width = (item.value / total) * 100;
          const left = data.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.value / total) * 100, 0);
          return (
            <div
              key={item.name}
              className="absolute top-0 h-full"
              style={{
                width: `${width}%`,
                left: `${left}%`,
                backgroundColor: colors[index],
              }}
            />
          );
        })}
      </div>
      <div className="flex justify-between">
        {data.map((item, index) => (
          <div key={item.name} className="text-right">
            <div className="text-sm font-medium" style={{ color: colors[index] }}>{item.name}</div>
            <div className="text-xs text-gray-500">${item.value.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalBarChart;