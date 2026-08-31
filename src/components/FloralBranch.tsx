import React from "react";

export default function FloralBranch({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg 
      className={className} 
      style={style}
      viewBox="0 0 200 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Branch Stem */}
      <path d="M100 300 Q90 150 150 0" stroke="#4a5b52" strokeWidth="2" strokeLinecap="round"/>
      
      {/* Leaves */}
      {/* Dark green leaves */}
      <path d="M110 250 Q130 240 140 260 Q120 270 110 250 Z" fill="#637669" />
      <path d="M95 200 Q75 190 65 210 Q85 220 95 200 Z" fill="#637669" />
      <path d="M115 150 Q145 130 150 160 Q130 180 115 150 Z" fill="#637669" />
      <path d="M105 80 Q80 60 70 90 Q90 110 105 80 Z" fill="#637669" />
      
      {/* Light green leaves */}
      <path d="M95 270 Q75 260 70 280 Q90 290 95 270 Z" fill="#b0c4b1" />
      <path d="M125 190 Q155 180 160 210 Q140 220 125 190 Z" fill="#b0c4b1" />
      <path d="M85 130 Q60 120 50 150 Q75 160 85 130 Z" fill="#b0c4b1" />
      <path d="M135 60 Q160 50 170 80 Q150 90 135 60 Z" fill="#b0c4b1" />

      {/* Cream/Yellow-ish leaves */}
      <path d="M115 220 Q135 200 150 225 Q125 240 115 220 Z" fill="#e2deb6" />
      <path d="M90 170 Q70 150 55 175 Q80 190 90 170 Z" fill="#e2deb6" />
      <path d="M125 100 Q145 80 160 105 Q135 120 125 100 Z" fill="#e2deb6" />
      <path d="M100 30 Q120 10 140 30 Q120 50 100 30 Z" fill="#e2deb6" />
    </svg>
  );
}
