import React, { useState, useEffect } from 'react';
import productReviews from './ProductReviews';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReviewsOfProduct,
  deleteReview,
} from '../redux/actions/adminActions';

import {
  Textarea,
  Flex,
  Box,
  Spacer,
  Text,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

/* ------------------------------------------------------ */
const ProductReviews = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const { reviewRemoval } = useSelector((state) => state.products);

  useEffect(() => {
    const ReviewsPromise = dispatch(getReviewsOfProduct(product._id));
    ReviewsPromise.then((data) => setReviews(data.data));
  }, [dispatch]);

  const onRemoveReview = (review) => {
    dispatch(deleteReview(review._id));
  };

  return (
    <Box key={product._id}>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1">
                <Flex>
                  <Text mr="8px" fontWeight="bold">
                    {product.name}
                  </Text>
                  <Spacer />
                  <Text mr="8px" fontWeight="bold">
                    ({reviews.length} Reviews)
                  </Text>
                </Flex>
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel pb="4">
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Username</Th>
                    <Th>Rating</Th>
                    <Th>Review</Th>
                    <Th>Created</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {reviews.map((review) => (
                    <Tr key={review._id}>
                      <Td>{review.user.name}</Td>
                      <Td>{review.rating}</Td>
                      <Td>
                        <Textarea
                          isDisabled
                          value={review.review}
                          size="sm"
                        />
                      </Td>
                      <Td>
                        {new Date(review.createdAt).toDateString()}
                      </Td>
                      <Td>
                        <Button
                          variant="outline"
                          colorScheme="red"
                          onClick={() => onRemoveReview(review)}
                        >
                          Remove Review
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

ProductReviews.propTypes = {
  product: PropTypes.object,
};
export default ProductReviews;
