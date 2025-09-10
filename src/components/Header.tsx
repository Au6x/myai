import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">AI</span>
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              myAI
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Developers
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Documentation
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Product
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Solutions
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Blog
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary font-medium">
              Pricing
            </Button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden sm:inline-flex">
            Sign up
          </Button>
          <Button variant="default" className="bg-gradient-primary hover:opacity-90 shadow-button">
            Contact sales
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;