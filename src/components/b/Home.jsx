import {
  Container,
  Group,
  Image,
  SimpleGrid,
  Text,
  Title,
  createStyles,
} from "@mantine/core";

import logoUrl from "./logo-b.png";

const mockdata = [
  {
    imageUrl:
      "https://ipfs.io/ipfs/bafkreibln5vsb7okplp246ldbbhxehxgl4suoodf4hzxhr4hog5k3csrbi",
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },
  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const features = mockdata.map((feature, index) => (
    <Image
      src={feature.imageUrl}
      key={index}
      radius="md"
      fit="contain"
      height={200}
    />
  ));

  return (
    <Container size="md" py="xl">
      <Group position="center">
        <Image src={logoUrl} height={60} fit="contain" radius="md" />
      </Group>
      <Title order={2} className={classes.title} align="center" mt="sm">
        {`Welcome to the annual "FirmlyFinance Conference"`}
      </Title>
      <Text color="dimmed" align="center" mt="sm">
        Connect your wallet to see if you are eligible to attend the conference.
      </Text>
      <Text
        color="dimmed"
        className={classes.description}
        align="center"
        mt="xs"
      >
        The following NFTs are accepted as entrance ticket:
      </Text>
      <SimpleGrid
        cols={mockdata.length}
        spacing="xl"
        mt="xs"
        breakpoints={[{ maxWidth: "xs", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
