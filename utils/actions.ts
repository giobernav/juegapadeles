"use server";

import { revalidatePath } from "next/cache";
// import type { SelectionSet } from "aws-amplify/data";
import { cookiesClient } from "@/utils/amplify-utils";
// import type { Schema } from "@/amplify/data/resource";

import { todoFormSchema, TodoFormSchemaInputType } from "@/schemas/schema";

// const selectionSet = ["content"] as const;
// type Todo = SelectionSet<Schema["Todo"]["type"], typeof selectionSet>;

export async function listTodos() {
  try {
    const response = await cookiesClient.models.Todo.list({
      authMode: "identityPool",
    });
    return response;
  } catch (error: any) {
    throw new Error(error || "Error querying todos");
  }
}

export async function addTodo(data: TodoFormSchemaInputType) {
  const parsed = todoFormSchema.safeParse(data);

  if (parsed.success) {
    const parsedData = parsed.data;

    try {
      const response = await cookiesClient.models.Todo.create(
        { content: parsedData.title },
        {
          authMode: "userPool",
        }
      );
      // revalidatePath("/");
      return response;
    } catch (error: any) {
      throw new Error(error || "Error creating todo");
    }
  } else {
    throw new Error("Validation error");
  }
}

export async function deleteTodo(id: string) {
  try {
    const response = await cookiesClient.models.Todo.delete(
      { id },
      { authMode: "userPool" }
    );
    revalidatePath("/");
    return response;
  } catch (error) {
    throw new Error(error || "Error deleting todo");
  }
}
