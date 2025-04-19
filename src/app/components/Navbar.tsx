import ThemeToggle from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="w-full p-4 flex justify-between items-center border border-muted rounded-full">
      <h1>AIgenda</h1>
      <div className="  text-gray-700 text-lg">Hi, User 👋</div>
      <ThemeToggle />
      <div className="w-8 h-8  rounded-full flex items-center justify-center text-black font-semibold">
        U
      </div>
    </nav>
  );
}
