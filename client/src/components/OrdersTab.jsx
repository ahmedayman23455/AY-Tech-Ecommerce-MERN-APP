import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Text,
  Flex,
} from '@chakra-ui/react';

import { TbTruckDelivery } from 'react-icons/tb';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';

import { useDispatch, useSelector } from 'react-redux';

import {
  getAllOrders,
  deleteOrder,
  setDelivered,
  resetErrorAndRemovel,
} from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';
/* ------------------------------------------------------ */
const OrdersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = useRef();
  const [orderToDelete, setOrderToDelete] = useState({});
  const dispatch = useDispatch();
  const { loading, error, orderList, orderRemovel, deliveredFlag } =
    useSelector((state) => state.admin);
  const { userInfo } = useSelector((state) => state.user);

  // useEffect
  useEffect(() => {
    dispatch(getAllOrders());
    if (orderRemovel) {
      toast({
        description: 'Order has been removed.',
        status: 'success',
        isClosable: true,
      });
    }

    if (deliveredFlag) {
      toast({
        description: 'Order has been set to delivered.',
        status: 'success',
        isClosable: true,
      });
    }
    dispatch(resetErrorAndRemovel());
  }, [orderRemovel, dispatch, toast, deliveredFlag]);

  // openDeleteConfirmBox
  const openDeleteConfirmBox = (order) => {
    setOrderToDelete(order);
    onOpen();
  };

  //onSetToDelivered
  const onSetToDelivered = (order) => {
    dispatch(resetErrorAndRemovel());
    dispatch(setDelivered(order?._id, true));
  };

  // return
  return (
    <Box>
      {loading ? (
        <Stack direction="row" spacing={4} justifyContent="center">
          <Spinner
            mt={20}
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        orderList && (
          <Box>
            <TableContainer overflow="auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th> Date</Th>
                    <Th> Name</Th>
                    <Th> Email</Th>
                    <Th> ShippingInfo</Th>
                    <Th> Items Ordered</Th>
                    <Th> Payment Method</Th>
                    <Th> Shipping Price</Th>
                    <Th> Total</Th>
                    <Th> Delivered</Th>
                    <Th> Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {orderList.map((order) => {
                    return (
                      <Tr key={order._id}>
                        <Td>
                          {new Date(order.createdAt).toDateString()}{' '}
                        </Td>

                        <Td>{order.user.name}</Td>

                        <Td>{order.user.email}</Td>

                        <Td>
                          <Text>
                            <i>Address: </i>
                            {order.shippingAddress.address}
                          </Text>

                          <Text>
                            <i>City: </i>
                            {order.shippingAddress.city}
                          </Text>

                          <Text>
                            <i>PostalCode: </i>
                            {order.shippingAddress.postalCode}
                          </Text>

                          <Text>
                            <i>Country: </i>
                            {order.shippingAddress.country}
                          </Text>
                        </Td>

                        <Td>
                          {order.orderItems.map((item) => {
                            return (
                              <Text key={item._id}>
                                {item.qty} * {item.name}
                              </Text>
                            );
                          })}
                        </Td>

                        <Td>Paypal</Td>

                        <Td> {order.shippingPrice} </Td>

                        <Td> {order.totalPrice} </Td>

                        <Td>
                          {order.isDelivered ? (
                            <CheckCircleIcon />
                          ) : (
                            'Pending'
                          )}{' '}
                        </Td>

                        <Td>
                          <Flex direction="column">
                            <Button
                              variant="outline"
                              onClick={() =>
                                openDeleteConfirmBox(order)
                              }
                            >
                              <DeleteIcon mr="5px" />
                              Remove Order
                            </Button>

                            {!order.isDelivered && (
                              <Button
                                mt="4px"
                                variant="outline"
                                onClick={() =>
                                  onSetToDelivered(order)
                                }
                              >
                                <TbTruckDelivery />
                                <Text ml="5px">Delivered</Text>
                              </Button>
                            )}
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>

            <ConfirmRemovalAlert
              isOpen={isOpen}
              onClose={onClose}
              cancelRef={cancelRef}
              itemToDelete={orderToDelete}
              itemType="order"
              deleteAction={deleteOrder}
            />
          </Box>
        )
      )}
    </Box>
  );
};

export default OrdersTab;
