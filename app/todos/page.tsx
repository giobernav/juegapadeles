import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { AddTodoForm } from "@/components/AddTodoForm";
import Todos from "@/components/Todos";
import { Suspense } from "react";
import { listTodos } from "@/utils/actions";

export default function TodosPage() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
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

      <Suspense fallback={<div>Loading todos server...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Todos />
        </HydrationBoundary>
      </Suspense>

      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
      </div>
    </>
  );
}
