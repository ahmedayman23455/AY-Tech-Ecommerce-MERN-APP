import React, { useEffect, useRef } from 'react';
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';

import {
  getProducts,
  resetProductError,
} from '../redux/actions/productActions';

import ProductTableItem from './ProductTableItem';
import AddNewProduct from './AddNewProduct';

/* ------------------------------------------------------ */
const ProductsTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.admin);
  const { products, productUpdate } = useSelector(
    (state) => state.products,
  );

  // useEffect
  useEffect(() => {
    dispatch(getProducts());

    if (productUpdate) {
      toast({
        description: 'Product has been updated.',
        status: 'success',
        isClosable: true,
      });
    }

    dispatch(resetProductError());
  }, [dispatch, toast, productUpdate]);

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
        products && (
          <Box>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="right">
                      <Box>
                        <Text mr="8px" fontWeight="bold">
                          Add A New Product
                        </Text>
                      </Box>
                    </Box>
                  </AccordionButton>
                </h2>

                <AccordionPanel pb="4">
                  <Table>
                    <Tbody><AddNewProduct/></Tbody>
                  </Table>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Table variant="simple" size="lg">
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Description</Th>
                  <Th>Brand & Name</Th>
                  <Th>Category & Price</Th>
                  <Th>Stock & New Badge</Th>
                </Tr>
              </Thead>

              <Tbody>
                {products.length >= 0 &&
                  products.map((product) => {
                    return (
                      <ProductTableItem
                        key={product._id}
                        product={product}
                      />
                    );
                  })}
              </Tbody>
            </Table>
          </Box>
        )
      )}
    </Box>
  );
};

export default ProductsTab;
