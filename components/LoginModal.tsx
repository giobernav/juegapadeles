"use client";

import {
  Button,
  View,
  useTheme,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { AuthUser } from "aws-amplify/auth";
import NextLink from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function LoginModal({ user }: { user?: AuthUser }) {
  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);
  return null;
}

export default withAuthenticator(LoginModal, {
  variation: "modal",
  components: {
    Footer() {
      const { tokens } = useTheme();
      const router = useRouter();

      return (
        <View
          textAlign="center"
          backgroundColor="background.primary"
          borderStyle="solid"
          borderWidth="2px"
          borderColor="border.primary"
          padding={tokens.space.xs}
          boxShadow={`${tokens.shadows.medium}`}
        >
          <Button
            variation="link"
            onClick={() => {
              router.back();
            }}
          >
            Cerrar
          </Button>
        </View>
      );
    },
  },
});
