"use client";

import {
  Flex,
  Card,
  Button,
  SelectField,
  Label,
  Heading,
  ToggleButtonGroup,
  ToggleButton,
} from "@aws-amplify/ui-react";
import { useState } from "react";

export default function PlayerPreferencesComponent() {
  const [value, setValue] = useState("PUBLIC");

  return (
    <Card alignSelf={["auto", "auto", "start", "start"]} variation="outlined">
      <Flex as="form" direction="column">
        <Flex columnGap="xs">
          🎾 <Heading level={5}>Preferencias de juego</Heading>
        </Flex>

        <SelectField label="Nivel:">
          <option value="BEGINNER">Principiante</option>
          <option value="INTERMEDIATE">Intermedio</option>
          <option value="ADVANCED">Avanzado</option>
        </SelectField>

        <Flex direction="column" gap="xs">
          <Label htmlFor="date">Mano preferida:</Label>
          <ToggleButtonGroup
            value={value}
            onChange={(value) => setValue(value as string)}
            isExclusive
            isSelectionRequired
          >
            <ToggleButton value="LEFT">Izq.</ToggleButton>
            <ToggleButton value="RIGHT">Der.</ToggleButton>
            <ToggleButton value="BOTH">Ambas</ToggleButton>
          </ToggleButtonGroup>
        </Flex>

        <Button type="submit" variation="primary">
          💾 Guardar preferencias
        </Button>
      </Flex>
    </Card>
  );
}
