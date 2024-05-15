"use client";

import { ToggleButton, ToggleButtonGroup } from "@aws-amplify/ui-react";
import { CpuChipIcon, MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SwitchTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ToggleButtonGroup
      value={theme as string}
      isExclusive
      onChange={(value) => setTheme(value as string)}
    >
      <ToggleButton value="light">
        <SunIcon width={20} />
      </ToggleButton>
      <ToggleButton value="dark">
        <MoonIcon width={20} />
      </ToggleButton>
      <ToggleButton value="system">
        <CpuChipIcon width={20} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
