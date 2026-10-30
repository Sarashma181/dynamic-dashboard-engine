import { useState } from "react";

function ThemeToggle() {

  const [isDark, setIsDark] = useState(false);


  const toggleTheme = () => {

    const newTheme = !isDark;

    setIsDark(newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme
    );
  };


  return (
    <button
      onClick={toggleTheme}
      className="
        rounded-lg
        bg-primary
        px-4
        py-2
        text-white
      "
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default ThemeToggle;