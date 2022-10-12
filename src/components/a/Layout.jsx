import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  Image,
  Navbar,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import {
  IconDiscount,
  IconHome,
  IconPremiumRights,
  IconTrophy,
} from "@tabler/icons";

import logoUrlDark from "./logo-rocksolidfinance-dark.png";
import logoUrl from "./logo-rocksolidfinance.png";

function MainLink({ icon, color, label, active }) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: active
          ? theme.colorScheme === "dark"
            ? theme.colors[color][6]
            : theme.colors[color][9]
          : theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.black,
        backgroundColor: active
          ? theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[0]
          : undefined,
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="md">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <IconHome size={22} />,
    color: "blue",
    label: "Home",
  },
  {
    icon: <IconPremiumRights size={22} />,
    color: "grape",
    label: "Assets",
  },
  {
    icon: <IconTrophy size={22} />,
    color: "teal",
    label: "Rewards",
    active: true,
  },
  {
    icon: <IconDiscount size={22} />,
    color: "violet",
    label: "Earn",
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}

export default function Layout(props) {
  const { children } = props;
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <Group sx={{ height: "100%" }}>
              <Image
                src={colorScheme === "dark" ? logoUrlDark : logoUrl}
                width={190}
                fit="contain"
              />
            </Group>
            <ActionIcon variant="default" onClick={toggleColorScheme} size={30}>
              {colorScheme === "dark" ? (
                <IconSun size={16} />
              ) : (
                <IconMoonStars size={16} />
              )}
            </ActionIcon>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
