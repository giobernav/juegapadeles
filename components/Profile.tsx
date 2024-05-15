"use client";

import {
  Flex,
  Card,
  Text,
  useTheme,
  Button,
  Input,
  SelectField,
  Label,
  Heading,
  PhoneNumberField,
} from "@aws-amplify/ui-react";

export default function ProfileComponent() {
  const { tokens } = useTheme();

  return (
    <Card alignSelf={["auto", "auto", "start", "start"]} variation="outlined">
      <Flex as="form" direction="column">
        <Flex columnGap="xs">
          😉 <Heading level={5}>Mi perfil</Heading>
        </Flex>

        <Flex direction={["column", "column", "row", "row"]}>
          <Flex direction="column" gap="xs">
            <Label htmlFor="name">Nombre:</Label>
            <Input id="name" placeholder="Juan" />
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="lastName">Apellidos:</Label>
            <Input id="lastName" placeholder="Pérez" />
          </Flex>
        </Flex>

        <Flex direction="column" gap="xs">
          <Label htmlFor="username">Username:</Label>
          <Text
            fontStyle="italic"
            fontSize={tokens.fontSizes.small}
            color="neutral.90"
          >
            Elige un nombre de usuario único
          </Text>
          <Input id="username" placeholder="juanp24" />
        </Flex>

        <PhoneNumberField
          defaultDialCode="+34"
          label="Móvil:"
          descriptiveText="Ingresa tu número de celular"
          placeholder="234-567-8910"
        />

        <Flex direction="column" gap="xs">
          <Label htmlFor="email">Email:</Label>
          <Input id="email" placeholder="juanp@miemail.com" type="email" />
        </Flex>

        <Flex direction={["column", "column", "row", "row"]}>
          <SelectField label="Género:">
            <option value="FEMALE">Mujer</option>
            <option value="MALE">Hombre</option>
            <option value="UND">Prefiero no decirlo</option>
          </SelectField>

          <Flex direction="column" gap="xs">
            <SelectField label="Privacidad:">
              <option value="PUBLIC">Público</option>
              <option value="PRIVATE">Privado</option>
              <option value="FRIENDS_ONLY">Sólo Amigos</option>
            </SelectField>
          </Flex>
        </Flex>

        <Button type="submit" variation="primary">
          💾 Guardar perfil
        </Button>
      </Flex>
    </Card>
  );
}
