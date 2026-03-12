import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useThemeSwitch } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useThemeSwitch();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-muted-foreground hover:text-foreground"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {!mounted ? <Sun className="h-5 w-5" /> : isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
