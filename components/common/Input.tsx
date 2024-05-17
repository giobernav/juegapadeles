"use client";

import { forwardRef } from "react";
import {
  Flex,
  Label,
  Text,
  Input as InputUI,
  InputProps,
} from "@aws-amplify/ui-react";

interface Props extends InputProps {
  error?: string;
  label: string;
  labelHidden?: boolean;
}

export default forwardRef<HTMLInputElement, Props>(function Input(
  { name, error, label, labelHidden, disabled, readOnly, required, ...rest },
  ref
) {
  return (
    <Flex flex={1} width="100%" direction="column" gap="xs">
      {labelHidden ? null : (
        <Label htmlFor={name}>
          {label}
          {required ? (
            <Text as="span" fontSize="small" color="font.error">
              {" "}
              (required)
            </Text>
          ) : null}
        </Label>
      )}
      <InputUI
        ref={ref}
        type="text"
        id={name}
        name={name}
        hasError={Boolean(error)}
        isRequired={required}
        isDisabled={disabled}
        isReadOnly={readOnly}
        {...rest}
      />
      {error && (
        <Text fontSize="small" color="font.error" fontStyle="italic">
          {error}
        </Text>
      )}
    </Flex>
  );
});
