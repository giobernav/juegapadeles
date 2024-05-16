"use client";
import * as React from "react";
import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  View,
} from "@aws-amplify/ui-react";
import { PAINTINGS } from "@/utils/paintings";

export default function AdDetailComponent() {
  const [currentPainting, setCurrentPainting] = React.useState(PAINTINGS[0]);
  const [frame, setFrame] = React.useState(true);
  const [quantity, setQuantity] = React.useState(1);
  const [size, setSize] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleAddToCart = () => {
    if (size === "") {
      setError(true);
      return;
    }
    alert(
      `Added to cart!\n${quantity} ${size} "${currentPainting.title}" by ${
        currentPainting.artist
      } with ${frame ? "a" : "no"} frame`
    );
  };

  return (
    <Card
      alignSelf={["auto", "auto", "center", "center"]}
      maxWidth="50rem"
      variation="outlined"
    >
      <Flex direction="column" justifyContent="space-evenly">
        <Flex direction="column" justifyContent="space-between">
          <Flex direction="column" gap="0.7rem">
            <Flex justifyContent="space-between" alignItems="center">
              <Heading level={4}>{currentPainting.title}</Heading>
              <Flex height="1.8rem">
                {currentPainting.bestSeller ? (
                  <Badge variation="success">Activo</Badge>
                ) : null}
              </Flex>
            </Flex>
            <Flex gap="0.5rem">
              <Text fontWeight="bold" color="primary.80">
                Mañana
              </Text>
              <Text as="time" fontWeight="bold" color="primary.80">
                14:30 horas
              </Text>
            </Flex>

            <Flex gap="xs">
              <Badge variation="warning">🔒 Principiante</Badge>
              <Badge variation="info">a 2,3 km</Badge>
            </Flex>

            <Divider />

            <View>
              <Link href="#" fontWeight="bold">
                📍 Arena Rio Padel ✅
              </Link>
              <Text>C. de la Verdad, 20, Carabanchel, 28019 Madrid</Text>
            </View>

            <Text paddingBottom="1rem">{currentPainting.description}</Text>
          </Flex>

          <Flex direction="column" gap="small">
            <View>
              <Flex alignItems="baseline" gap="0.5rem">
                <Text fontSize="medium" fontWeight="bold">
                  Precio:
                </Text>
                <Text fontSize="large" color="#B12704" fontWeight="bold">
                  {currentPainting.price}
                </Text>
              </Flex>
              <Text fontSize="small">
                Quedan{" "}
                <Text variation="success" as="span">
                  1 puesto
                </Text>
              </Text>
            </View>
            <View>
              <Text fontWeight="bold" paddingBottom={8}>
                Participantes:
              </Text>
              <Flex gap="xs" wrap="wrap">
                <Badge variation="info">juanp76 (admin)</Badge>
                <Badge>giobernav</Badge>
                <Badge>mariae</Badge>
              </Flex>
            </View>
          </Flex>

          <Divider padding="xs" />
          <Flex direction="column">
            <Heading level={5}>Datos del partido</Heading>
            <Grid templateColumns={["1fr", "1fr 1fr 1fr"]} rowGap="small">
              <View>
                <Text fontWeight="bold">Status:</Text>
                <Text variation="success">Terminado</Text>
              </View>

              <View>
                <Text fontWeight="bold">Resultado:</Text>
                <Text variation="success">7-6/4-6/6-4</Text>
              </View>

              <View>
                <Text fontWeight="bold">Duración:</Text>
                <View>
                  <Text>17-05-2024</Text>
                  <Flex gap="xs" alignItems="center">
                    <Badge style={{ borderRadius: 0 }}>10:35</Badge>
                    <Badge style={{ borderRadius: 0 }}>11:40</Badge>
                  </Flex>
                </View>
              </View>

              <View>
                <Text fontWeight="bold">Ganador:</Text>
                <Flex gap="xs">
                  <Badge>giobernav</Badge>
                  <Badge>mariae</Badge>
                </Flex>
              </View>
            </Grid>
          </Flex>

          <Flex
            justifyContent="space-between"
            direction={{ base: "column", large: "row" }}
            gap="xs"
          >
            <Flex gap="xs">
              <Button colorTheme="info" whiteSpace="nowrap" size="small">
                🔗 Compartir
              </Button>
              <Button colorTheme="success" whiteSpace="nowrap" size="small">
                ➕ Participar
              </Button>
            </Flex>
            <Button
              colorTheme="overlay"
              onClick={handleAddToCart}
              disabled={!currentPainting.inStock || !quantity}
            >
              Iniciar partido
            </Button>
            {false ? (
              <>
                <Button variation="primary" colorTheme="success">
                  Colocar resultado
                </Button>
                <Button variation="primary" colorTheme="warning">
                  Modificar resultado
                </Button>
              </>
            ) : null}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
