import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const AddTodo = () => {
  return (
    <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
      <Input
        type="text"
        className={cn("bg-input !text-3xl px-2 py-6")}
        placeholder="Do something"
      />
      <Button className="w-full text-2xl sm:w-28 cursor-pointer px-2 py-6">
        Add
      </Button>
    </div>
  );
};

export default AddTodo;
