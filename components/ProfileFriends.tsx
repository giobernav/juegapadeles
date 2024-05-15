"use client";

import {
  Flex,
  Card,
  Button,
  Input,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  SearchField,
  View,
  Heading,
} from "@aws-amplify/ui-react";

export default function ProfileFriendsComponents() {
  return (
    <>
      <View>
        <Flex
          direction={["column", "column", "row", "row"]}
          justifyContent="space-between"
        >
          <View>
            <Heading level={4}>😎 Amigos</Heading>
          </View>
        </Flex>
      </View>

      <View>
        <SearchField label="Buscar" placeholder="Buscar usuario a agregar..." />

        <Card variation="outlined" marginTop="xs" marginBottom="small">
          <Flex
            as="form"
            direction={["column", "column", "row", "row"]}
            gap="small"
            justifyContent="space-between"
          >
            <Flex direction={["column", "column", "row", "row"]} gap="xs">
              <Input id="email" placeholder="juanp@micorreo.com" isReadOnly />
              <Input id="name" placeholder="Juan" isReadOnly />
              <Input id="lastName" placeholder="Pérez" isReadOnly />
            </Flex>

            <Button type="submit" variation="primary" whiteSpace="nowrap">
              😎 Agregar amigo
            </Button>
          </Flex>
        </Card>
      </View>

      <Table highlightOnHover variation="striped">
        <TableHead>
          <TableRow>
            <TableCell as="th">Usuario</TableCell>
            <TableCell as="th">Amigo desde</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Highlighted on hover</TableCell>
            <TableCell>Highlighted on hover</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Highlighted on hover</TableCell>
            <TableCell>Highlighted on hover</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Highlighted on hover</TableCell>
            <TableCell>Highlighted on hover</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
