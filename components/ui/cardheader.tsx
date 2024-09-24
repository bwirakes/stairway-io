// app/components/ui/CardHeader.tsx

import React from 'react';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex justify-between items-center mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default CardHeader;
