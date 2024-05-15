"use client";

import { Button } from "@aws-amplify/ui-react";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await signOut();
        router.push("/login");
      }}
      variation="warning"
    >
      Cerrar sesión
    </Button>
  );
}
