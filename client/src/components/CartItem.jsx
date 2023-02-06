import React from 'react';
import {
  Flex,
  Select,
  useColorModeValue as mode,
  Stack,
  Box,
  Image,
  Text,
  CloseButton,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/actions/cartActions';
import PropTypes from 'prop-types';
import { removeCartItem } from '../redux/actions/cartActions';
/* ------------------------------------------------------ */
const CartItem = (props) => {
  const { cartItem } = props;

  const { name, image, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch();

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      gap="3rem"
    >
      <Flex gap={4} width="full">
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        ></Image>

        <Box pt="4">
          <Stack spacing=".5">
            <Text fontWeight="medium"> {name} </Text>
          </Stack>
        </Box>
      </Flex>

      <Flex
        w="full"
        mt={{ base: '4', md: '0' }}
        align={{ base: 'center', md: 'baseline' }}
        justify="space-between"
        display="flex"
      >
        <Select
          maxW="64px"
          focusBorderColor={mode('orange.500', 'orange.200')}
          value={qty}
          onChange={(e) => dispatch(addCartItem(id, e.target.value))}
        >
          {[...Array(stock).keys()].map((x) => {
            return <option key={x + 1}> {x + 1} </option>;
          })}
        </Select>
        <Text fontWeight="bold"> ${price}</Text>
        <CloseButton onClick={() => dispatch(removeCartItem(id))} />
      </Flex>
    </Flex>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object,
};
export default CartItem;
