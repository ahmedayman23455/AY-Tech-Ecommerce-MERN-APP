import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';

import { TbTruckDelivery } from 'react-icons/tb';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  resetProductError,
} from '../redux/actions/productActions';

import { deleteReview } from '../redux/actions/adminActions';
import ProductReviews from './ProductReviews';
/* ------------------------------------------------------ */
const ReviewsTab = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { products, reviewRemoval } = useSelector(
    (state) => state.products,
  );
  const { loading, error } = useSelector((state) => state.admin);

  // useEffect
  useEffect(() => {
    dispatch(getProducts());
    if (reviewRemoval) {
      toast({
        description: 'Review has been removed.',
        status: 'success',
        isClosable: true,
      });
    }

    dispatch(resetProductError());
  }, [dispatch, reviewRemoval, toast]);

  // onRemoveReview
  const onRemoveReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
  };

  // return
  return (
    <Box>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify="center">
          <Stack direction="row" spacing="4">
            <Spinner
              mt="20"
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.500"
              size="xl"
            />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          {products.length > 0 &&
            products.map((product) => (
              <ProductReviews product={product} key={product._id}>
                {product.name}
              </ProductReviews>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default ReviewsTab;
