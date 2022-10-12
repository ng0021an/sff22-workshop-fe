import { ColorSchemeProvider, MantineProvider, Space } from "@mantine/core";
import { useState } from "react";
import { Helmet } from "react-helmet";

import { COINBASE_BLUE_SHADES } from "../../constants/color";
import Layout from "./Layout";
import Reward from "./Reward";
import Stats from "./Stats";

export default function AppA() {
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
          <title>RockSolid Finance</title>
        </Helmet>
        <Layout>
          <Reward />
          <Space h="md" />
          <Stats />
        </Layout>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
