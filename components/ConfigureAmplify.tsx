"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";

import outputs from "@/amplify_outputs.json";
import { ReactNode } from "react";

Amplify.configure(outputs, { ssr: true });

export default function ConfigureAmplifyClientSide({
  children,
}: {
  children: ReactNode;
}) {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
