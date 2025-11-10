import React from "react";

interface SpinnerProps {
  size?: number;        
  thickness?: number;  
  color?: string;  
  highlight?: string; 
  className?: string; 
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 64,
  thickness = 6,
  color = "border-gray-300",
  highlight = "border-t-purple-600",
  className = "",
}) => {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className={`mx-auto rounded-full animate-spin ${color} ${highlight} ${className}`}
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
      }}
    />
  );
};

export default Spinner;
//use this spinner component as <Spinner size={150} thickness={8} color="border-purple-200" highlight="border-t-purple-700" className="my-12" />
