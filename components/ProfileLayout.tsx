"use client";

import React from "react";
import { Button, ButtonGroup, Flex, useTheme } from "@aws-amplify/ui-react";
import Link from "next/link";
import Logout from "@/components/Logout";
import { usePathname } from "next/navigation";
import { AuthUser } from "aws-amplify/auth";

export default function ProfileLayoutComponent({
  user,
  children, // will be a page or nested layout
}: {
  user?: AuthUser;
  children: React.ReactNode;
}) {
  const { tokens } = useTheme();
  const pathname = usePathname();

  const commonOpts = {
    as: Link,
    justifyContent: "start",
    boxShadow: `${tokens.shadows.medium}`,
  };

  return (
    <Flex
      as="section"
      direction={["column", "column", "row", "row"]}
      padding={0}
    >
      <ButtonGroup
        as="nav"
        direction="column"
        gap={["small", "small", "medium", "medium"]}
        maxWidth="25rem"
      >
        <Button
          {...commonOpts}
          href="/profile"
          variation={pathname === "/profile" ? "primary" : undefined}
        >
          😉 Mi perfil
        </Button>

        <ButtonGroup wrap="wrap" size="small" gap="xs">
          <Button
            {...commonOpts}
            href="/profile"
            variation={pathname === "/profile" ? "primary" : "link"}
            whiteSpace="nowrap"
          >
            Datos personales
          </Button>
          <Button
            {...commonOpts}
            href="/profile/friends"
            variation={pathname === "/profile/friends" ? "primary" : "link"}
          >
            Amigos
          </Button>
          <Button
            {...commonOpts}
            href="/profile/blocked-players"
            variation={
              pathname === "/profile/blocked-players" ? "primary" : "link"
            }
          >
            Boqueados
          </Button>
        </ButtonGroup>

        <Button
          {...commonOpts}
          href="/profile/preferences"
          variation={
            pathname === "/profile/preferences" ? "primary" : undefined
          }
        >
          🎾 Preferencias de juego
        </Button>
        <Button
          {...commonOpts}
          href="/profile/preferences/location"
          variation={
            pathname === "/profile/preferences/location" ? "primary" : undefined
          }
        >
          📍 Preferencias de ubicación
        </Button>
        <Button
          {...commonOpts}
          href="/profile/preferences/time"
          variation={
            pathname === "/profile/preferences/time" ? "primary" : undefined
          }
        >
          🕐 Preferencias de horario
        </Button>

        {user && <Logout />}
      </ButtonGroup>
      <Flex flex={1} direction="column" padding={0}>
        {children}
      </Flex>
    </Flex>
  );
}
