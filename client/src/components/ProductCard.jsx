import React, { useState } from 'react';
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  Button,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link as ReactLink } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

/* ----------------------- Rating ----------------------- */
const Rating = ({ rating, numReviews }) => {
  const [iconSize, setIconSize] = useState('14px');
  return (
    <Flex>
      <HStack spacing="2px">
        <StarIcon size={iconSize} w="14px" color="orange.500" />
        <StarIcon
          size={iconSize}
          w="14px"
          color={rating >= 2 ? 'orange.500' : 'grey.200'}
        />
        <StarIcon
          size={iconSize}
          w="14px"
          color={rating >= 3 ? 'orange.500' : 'grey.200'}
        />
        <StarIcon
          size={iconSize}
          w="14px"
          color={rating >= 4 ? 'orange.500' : 'grey.200'}
        />
        <StarIcon
          size={iconSize}
          w="14px"
          color={rating >= 5 ? 'orange.500' : 'grey.200'}
        />
      </HStack>
      <Text fontSize="md" fontWeight="bold" ml="4px">
        {`${numReviews} ${numReviews === 1 ? 'Review' : 'Reviews'}`}
      </Text>
    </Flex>
  );
};
Rating.propTypes = {
  rating: PropTypes.number,
  numReviews: PropTypes.number,
};
/* --------------------- ProductCard -------------------- */
const ProductCard = ({ product }) => {
  return (
    <Stack
      p={2}
      spacing="3px"
      bg={useColorModeValue('white', 'gray.800')}
      minW="240px"
      h="450px"
      borderWidth="1px"
      shadow="lg"
      position="relative"
    >
      {product.isNew && (
        <Circle
          size="10px"
          position="absolute"
          top={2}
          right={2}
          bg="green.300"
        />
      )}
      {product.stock <= 0 && (
        <Circle
          size="10px"
          position="absolute"
          top={2}
          right={2}
          bg="red.300"
        />
      )}

      <Image src={product.image} alt={product.name} roundedTop="lg" />

      <Box flex="1" maxH="5" alignItems="baseline">
        {product.stock <= 0 && (
          <Badge
            rounded="full"
            px="2"
            fontSize=".8em"
            colorScheme="red"
          >
            Sold out
          </Badge>
        )}
        {product.isNew <= 0 && (
          <Badge
            rounded="full"
            px={2}
            ml={2}
            fontSize=".8em"
            colorScheme="green"
          >
            New
          </Badge>
        )}
      </Box>

      <Flex mt={1} justifyContent="space-between" alignItems="center">
        <Link
          as={ReactLink}
          to={`product${product._id}`}
          pt={2}
          cursor="pointer"
        >
          <Box
            fontSize="2xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
          >
            {product.name}
          </Box>
        </Link>
      </Flex>

      <Flex justify="space-between" alignContent="center" py={2}>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        />
      </Flex>

      <Flex justify="space-between">
        <Box
          fontSize="2xl"
          color={useColorModeValue('gray.800', 'white')}
        >
          <Box
            as="span"
            color={useColorModeValue('gray.600', 'white')}
            fontSize="lg"
            fontWeight="medium"
          >
            $
          </Box>
          {product.price.toFixed(2)}
        </Box>

        <Tooltip
          label="Add To Cart"
          bg="white"
          placement="top"
          color="gray.800"
          fontSize="1.2em"
        >
          <Button
            variant="ghost"
            display="flex"
            isDisabled={product.stock <= 0 ? true : false}
          >
            <Icon
              as={FiShoppingCart}
              h={7}
              w={7}
              alignSelf="center"
            ></Icon>
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
