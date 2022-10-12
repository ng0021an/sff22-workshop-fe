import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useState } from "react";
import { Helmet } from "react-helmet";

import { COINBASE_BLUE_SHADES } from "../../constants/color";
import Checkin from "./Checkin";
import Home from "./Home";

export default function AppB() {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = () =>
    setColorScheme((scheme) => (scheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          colors: {
            blue: COINBASE_BLUE_SHADES,
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Helmet>
          <title>FirmlyFinance</title>
        </Helmet>
        <Home />
        <Checkin />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
