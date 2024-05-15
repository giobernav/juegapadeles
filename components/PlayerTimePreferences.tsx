"use client";

import {
  Flex,
  Card,
  Button,
  Input,
  Heading,
  SwitchField,
  Fieldset,
} from "@aws-amplify/ui-react";

export default function PlayerTimePreferencesComponent() {
  return (
    <Card alignSelf={["auto", "auto", "start", "start"]} variation="outlined">
      <Flex as="form" direction="column">
        <Flex columnGap="xs">
          🕐 <Heading level={5}>Preferencias de horario</Heading>
        </Flex>

        <Fieldset legend="Días y horarios preferidos" variation="outlined">
          {[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ]?.map((day, idx) => {
            return (
              <Flex key={idx} direction="column" gap="xs" alignItems="start">
                <SwitchField label={day} labelPosition="end" />
                <Flex direction="row" gap="xs">
                  <Input id={`startTime.${day}`} type="time" size="small" />
                  <Input id={`endTime.${day}`} type="time" size="small" />
                </Flex>
              </Flex>
            );
          })}
        </Fieldset>

        <Button type="submit" variation="primary">
          💾 Guardar preferencias
        </Button>
      </Flex>
    </Card>
  );
}
