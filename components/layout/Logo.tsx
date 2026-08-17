import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showTagline = false, 
  className = '',
  variant = 'default'
}) => {
  const sizes = {
    sm: { text: 20, tagline: 9, width: 270, height: showTagline ? 65 : 40 },
    md: { text: 28, tagline: 11, width: 380, height: showTagline ? 80 : 50 },
    lg: { text: 36, tagline: 13, width: 490, height: showTagline ? 95 : 60 },
    xl: { text: 44, tagline: 15, width: 600, height: showTagline ? 110 : 70 },
  };

  const colors = variant === 'white' 
    ? { gorka: '#FFFFFF', english: '#FFFFFF', tagline: '#DDDDDD' }
    : { gorka: '#F01428', english: '#000000', tagline: '#666666' };

  const { text, tagline, width, height } = sizes[size];
  const yPosition = text * 0.75;
  // Calculate exact width - each character is roughly 0.6 * text size
  const gorkaWidth = text * 3.65;
  const taglineY = text + 22;

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox={`0 0 ${width} ${height}`} 
      width={width} 
      height={height}
      className={className}
    >
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
        </style>
      </defs>
      
      {/* GORKA (Red) */}
      <text 
        x="0" 
        y={yPosition} 
        fontFamily="Inter, sans-serif" 
        fontWeight="700" 
        fontSize={text} 
        fill={colors.gorka} 
        letterSpacing="0"
      >
        GORKA
      </text>
      
      {/* ENGLISH (Black) - adjusted to touch GORKA */}
      <text 
        x={gorkaWidth} 
        y={yPosition} 
        fontFamily="Inter, sans-serif" 
        fontWeight="700" 
        fontSize={text} 
        fill={colors.english} 
        letterSpacing="0"
      >
        ENGLISH
      </text>
      
      {/* Tagline */}
      {showTagline && (
        <text 
          x="0" 
          y={taglineY} 
          fontFamily="Inter, sans-serif" 
          fontWeight="400" 
          fontSize={tagline} 
          fill={colors.tagline} 
          letterSpacing="2"
        >
          REAL CONVERSATIONS · REAL CONFIDENCE
        </text>
      )}
    </svg>
  );
};

export default Logo;