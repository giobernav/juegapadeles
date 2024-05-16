"use server";

import { revalidatePath } from "next/cache";
// import type { SelectionSet } from "aws-amplify/data";
import { cookiesClient } from "@/utils/amplify-utils";
// import type { Schema } from "@/amplify/data/resource";

import { todoFormSchema, TodoFormSchemaInputType } from "@/schemas/schema";

// const selectionSet = ["content"] as const;
// type Todo = SelectionSet<Schema["Todo"]["type"], typeof selectionSet>;

export async function listTodos() {
  const response = await cookiesClient.models.Todo.list({
    authMode: "identityPool",
  });
  return response;
}

export async function addTodo(data: TodoFormSchemaInputType) {
  const parsed = todoFormSchema.safeParse(data);

  if (parsed.success) {
    const parsedData = parsed.data;

    const response = await cookiesClient.models.Todo.create(
      { content: parsedData.title },
      {
        authMode: "userPool",
      }
    );
    revalidatePath("/");
    return response;
  } else {
    throw new Error("Validation error");
  }
}

export async function deleteTodo(id: string) {
  const response = await cookiesClient.models.Todo.delete(
    { id },
    { authMode: "userPool" }
  );
  revalidatePath("/");
  return response;
}
