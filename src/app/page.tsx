import Image from "next/image";
import { Navbar } from "@/app/components/Navbar";
import { TodosList } from "@/app/components/TodosList";

const todos = [
  {
    id: "1",
    title: "Complete todo",
    complete: false,
  },
];
export default function Home() {
  return (
    <main className="max-w-1/2 mx-auto">
      <Navbar />
      <TodosList todos={todos} />
    </main>
  );
}
