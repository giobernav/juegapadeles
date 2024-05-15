"use server";

import { revalidatePath } from "next/cache";
import { cookiesClient } from "@/utils/amplify-utils";

export async function listTodos() {
  const response = await cookiesClient.models.Todo.list({
    authMode: "identityPool",
  });
  return response;
}

export async function addTodo(data: FormData) {
  const title = data.get("title") as string;
  const response = await cookiesClient.models.Todo.create(
    {
      content: title,
    },
    { authMode: "userPool" }
  );
  revalidatePath("/");
  return response;
}

export async function deleteTodo(id: string) {
  const response = await cookiesClient.models.Todo.delete(
    { id },
    { authMode: "userPool" }
  );
  revalidatePath("/");
  return response;
}
