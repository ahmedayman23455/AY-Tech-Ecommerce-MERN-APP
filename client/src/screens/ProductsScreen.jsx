import React, { useEffect } from 'react';
import { Center, Wrap, WrapItem } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { productsSelector } from '../redux/slices/productsSlice';
import {
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
/* ------------------------------------------------------ */
const ProductsScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(productsSelector);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Wrap
      spacing={50}
      justify="center"
      minHeight="100vh"
      mt={8}
      mx={4}
    >
      {loading && (
        <Stack direction="row" spacing={4} mt="2rem">
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

      {products &&
        !error &&
        products.map((product) => (
          <WrapItem key={product._id}>
            <Center w={250} h={550}>
              <ProductCard product={product} />
            </Center>
          </WrapItem>
        ))}
    </Wrap>
  );
};

export default ProductsScreen;
