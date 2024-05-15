"use client";

import {
  Flex,
  Card,
  Button,
  Input,
  Label,
  Heading,
  SliderField,
} from "@aws-amplify/ui-react";

export default function PlayerLocationPreferencesComponent() {
  return (
    <Card alignSelf={["auto", "auto", "start", "start"]} variation="outlined">
      <Flex as="form" direction="column">
        <Flex columnGap="xs">
          📍 <Heading level={5}>Preferencias de ubicación</Heading>
        </Flex>

        <Flex direction="column" gap="xs">
          <Label htmlFor="date">Ubicación/Dirección:</Label>
          <Input placeholder="La Guindalera, Madrid" />
        </Flex>

        <SliderField
          label="Distancia (km):"
          min={1}
          max={30}
          defaultValue={5}
        />

        <Button type="submit" variation="primary">
          💾 Guardar preferencias
        </Button>
      </Flex>
    </Card>
  );
}
