"use client";

import { Divider, Flex, Text, View } from "@aws-amplify/ui-react";
import SwitchTheme from "./SwitchTheme";

export default function Footer() {
  return (
    <Flex
      as="footer"
      direction="column"
      justifyContent="center"
      alignItems="start"
      padding={0}
    >
      <Divider padding="small" />
      <Flex justifyContent="center" alignItems="center">
        <Text>Site color mode</Text>
        <SwitchTheme />
      </Flex>
      <View>
        <Text fontSize="small" color="neutral.60">
          © 2024, Juegapadel, Inc. and its affiliates.
        </Text>
        <Text fontSize="small" color="neutral.60">
          All rights reserved. View the site terms and privacy policy.
        </Text>
      </View>
    </Flex>
  );
}
