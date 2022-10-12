import {
  Button,
  Center,
  Container,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { IconBrandCoinbase } from "@tabler/icons";
import { BigNumber, ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";

import { erc1155Abi } from "../../constants/abi";
import { useWallet } from "../../hooks/wallet";

const TOKEN_ID = 2;
const ZERO_BIG_NUMBER = BigNumber.from(0);

export default function Checkin() {
  const { account, connectWallet, ethersProvider } = useWallet();
  const [balance, setBalance] = useState(undefined);

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

  // Flag telling if the user is eligible for the conference
  const isEligible = useMemo(() => {
    return balance != null && balance.gt(ZERO_BIG_NUMBER);
  }, [balance]);

  // Fetch the wallet's balance (if connected) for the specific ERC-1155 token
  useEffect(() => {
    if (account == null) {
      return;
    }
    async function checkBalance() {
      const signer = ethersProvider.getSigner(account);
      const erc1155Contract = new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        erc1155Abi,
        signer,
      );
      const balance = await erc1155Contract.balanceOf(account, TOKEN_ID);
      setBalance(balance);
    }
    checkBalance();
  }, [account]);

  const handleConnectButtonClick = useCallback(async () => {
    await connectWallet();
  });

  return (
    <Container size="xs" pb="xl">
      <Center>
        {account != null && (
          <Button
            variant="outline"
            leftIcon={<IconBrandCoinbase />}
            mt="md"
            size="md"
            radius="xl"
          >
            {accountShortForm}
          </Button>
        )}
        {account === null && (
          <Button
            color="blue"
            fullWidth
            mt="md"
            size="md"
            radius="xl"
            onClick={handleConnectButtonClick}
          >
            Check-in with Coinbase Wallet
          </Button>
        )}
      </Center>
      <Space h="md" />
      {balance != null && (
        <Paper radius="md" withBorder p="lg">
          <Title align="center" size={64}>
            {isEligible ? "🥳" : "😞"}
          </Title>
          <Title align="center" order={1} mt="md">
            {isEligible ? "Congrats!" : "Sorry..."}
          </Title>
          {isEligible && (
            <Text align="center" color="dimmed" mt="sm">
              You have the{" "}
              <Text color="yellow" inherit component="span">
                {`"RockSolid golden badge"`}
              </Text>
              ! Welcome!
            </Text>
          )}
          {!isEligible && (
            <Text align="center" color="dimmed" mt="sm">
              {"You don't have any required NFTs for the conference."}
            </Text>
          )}
        </Paper>
      )}
    </Container>
  );
}
