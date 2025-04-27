"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/db";
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "@/lib/prompts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getTodos() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return { error: "Invalid session", todos: [] };
    }

    const todos = await prisma.todo.findMany({
      where: {
        userEmail: session.user.email,
      },
    });

    return { todos };
  } catch (err) {
    console.error("Failed to fetch todos", err);
    return { error: "Something went wrong. Please try again", todos: [] };
  }
}

export async function generatedSuggestedTodos({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { error: "Invalid session", todos: [] };
    }
    const recentTodos = await prisma.todo.findMany({
      where: {
        userEmail: session.user.email,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });
    const todos = recentTodos
      .map(
        (item, index) =>
          `${index + 1}.${item.title}-${
            item.complete ? "Complete" : "Incomplete"
          }`
      )
      .join("\n");

    const prompt = `These are user's recent todos:
    ${todos}.
    
    This is user's current location:
    Latitude:${latitude}, Longitude:${longitude}
    
    Generate 3 todos.`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL!,
      contents: "",
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 1.2,
        topP: 0.9,
        topK: 40,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              prompt: {
                type: Type.STRING,
                description: "Prompt for the todo",
                nullable: false,
              },
              title: {
                type: Type.STRING,
                description: "Title for the todo",
                nullable: false,
              },
            },
            required: ["prompt", "title"],
          },
        },
      },
    });
    console.log(response.text);
  } catch (err) {
    console.log("Failed to generate suggestions", err);
    return { error: "Something went wrong. Please try again", todos: [] };
  }
}
