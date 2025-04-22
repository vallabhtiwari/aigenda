import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const AddTodoSchema = z.string().min(1);
