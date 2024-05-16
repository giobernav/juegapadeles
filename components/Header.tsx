"use client";

import {
  Flex,
  Card,
  Menu,
  MenuItem,
  Divider,
  ButtonGroup,
  Button,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const isMobile = useBreakpointValue([true, true, false, false]);
  const pathname = usePathname();

  return (
    <Card
      as="header"
      variation="outlined"
      padding={["xs", "xs", "small", "small"]}
    >
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <Flex direction="row" alignItems="center" justifyContent="start">
          <Menu as="nav" menuAlign="start" boxShadow="none" size="large">
            <MenuItem
              as={Link}
              href="/"
              backgroundColor={pathname === "/" ? "blue.80" : undefined}
              color={pathname === "/" ? "neutral.10" : undefined}
            >
              <MagnifyingGlassIcon width={20} style={{ marginRight: 8 }} />
              Buscar partido
            </MenuItem>
            <MenuItem
              as={Link}
              href="/ads/new"
              backgroundColor={pathname === "/ads/new" ? "blue.80" : undefined}
              color={pathname === "/ads/new" ? "neutral.10" : undefined}
            >
              <PlusIcon width={20} style={{ marginRight: 8 }} />
              Nuevo Partido
            </MenuItem>
            <Divider />
            <MenuItem
              as={Link}
              href="/profile"
              backgroundColor={pathname === "/profile" ? "blue.80" : undefined}
              color={pathname === "/profile" ? "neutral.10" : undefined}
            >
              <UserIcon width={20} style={{ marginRight: 8 }} />
              Perfil
            </MenuItem>
            <MenuItem
              as={Link}
              href="/profile/preferences"
              backgroundColor={
                pathname === "/profile/preferences" ? "blue.80" : undefined
              }
              color={
                pathname === "/profile/preferences" ? "neutral.10" : undefined
              }
            >
              <AdjustmentsHorizontalIcon
                width={20}
                style={{ marginRight: 8 }}
              />
              Preferencias
            </MenuItem>
          </Menu>

          {/* <Image
              alt="Amplify logo"
              src="/amplify.svg"
              objectFit="initial"
              objectPosition="50% 50%"
              backgroundColor="initial"
              height={32}
              opacity="100%"
              onClick={() => alert("📸 Say cheese!")}
            /> */}
        </Flex>
        <ButtonGroup as="nav" size="small" gap="small">
          <Button
            as={Link}
            href="/"
            variation={pathname === "/" ? "primary" : undefined}
          >
            <MagnifyingGlassIcon
              width={20}
              style={{ marginRight: !isMobile ? 8 : 0 }}
            />
            {!isMobile ? "Buscar" : null}
          </Button>
          <Button
            as={Link}
            href="/ads/new"
            variation={pathname === "/ads/new" ? "primary" : undefined}
          >
            <PlusIcon width={20} style={{ marginRight: !isMobile ? 8 : 0 }} />
            {!isMobile ? "Nuevo" : null}
          </Button>
        </ButtonGroup>
      </Flex>
    </Card>
  );
}
