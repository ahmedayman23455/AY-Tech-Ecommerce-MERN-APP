import React, { useState, useEffect } from 'react';
import {
  Stack,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Button,
  ListItem,
  UnorderedList,
  Wrap,
  Table,
  Thead,
  Tbody,
  Text,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  getUserOrders,
  resetErrorUser,
} from '../redux/actions/userActions';
/* ------------------------------------------------------ */
const YourOrdersScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo, loading, error, orders } = useSelector(
    (state) => state.user,
  );

  //   useEffect
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, [dispatch, userInfo]);

  //   return
  return userInfo ? (
    <>
      {loading ? (
        <Wrap
          justifyContent="center"
          direction="column"
          align="center"
          mt="20px"
          minH="100vh"
        >
          <Stack direction="row" spacing={4}>
            <Spinner
              mt={20}
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Stack>
        </Wrap>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        orders && (
          <TableContainer
            overflow="auto "
            // max-w="100%"
          >
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Order Id</Th>
                  <Th>Order Date</Th>
                  <Th>Paid Total</Th>
                  <Th>Items</Th>
                  <Th>Print Receipe</Th>
                </Tr>
              </Thead>

              <Tbody>
                {orders.map((order) => {
                  return (
                    <Tr key={order._id}>
                      <Td>{order._id}</Td>

                      <Td>
                        {new Date(order.createdAt).toDateString()}
                      </Td>

                      <Td>{order.totalPrice} via paypal</Td>

                      <Td>
                        {order.orderItems.map((item) => {
                          return (
                            <UnorderedList key={item._id}>
                              <ListItem>
                                {item.qty} x {item.name}
                                <Text
                                  fontWeight="medium"
                                  display="inline"
                                  mx="2"
                                >
                                  ${item.price}
                                </Text>
                                each
                              </ListItem>
                            </UnorderedList>
                          );
                        })}
                      </Td>

                      <Td variant="outline">Receipt</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )
      )}
    </>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default YourOrdersScreen;
