import {
  Button,
  Center,
  Container,
  Loader,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { IconBrandCoinbase } from "@tabler/icons";
import { useCallback, useMemo, useState } from "react";

import { useWallet } from "../../hooks/wallet";
import { get } from "../../utils/request";

const TOKEN_ID = 2;
const TOKEN_AMOUNT = 1;

export default function Reward() {
  const [claimRequestState, setClaimRequestState] = useState("initial");
  const [errMessage, setErrMessage] = useState("error");
  const { account, connectWallet } = useWallet();

  const handleConnectButtonClick = useCallback(async () => {
    const connectedAccount = await connectWallet();
    if (connectedAccount == null) {
      return;
    }

    async function claimNFT() {
      try {
        setClaimRequestState("pending");
        await get({
          endpoint: import.meta.env.VITE_SFF_BACKEND_ENDPOINT,
          path: "/gettoken",
          query: {
            to: connectedAccount,
            id: TOKEN_ID,
            quantity: TOKEN_AMOUNT,
          },
        });
        setClaimRequestState("success");
      } catch (err) {
        console.log("ERROR:" + err.message);
        setErrMessage(err);
        setClaimRequestState("failure");
      }
    }
    claimNFT();
  });

  // Short-form displayed string for wallet address
  // 0xa1b2...c3d4
  const accountShortForm = useMemo(() => {
    if (account == null) {
      return "";
    }
    return `${account.substring(0, 6)}...${account.substring(
      account.length - 4,
    )}`;
  }, [account]);

  return (
    <Container size="xs">
      <Paper radius="md" withBorder p="lg">
        <Title align="center" size={64}>
          🎉
        </Title>
        <Title align="center" order={1} mt="md">
          Congratulations!
        </Title>
        <Text align="center" color="dimmed" mt="xs">
          You are eligible for a Golden Badge.
        </Text>
        <Text align="center" color="dimmed">
          Connect your wallet to receive your{" "}
          <Text color="yellow" inherit component="span">
            {`"RockSolid Golden Badge"`}
          </Text>
        </Text>
        {claimRequestState === "initial" && (
          <Button
            color="blue"
            fullWidth
            mt="xl"
            size="xl"
            onClick={handleConnectButtonClick}
          >
            Connect your Coinbase Wallet
          </Button>
        )}
        {claimRequestState !== "initial" && (
          <Center>
            <Button
              variant="outline"
              leftIcon={<IconBrandCoinbase />}
              mt="md"
              size="md"
              radius="xl"
            >
              {accountShortForm}
            </Button>
          </Center>
        )}
        {claimRequestState === "pending" && (
          <Button color="blue" fullWidth mt="xl">
            <Loader color="white" size="sm" variant="dots" />
          </Button>
        )}
        {claimRequestState === "success" && (
          <Button color="green" fullWidth mt="xl">
            Your Golden Badge is on the way! 🥳
          </Button>
        )}
        {claimRequestState === "failure" && (
          <Button
            color="yellow"
            fullWidth
            mt="xl"
            onClick={handleConnectButtonClick}
          >
            Wallet successfully connected!
            <br />
            But got server error: {`${errMessage}`} 😞
          </Button>
        )}
      </Paper>
    </Container>
  );
}
