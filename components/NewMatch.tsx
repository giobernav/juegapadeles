"use client";

import {
  Flex,
  Card,
  Button,
  Input,
  SelectField,
  Label,
  Heading,
  ToggleButtonGroup,
  ToggleButton,
  SwitchField,
} from "@aws-amplify/ui-react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function NewMatchComponent() {
  const [value, setValue] = useState("PUBLIC");

  return (
    <Card variation="outlined">
      <Flex as="form" direction="column">
        <Flex columnGap="xs">
          <PlusIcon width={24} style={{ marginRight: 8 }} />
          <Heading level={5}>Nuevo partido</Heading>
        </Flex>

        <Flex direction="column" gap="xs">
          <Input placeholder="Ubicación/Dirección" />
          <SwitchField label="¿Pista confirmada?" labelPosition="end" />
        </Flex>

        <Flex direction="column" gap="xs">
          <Label htmlFor="date">Fecha y hora:</Label>
          <Flex direction={["column", "column", "row", "row"]} gap="xs">
            <Input id="date" type="date" />
            <Input id="time" type="time" />
          </Flex>
        </Flex>

        <Flex direction="column" gap="xs">
          <SelectField label="Nivel:">
            <option value="BEGINNER">Principiante</option>
            <option value="INTERMEDIATE">Intermedio</option>
            <option value="ADVANCED" disabled>
              Avanzado
            </option>
          </SelectField>
          <SwitchField label="¿Nivel estricto?" labelPosition="end" />
        </Flex>

        <Flex direction={["column", "column", "row", "row"]}>
          <Flex direction="column" gap="xs">
            <Label htmlFor="date">Visibilidad del partido:</Label>
            <ToggleButtonGroup
              value={value}
              onChange={(value) => setValue(value as string)}
              isExclusive
              isSelectionRequired
            >
              <ToggleButton value="PUBLIC">Público</ToggleButton>
              <ToggleButton value="PRIVATE">Privado</ToggleButton>
              {/* <ToggleButton value="FRIENDS_ONLY">Amigos</ToggleButton> */}
            </ToggleButtonGroup>
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="price">Precio x participante (€):</Label>
            <Input id="price" placeholder="2,00" />
          </Flex>
        </Flex>

        <Button type="submit" variation="primary">
          <PlusIcon width={20} style={{ marginRight: 8 }} />
          Crear partido
        </Button>
      </Flex>
    </Card>
  );
}
