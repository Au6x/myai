import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface UserSliderProps {
  onChange: (value: number) => void;
}

const UserSlider = ({ onChange }: UserSliderProps) => {
  const [sliderValue, setSliderValue] = useState([4]); // Index 4 = 2500 users
  
  const userValues = [500, 1000, 2500, 5000, 7500, 10000, 20000, 30000];
  const labels = ["500", "1000", "2,500", "5,000", "7,500", "10,000", "20,000", "30,000+"];
  
  const handleValueChange = (newValue: number[]) => {
    const index = Math.round(newValue[0]);
    setSliderValue([index]);
    onChange(userValues[index]);
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8 px-4">
        <Slider
          value={sliderValue}
          onValueChange={handleValueChange}
          max={7}
          min={0}
          step={1}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-between text-sm text-muted-foreground px-2">
        {labels.map((label, index) => (
          <div 
            key={label}
            className={`text-center transition-all duration-200 cursor-pointer ${
              index === sliderValue[0]
                ? 'text-primary font-semibold scale-110' 
                : 'hover:text-foreground'
            }`}
            onClick={() => handleValueChange([index])}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSlider;