import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { TodosList } from "@/components/Todo/TodosList";

export default function Home() {
  return (
    <main className="w-full sm:max-w-3xl min-h-screen mx-auto p-4">
      <Navbar />
      <section className="min-h-96 mt-2 p-4 border border-primary rounded-3xl">
        <TodosList />
      </section>
    </main>
  );
}
