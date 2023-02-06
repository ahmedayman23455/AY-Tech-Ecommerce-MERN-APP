import React from 'react';
import {
  Wrap,
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '../redux/slices/cart';
import CartItem from '../components/CartItem';
import CartOrderSummary from '../components/CartOrderSummary';
/* ------------------------------------------------------ */
const CartScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, cart } = useSelector(cartSelector);
  return (
    <Flex
      direction="column"
      spacing={50}
   
      mt={8}
      mx={4}
    >
      {loading && (
        <Stack direction="row" spacing={4} mt="2rem" justifyContent='center'>
          <Spinner
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.500"
            size="xl"
          />
        </Stack>
      )}

      {error && (
        <Alert status="error" variant="subtle" w="full">
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {cart.length <= 0 && (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Your cart is empty</AlertTitle>
          <AlertDescription>
            {
              <Link as={ReactLink} to="/products">
                Click here to see our products
              </Link>
            }
          </AlertDescription>
        </Alert>
      )}

      {cart.length > 0 && !error && (
        <Flex
          gap={10}
          direction={{ base: 'column', md: 'row' }}
          maxW={{ base: '3xl', lg: '7xl' }}
          mx="auto"
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}
            spacing={{ base: '8', md: '16' }}
          >
            <Stack spacing={{ base: '8', md: '10' }} flex="2">
              <Heading fontSize="2xl" fontWeight="extrabold">
                Shopping Cart
              </Heading>

              <Stack spacing={6}>
                {cart.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </Stack>
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link
                as={ReactLink}
                to="/products"
                color={mode('orange.500', 'orange.200')}
              >
                Continue Shopping
              </Link>
            </HStack>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default CartScreen;
