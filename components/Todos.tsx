"use client";

import {
  QueryClient,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { generateClient } from "aws-amplify/data";

import { type Schema } from "@/amplify/data/resource";
import { deleteTodo } from "@/utils/actions";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@aws-amplify/ui-react";
import { XMarkIcon } from "@heroicons/react/16/solid";

const client = generateClient<Schema>();

type Todo = Schema["Todo"]["type"];

function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = new QueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (todoDetails: { id: string }) => {
      const { data: deletedTodo } = await deleteTodo(todoDetails.id);
      return deletedTodo;
    },
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({
        queryKey: ["todos", newTodo.id],
      });

      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });

      const previousTodo = queryClient.getQueryData(["todos", newTodo.id]);

      if (previousTodo) {
        queryClient.setQueryData(["todos", newTodo.id], newTodo);
      }

      return { previousTodo, newTodo };
    },
    onError: (err, newTodo, context) => {
      console.error("Error deleting record:", err, newTodo);
      if (context?.previousTodo) {
        queryClient.setQueryData(
          ["todos", context.newTodo.id],
          context.previousTodo
        );
      }
    },
    onSettled: (newTodo) => {
      if (newTodo) {
        queryClient.invalidateQueries({
          queryKey: ["todos", newTodo.id],
        });
        queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
      }
    },
  });

  return (
    <TableRow>
      <TableCell>
        {todo.content}|{todo.owner}{" "}
        {deleteMutation.isPending && "Deleting Todo..."}
        {deleteMutation.isError && deleteMutation.error instanceof Error
          ? `An error occurred: ${deleteMutation.error.message}`
          : null}
        {deleteMutation.isSuccess ? "Todo deleted!" : null}
        <Button onClick={() => deleteMutation.mutate({ id: todo.id })}>
          <XMarkIcon width={16} />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function Todos() {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
  } = useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await client.models.Todo.list({
        authMode: "identityPool",
      });
      const allTodos = response.data;
      if (!allTodos) return [];
      return allTodos;
    },
  });

  return (
    <Card
      variation="outlined"
      marginTop={16}
      marginBottom={16}
      style={{ padding: 0 }}
    >
      <Table highlightOnHover={true}>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell>{"Loading Todos..."}</TableCell>
            </TableRow>
          )}
          {isError && (
            <TableRow>
              <TableCell>{"Problem loading Todos"}</TableCell>
            </TableRow>
          )}

          {isSuccess &&
            todos.map((todo, idx) => {
              if (!todo) return null;
              return <TodoItem key={`${idx}-${todo.id}`} todo={todo} />;
            })}
        </TableBody>
      </Table>
    </Card>
  );
}
