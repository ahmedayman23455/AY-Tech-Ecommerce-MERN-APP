import React from 'react';
import {
  Box,
  Stack,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UsersTab from '../components/UsersTab';
/* ------------------------------------------------------ */
const AdminConsoleScreen = () => {
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();

  return userInfo && userInfo.role === 'admin' ? (
    <Box p="20px">
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
      >
        <Stack
          pr={{ base: 0, md: 14 }}
          spacing={{ base: 8, md: 10 }}
          flex="1.5"
          md={{ base: 12, md: 'none' }}
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Admin Console
          </Heading>

          <Tabs size="md" variant="enclosed">
            <TabList>
              <Tab>Users</Tab>
              <Tab>Products</Tab>
              <Tab>Reviews</Tab>
              <Tab>Orders</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <UsersTab />
              </TabPanel>
              <TabPanel>
                <p>Products</p>
              </TabPanel>
              <TabPanel>
                <p>Reviews</p>
              </TabPanel>
              <TabPanel>
                <p>Orders</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default AdminConsoleScreen;
