"use client";

import {
  Flex,
  Card,
  Text,
  Divider,
  Button,
  Input,
  SelectField,
  Label,
  Heading,
  Collection,
  View,
  Badge,
  Link,
} from "@aws-amplify/ui-react";

import {
  MapPinIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/20/solid";
import React from "react";

export default function AdvertisementCollection({
  items,
}: {
  items: Object[];
}) {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <View>
        <Flex
          direction={["column", "column", "row", "row"]}
          justifyContent="space-between"
        >
          <View>
            <Heading level={3}>Próximos partidos</Heading>
            <Heading color="neutral.60">
              Se encontraron 146 anuncios de partidos disponibles.
            </Heading>
          </View>
          <Button
            gap="0.2rem"
            onClick={() => setShow(!show)}
            variation={show ? "primary" : undefined}
          >
            <FunnelIcon width={20} /> Filtrar
          </Button>
        </Flex>

        <Divider padding="small" />
      </View>

      {show ? (
        <Card
          variation="outlined"
          alignSelf={["auto", "auto", "end", "end"]}
          marginTop="xs"
        >
          <Flex as="form" direction="column">
            <Flex columnGap="xs">
              <MagnifyingGlassIcon width={24} style={{ marginRight: 8 }} />
              <Heading level={5}>Encontrar partido</Heading>
            </Flex>

            <Input placeholder="Ubicación/Dirección" />

            <Flex direction="column" gap="xs">
              <Label htmlFor="date">Fecha y hora:</Label>
              <Flex direction={["column", "column", "row", "row"]} gap="xs">
                <Input id="date" type="date" />
                <Input id="time" type="time" />
              </Flex>
            </Flex>

            <SelectField label="Nivel:">
              <option value="BEGINNER">Principiante</option>
              <option value="INTERMEDIATE">Intermedio</option>
              <option value="ADVANCED" disabled>
                Avanzado
              </option>
            </SelectField>
            <Button type="submit" variation="primary">
              <ArrowRightIcon width={20} style={{ marginRight: 8 }} />
              Buscar partido
            </Button>
          </Flex>
        </Card>
      ) : null}

      <Collection
        type="grid"
        items={items}
        templateColumns={["1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]}
        gap="small"
        isPaginated
        itemsPerPage={12}
      >
        {(item, index) => (
          <Card key={index} variation="outlined">
            <Flex direction="column" height="100%" flex={1} gap="xs">
              <Heading level={5}>{item.title}</Heading>
              <Flex gap="xs">
                <Badge variation="warning" size="small">
                  Principiante
                </Badge>
                <Badge variation="info" size="small">
                  a 2,3 km.
                </Badge>
              </Flex>
              <View>
                <Link href="#" fontWeight="bold">
                  <MapPinIcon width={14} /> Arena Rio Padel
                </Link>
                <Text fontSize="small">
                  C. de la Verdad, 20, Carabanchel, 28019 Madrid
                </Text>
              </View>

              <Divider />
              <Flex direction="column" flex={1} justifyContent="space-between">
                <Text paddingTop="xs">
                  Descripción super loca del partido de padel más emocionante de
                  la historia.
                </Text>

                <Flex direction="column" gap="xs">
                  <Flex alignItems="baseline">
                    <Text fontSize="medium" fontWeight="bold">
                      Price:
                    </Text>
                    <Text fontSize="large" color="#B12704" fontWeight="bold">
                      2,00 €
                    </Text>
                  </Flex>
                  <Button isFullWidth>Más info</Button>
                  <Text fontSize="xs" textAlign="center">
                    Quedan{" "}
                    <Text variation="info" as="span">
                      2 puestos
                    </Text>
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        )}
      </Collection>
    </>
  );
}
