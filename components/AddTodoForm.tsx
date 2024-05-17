"use client";

import { useEffect } from "react";
import { addTodo } from "@/utils/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Schema } from "@/amplify/data/resource";
import { Button, Flex, View } from "@aws-amplify/ui-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { TodoFormSchemaInputType, todoFormSchema } from "@/schemas/schema";
import Input from "./common/Input";

type Todo = Schema["Todo"]["type"];

export function AddTodoForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TodoFormSchemaInputType>({
    resolver: zodResolver(todoFormSchema, {}, { raw: true }),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<TodoFormSchemaInputType> = (data) => {
    createMutation.mutate(data);
  };

  const createMutation = useMutation({
    mutationFn: async (input: TodoFormSchemaInputType) => {
      const { data: newTodo } = await addTodo(input);
      return newTodo;
    },
    // When mutate is called:
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["todos"]);

      // Optimistically update to the new value
      if (previousTodos) {
        queryClient.setQueryData(["todos"], (old: Todo[]) => [
          ...old,
          { content: newTodo.title },
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
        <div>An error occurred: Error creating todo.</div>
      ) : null}

      {createMutation.isSuccess ? <div>Todo added!</div> : null}
      <View as="form" onSubmit={handleSubmit(onSubmit)}>
        <Flex
          justifyContent="space-between"
          alignItems="start"
          direction={{ base: "column", large: "row" }}
          gap="small"
        >
          <Input
            type="text"
            placeholder="Todo content..."
            width="100%"
            label="Title"
            labelHidden
            {...register("title")}
            error={errors.title?.message}
          />
          <Button
            type="submit"
            variation="primary"
            whiteSpace="nowrap"
            isLoading={isSubmitting}
            loadingText="Submitting..."
          >
            Add todo
          </Button>
        </Flex>
      </View>
    </>
  );
}
