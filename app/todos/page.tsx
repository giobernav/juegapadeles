import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";
import { AddTodoForm } from "@/components/AddTodoForm";
import Todos from "@/components/Todos";
import { Suspense } from "react";
import { listTodos } from "@/utils/actions";

export default async function TodosPage() {
  const user = await AuthGetCurrentUserServer();
  console.log("user", user);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await listTodos();
      const allTodos = response.data;
      if (!allTodos) return [];
      return allTodos;
    },
  });

  return (
    <>
      <AddTodoForm />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading todos...</div>}>
          <Todos />
        </Suspense>
      </HydrationBoundary>

      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
    </>
  );
}
