import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { TodosList } from "@/components/Todo/TodosList";
import AddTodo from "@/components/Todo/AddTodo";

const todos = [
  {
    id: "1",
    title: "Complete todo",
    complete: false,
  },
  {
    id: "2",
    title: "Complete todo",
    complete: false,
  },
  {
    id: "3",
    title: "Complete todo",
    complete: false,
  },
];
const suggestedTodos = [
  {
    id: "1",
    prompt: "Doing good",
    title: "Complete todo",
    complete: false,
  },
  {
    id: "2",
    prompt: "Doing good",
    title: "Complete todo",
    complete: false,
  },
  {
    id: "3",
    prompt: "Doing good",
    title: "Complete todo",
    complete: false,
  },
];
export default function Home() {
  return (
    <main className="w-full sm:max-w-3xl min-h-screen mx-auto p-4">
      <Navbar />
      <section className="min-h-96 mt-2 p-4 border border-primary rounded-3xl">
        <AddTodo />
        <TodosList todos={todos} />
        <TodosList todos={suggestedTodos} />
      </section>
    </main>
  );
}
