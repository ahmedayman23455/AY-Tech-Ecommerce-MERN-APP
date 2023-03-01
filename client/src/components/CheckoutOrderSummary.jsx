import React from 'react';

import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Box,
  Link,
  Divider,
  useToast,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { PhoneIcon, EmailIcon, ChatIcon } from '@chakra-ui/icons';
import {
  createOrder,
  resetOrder,
} from '../redux/actions/orderActions';
import { useEffect, useState, useCallback } from 'react';
import CheckoutItem from './CheckoutItem';

import { resetCart } from '../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
/* ------------------------------------------------------ */
const CheckoutOrderSummary = () => {
  const colorMode = mode('gray.600', 'gray.400');
  const cartItems = useSelector((state) => state.cart);
  const { cart, subTotal, expressShipping } = cartItems;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const shippingInfo = useSelector((state) => state.order);
  const { error, shippingAddress } = shippingInfo;
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const shipping = useCallback(
    () =>
      expressShipping === 'true'
        ? 14.99
        : subTotal <= 1000
        ? 4.99
        : 0,
    [expressShipping, subTotal],
  );

  const total = useCallback(
    () =>
      Number(
        shipping() === 0
          ? Number(subTotal)
          : Number(subTotal) + shipping(),
      ).toFixed(2),
    [shipping, subTotal],
  );

  useEffect(() => {
    if (!error) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [
    error,
    shippingAddress,
    total,
    expressShipping,
    shipping,
    dispatch,
  ]);

  const onPaymentSuccess = async (data) => {
    dispatch(
      createOrder({
        orderItems: cart,
        shippingAddress,
        shippingPrice: shipping(),
        totalPrice: total(),
        userInfo,
      }),
    );
    dispatch(resetOrder());
    dispatch(resetCart());
    navigate('/order-success');
  };

  const onPaymentError = (error) => {
    toast({
      description:
        'Something went wrong during the payment process. Please try again or make sure that your PayPal account balance is enough for this purchase.',
      status: 'error',

      duration: '600000',
      isClosable: true,
    });
  };

  return (
    <Stack spacing="8" rounded="xl" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>
      {cart.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}

      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontWeight="medium" color={colorMode}>
            SubTotal
          </Text>
          <Text fontWeight="medium" color={colorMode}>
            {subTotal}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={colorMode}>
            Shipping
          </Text>
          <Text fontWeight="medium" color={colorMode}>
            {shipping() === 0 ? (
              <Badge
                rounded="full"
                px="2"
                fontSize="0.8em"
                colorScheme="green"
              >
                Free
              </Badge>
            ) : (
              `$${shipping()}`
            )}
          </Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            ${Number(total())}
          </Text>
        </Flex>
      </Stack>
      {/* <PayPalButton
        total={total}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        disabled={buttonDisabled}
      /> */}
      {/* <PaypalButton/> */}
      <Stack>
        <Button
          colorScheme="green"
          size="lg"
          isDisabled={buttonDisabled}
          onClick={onPaymentSuccess}
        >
          Payment Successful
        </Button>
        <Button
          colorScheme="red"
          size="lg"
          isDisabled={buttonDisabled}
          onClick={onPaymentError}
        >
          Payment Failed
        </Button>
      </Stack>

      <Box align="center">
        <Text fontSize="sm">
          Have questions? or need help to complete your order?
        </Text>
        <Flex
          justifyContent="center"
          color={mode('blue.500', 'blue.100')}
        >
          <Flex align="center">
            <ChatIcon />
            <Text m="2">Live Chat</Text>
          </Flex>
          <Flex align="center">
            <PhoneIcon />
            <Text m="2">Phone</Text>
          </Flex>
          <Flex align="center">
            <EmailIcon />
            <Text m="2">Email</Text>
          </Flex>
        </Flex>
      </Box>
      <Divider bg={mode('gray.400', 'gray.800')} />
      <Flex justifyContent="center" my="6" fontWeight="semibold">
        <p>or</p>
        <Link as={ReactLink} to="/products" ml="1">
          Continue Shopping
        </Link>
      </Flex>
    </Stack>
  );
};

export default CheckoutOrderSummary;
