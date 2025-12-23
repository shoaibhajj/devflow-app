'use client'
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <h1 className="h1-bold">Welcome to my next app </h1>
      <h1 className="h1-bold font-space-grotesk">Welcome to my next app </h1>
      <div>
        The current theme is: {theme}
        <button onClick={() => setTheme("light")}>Light Mode</button>
        <button onClick={() => setTheme("dark")}>Dark Mode</button>
      </div>
    </>
  );
}
 