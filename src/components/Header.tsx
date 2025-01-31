import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-background/50 backdrop-blur-sm border-b">
      <nav className="flex gap-4">
        <Link to="/home">
          <Button variant="ghost">Home</Button>
        </Link>
        <Link to="/">
          <Button variant="ghost">Index</Button>
        </Link>
        <Link to="/portfolio">
          <Button variant="ghost">Portfolio</Button>
        </Link>
        <Link to="/calculator">
          <Button variant="ghost">Calculator</Button>
        </Link>
      </nav>
      <ThemeToggle />
    </header>
  );
};

export default Header;