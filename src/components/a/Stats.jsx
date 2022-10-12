import {
  Center,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";

const STATS = [
  {
    label: "Monthly Deposit",
    value: "> $1,000",
  },
  {
    label: "On-time Payment",
    value: "> 6 months",
  },
  {
    label: "Total Savings",
    value: "> $100,000",
  },
];

export default function Stats() {
  const stats = STATS.map((stat, index) => {
    return (
      <Paper withBorder radius="md" p="xs" key={index}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: 100, color: "teal" }]}
            label={
              <Center>
                <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
                  <IconCheck size={22} />
                </ThemeIcon>
              </Center>
            }
          />
          <div>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              {stat.label}
            </Text>
            <Text weight={700} size="xl">
              {stat.value}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });
  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      {stats}
    </SimpleGrid>
  );
}
