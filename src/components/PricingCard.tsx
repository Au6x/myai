import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price?: number | string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "free" | "essentials" | "professional" | "enterprise";
  isPopular?: boolean;
  accentColor?: string;
}

const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant = "default",
  isPopular = false,
  accentColor
}: PricingCardProps) => {
  return (
    <div className={`relative bg-gradient-card rounded-2xl p-8 shadow-card border border-border transition-all duration-300 hover:shadow-glow ${isPopular ? 'ring-2 ring-primary' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        {price && (
          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-bold text-foreground">
              {typeof price === 'string' ? price : `$${price}`}
            </span>
            {period && <span className="text-muted-foreground ml-2">{period}</span>}
          </div>
        )}
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Button 
        variant={buttonVariant}
        className="w-full mb-8 transition-all duration-300 hover:shadow-button"
      >
        {buttonText}
      </Button>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Check className={`h-5 w-5 mt-0.5 ${accentColor ? `text-${accentColor}` : 'text-primary'}`} />
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;