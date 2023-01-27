import React from 'react';
import { Center, Wrap, WrapItem } from '@chakra-ui/react';
import { products } from '../products';
import ProductCard from '../components/ProductCard';
/* ------------------------------------------------------ */
const ProductsScreen = () => {
  return (
    <Wrap spacing={50} justify="center" minHeight="100vh">
      {products.map((product) => (
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
