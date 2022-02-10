import * as React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Page } from '../../components/Page';

const Dashboard = () => {
  return (
    <Page>
      <Box textAlign="center" fontSize="xl" p={8}>
        <Text>Hello, world</Text>
      </Box>
    </Page>
  );
};

export default Dashboard;
