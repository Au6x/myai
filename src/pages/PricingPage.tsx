import { useState } from "react";
import Header from "@/components/Header";
import PricingCard from "@/components/PricingCard";
import UserSlider from "@/components/UserSlider";
import { Button } from "@/components/ui/button";

const PricingPage = () => {
  const [useCase, setUseCase] = useState<'B2C' | 'B2B'>('B2C');
  const [billing, setBilling] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [activeUsers, setActiveUsers] = useState(2500);

  // B2C vs B2B pricing logic with dynamic user-based calculations
  const getBasePricing = () => {
    const basePrice = useCase === 'B2C' ? { essentials: 35, professional: 240 } : { essentials: 50, professional: 350 };
    const yearlyDiscount = 0.2;
    
    // Calculate additional cost based on user count
    const userTiers = [500, 1000, 2500, 5000, 7500, 10000, 20000, 30000];
    const currentTierIndex = userTiers.findIndex(tier => activeUsers <= tier);
    const additionalCost = currentTierIndex >= 2 ? (currentTierIndex - 1) * (useCase === 'B2C' ? 10 : 15) : 0;
    
    return {
      essentials: billing === 'Monthly' 
        ? basePrice.essentials + additionalCost 
        : Math.round((basePrice.essentials + additionalCost) * (1 - yearlyDiscount)),
      professional: billing === 'Monthly' 
        ? basePrice.professional + (additionalCost * 2)
        : Math.round((basePrice.professional + (additionalCost * 2)) * (1 - yearlyDiscount)),
      userLimit: Math.min(activeUsers, useCase === 'B2C' ? 5000 : 10000)
    };
  };

  const pricing = getBasePricing();

  const pricingData = [
    {
      title: "Free",
      description: useCase === 'B2C' 
        ? "Perfect for personal projects and small apps." 
        : "Great for testing and proof-of-concepts.",
      features: [
        `Up to ${Math.min(activeUsers, 1000).toLocaleString()} monthly active users will have:`,
        "✓ Basic AI features",
        "✓ Community support",
        useCase === 'B2C' ? "✓ Personal use license" : "✓ Development environment"
      ],
      buttonText: "Start building for free",
      buttonVariant: "free" as const,
      accentColor: "free-accent"
    },
    {
      title: "Essentials",
      price: pricing.essentials,
      period: "/ month",
      description: useCase === 'B2C' 
        ? "For growing consumer applications." 
        : "For small business applications.",
      features: [
        `Up to ${Math.min(activeUsers, pricing.userLimit).toLocaleString()} monthly active users will have:`,
        "✓ Everything in Free, plus...",
        useCase === 'B2C' ? "✓ Advanced AI models" : "✓ Business analytics",
        useCase === 'B2C' ? "✓ Custom branding" : "✓ Team collaboration tools"
      ],
      buttonText: "Sign up",
      buttonVariant: "essentials" as const,
      isPopular: useCase === 'B2C',
      accentColor: "essentials-accent"
    },
    {
      title: "Professional", 
      price: pricing.professional,
      period: "/ month",
      description: useCase === 'B2C' 
        ? "For large-scale consumer apps with advanced needs." 
        : "For growing businesses that need enterprise features.",
      features: [
        `Up to ${Math.min(activeUsers, pricing.userLimit * 2).toLocaleString()} monthly active users will have:`,
        "✓ Everything in Essentials, plus...",
        useCase === 'B2C' ? "✓ Premium AI features" : "✓ Advanced security & compliance",
        useCase === 'B2C' ? "✓ Priority support" : "✓ API access & integrations"
      ],
      buttonText: "Sign up",
      buttonVariant: "professional" as const,
      isPopular: useCase === 'B2B',
      accentColor: "professional-accent"
    },
    {
      title: "Enterprise",
      description: useCase === 'B2C' 
        ? "For enterprise consumer applications with millions of users." 
        : "For large enterprises that need custom solutions and dedicated support.",
      features: [
        "Enterprise users will have:",
        "✓ Everything in Professional plus...",
        useCase === 'B2C' ? "✓ Unlimited scale" : "✓ Custom deployment options",
        useCase === 'B2C' ? "✓ White-label solutions" : "✓ Dedicated success manager"
      ],
      buttonText: "Contact us",
      buttonVariant: "enterprise" as const,
      accentColor: "enterprise-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="relative container mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Flexible pricing for{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              developers
            </span>{" "}
            &{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              companies
            </span>
          </h1>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Use Case Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">What is your use case?</h3>
              <div className="flex space-x-4">
                <Button
                  variant={useCase === 'B2C' ? 'default' : 'outline'}
                  onClick={() => setUseCase('B2C')}
                  className="px-8"
                >
                  B2C
                </Button>
                <Button
                  variant={useCase === 'B2B' ? 'default' : 'outline'}
                  onClick={() => setUseCase('B2B')}
                  className="px-8"
                >
                  B2B
                </Button>
              </div>
            </div>

            {/* Billing Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">Billing</h3>
              <div className="flex space-x-4">
                <Button
                  variant={billing === 'Monthly' ? 'default' : 'outline'}
                  onClick={() => setBilling('Monthly')}
                  className="px-8"
                >
                  Monthly
                </Button>
                <Button
                  variant={billing === 'Yearly' ? 'default' : 'outline'}
                  onClick={() => setBilling('Yearly')}
                  className="px-8"
                >
                  Yearly
                </Button>
              </div>
            </div>
          </div>

          {/* User Slider */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <h3 className="text-xl font-semibold text-foreground">How many monthly active users?</h3>
              <div className="w-5 h-5 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                <span className="text-xs text-muted-foreground">?</span>
              </div>
            </div>
            <UserSlider onChange={setActiveUsers} />
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {pricingData.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 px-6 text-center">
        <div className="container mx-auto">
          <p className="text-lg text-muted-foreground">
            Add authentication to your application today
          </p>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;