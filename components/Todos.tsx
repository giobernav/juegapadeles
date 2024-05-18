"use client";

import {
  UseQueryResult,
  // UseSuspenseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
  // useSuspenseQuery,
} from "@tanstack/react-query";
import { type Schema } from "@/amplify/data/resource";
import { listTodos, deleteTodo } from "@/utils/actions";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@aws-amplify/ui-react";
import { XMarkIcon } from "@heroicons/react/16/solid";

type Todo = Schema["Todo"]["type"];

function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();

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
          ? `An error occurred: Error deleting todo.`
          : null}
        {deleteMutation.isSuccess ? "Todo deleted!" : null}
        <Button onClick={() => deleteMutation.mutate({ id: todo.id })}>
          <XMarkIcon width={16} />
        </Button>
      </TableCell>
    </TableRow>
  );
}

function TodosTable({
  isLoading,
  isError,
  isSuccess,
  data,
  error,
}: UseQueryResult<Todo[]>) {
  return (
    <Table highlightOnHover={true}>
      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell>{"Loading todos..."}</TableCell>
          </TableRow>
        )}
        {isError && (
          <TableRow>
            <TableCell>{error?.message || "Problem loading todos"}</TableCell>
          </TableRow>
        )}

        {isSuccess &&
          data.map((todo, idx) => {
            if (!todo) return null;
            return <TodoItem key={`${idx}-${todo.id}`} todo={todo} />;
          })}
      </TableBody>
    </Table>
  );
}

export default function Todos() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await listTodos();
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
      <TodosTable {...query} />
    </Card>
  );

  return null;
}
