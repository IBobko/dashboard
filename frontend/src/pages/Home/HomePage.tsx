import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";

interface Item {
  companyName: string;
  rate: number;
  from: string;
  to: string;
}

function HomePage() {
  const [data, setData] = useState<Item[] | null>(null);

  useEffect(() => {

  }, []);

  return (
    <Box>
      <Flex bg="teal.500" p={4} color="white">
        <Heading flexGrow={1}>Igor Bobko's dashboard</Heading>
      </Flex>
      <Box p={4}>
        <Heading as="h2" size="xl" mb={4}>
          Welcome!
        </Heading>
        <Link href="/mnist" mr={2}>
          MNIST
        </Link>
        <Link href="/telegram">
          Telegram
        </Link>
        <Link href="/chart">
          Chart
        </Link>
      </Box>
    </Box>
  );
}

export default HomePage;
