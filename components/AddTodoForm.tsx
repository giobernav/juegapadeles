"use client";

import { addTodo } from "@/utils/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Schema } from "@/amplify/data/resource";
import { Button, Flex, Input } from "@aws-amplify/ui-react";

type Todo = Schema["Todo"]["type"];

export function AddTodoForm() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data: newTodo } = await addTodo(formData);
      return newTodo;
    },
    // When mutate is called:
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["todos"]);

      console.log("newTodo", newTodo);
      // Optimistically update to the new value
      if (previousTodos) {
        queryClient.setQueryData(["todos"], (old: Todo[]) => [
          ...old,
          { content: newTodo.get("title") },
        ]);
      }

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to rollback
    onError: (err, newTodo, context) => {
      console.error("Error saving record:", err, newTodo);
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <>
      {createMutation.isPending && "Adding Todo..."}
      {createMutation.isError && createMutation.error instanceof Error ? (
        <div>An error occurred: {createMutation.error.message}</div>
      ) : null}

      {createMutation.isSuccess ? <div>Todo added!</div> : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createMutation.mutate(new FormData(e.currentTarget));
        }}
      >
        <Flex
          justifyContent="space-between"
          direction={{ base: "column", large: "row" }}
          gap="small"
        >
          <Input type="text" name="title" />
          <Button type="submit" variation="primary" isFullWidth>
            Add Todo
          </Button>
        </Flex>
      </form>
    </>
  );
}
