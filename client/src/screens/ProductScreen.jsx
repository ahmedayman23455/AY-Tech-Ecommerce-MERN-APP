import React, { useEffect, useState } from 'react';
import { useParams, Link as ReactLink } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Wrap,
  Stack,
  Spinner,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  Alert,
  useToast,
  Avatar,
  Tooltip,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { MinusIcon, StarIcon, SmallAddIcon } from '@chakra-ui/icons';
import { BiPackage, BiCheckShield, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import products, {
  productsSelector,
  setProduct,
} from '../redux/slices/products';
import { cartSelector } from '../redux/slices/cart';
import { userSelector } from '../redux/slices/user';
import { addCartItem } from '../redux/actions/cartActions';
import { getProduct } from '../redux/actions/productActions';
import TimeAgo from '../utils/TimeAgo';
import {
  createProductReview,
  resetProductError,
} from '../redux/actions/productActions';
/* ------------------------------------------------------ */
const ProductScreen = () => {
  const [amount, setAmount] = useState(1);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, error, product, reviewSend } =
    useSelector(productsSelector);

  const { userInfo } = useSelector(userSelector);
  const { cart } = useSelector(cartSelector);
  const { id } = params;


  // useEffect
  useEffect(() => {
    dispatch(getProduct(id));

    if (reviewSend) {
      toast({
        description: 'Product review saved.',
        status: 'success',
        isClosable: true,
      });

      /* once we done this , The user just want to go to another product and create  
      another review we want to reset that flag   
      */
      dispatch(resetProductError());
      setReviewBoxOpen(false);
    }
  }, [dispatch, id, cart, reviewSend, toast]);

  // hasUserReviewed
  const hasUserReviewed = () =>
    product.reviews.some(
      (review) => review?.user?._id === userInfo?._id,
    );

  // changeAmount
  const changeAmount = (input) => {
    if (input === 'plus') {
      setAmount((prevState) => prevState + 1);
    }
    if (input === 'minus') {
      setAmount((prevState) => prevState - 1);
    }
  };

  // addItem
  const addItem = () => {
    dispatch(addCartItem(product._id, amount));
    toast({
      description: 'Item has been added.',
      status: 'success',
      isClosable: true,
    });
  };

  // return
  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction="row" spacing={4}>
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
        product && (
          <Box
            maxW={{ base: '3xl', lg: '5xl' }}
            mx="auto"
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              align={{ lg: 'flex-start' }}
            >
              <Stack
                pr={{ base: '0', md: '12' }}
                spacing={{ base: '8', md: '4' }}
                flex="1.5"
                mb={{ base: '12', md: 'none' }}
              >
                {product.isNew && (
                  <Badge
                    rounded="full"
                    w="40px"
                    fontSize=".8em"
                    colorScheme="green"
                  >
                    New
                  </Badge>
                )}

                {product.stock === 0 && (
                  <Badge
                    rounded="full"
                    w="min-content"
                    fontSize=".8em"
                    colorScheme="red"
                  >
                    Sold out
                  </Badge>
                )}

                <Heading fontSize="2xl" fontWeight="extrabold">
                  {product.name}
                </Heading>

                <Stack spacing="5">
                  <Box>
                    <Text fontSize="xl"> ${product.price}</Text>
                    <Flex>
                      <HStack spacing="2px">
                        <StarIcon color="blue.500" />
                        <StarIcon
                          color={
                            product.ratingsAverage >= 2
                              ? 'blue.500'
                              : 'gray.200'
                          }
                        />
                        <StarIcon
                          color={
                            product.ratingsAverage >= 3
                              ? 'blue.500'
                              : 'gray.200'
                          }
                        />
                        <StarIcon
                          color={
                            product.ratingsAverage >= 4
                              ? 'blue.500'
                              : 'gray.200'
                          }
                        />
                        <StarIcon
                          color={
                            product.ratingsAverage >= 5
                              ? 'blue.500'
                              : 'gray.200'
                          }
                        />
                      </HStack>
                      <HStack spacing="1rem">
                        <Text
                          fontSize="md"
                          fontWeight="bold"
                          ml="4px"
                          color="blue.500"
                        >
                          {product.ratingsAverage}
                        </Text>

                        <Text
                          fontSize="md"
                          fontWeight="bold"
                          ml="4px"
                        >
                          ({product.ratingsQuantity}
                          {product.ratingsQuantity > 1
                            ? ' Reviews'
                            : ' Review'}
                          )
                        </Text>
                      </HStack>
                    </Flex>
                  </Box>

                  <Text>{product.description} </Text>
                  <Text fontWeight={'bold'}> Quantity</Text>
                  <Flex
                    w="170px"
                    p="5px"
                    border="1px"
                    borderColor="gray.100"
                    alignItems="center"
                    justifyContent="center"
                    gap="1rem"
                  >
                    <Button
                      as="button"
                      isDisabled={amount <= 1}
                      onClick={() => {
                        changeAmount('minus');
                      }}
                    >
                      <MinusIcon />
                    </Button>

                    <Text> {amount} </Text>

                    <Button
                      as="button"
                      isDisabled={amount >= product.stock}
                      onClick={() => {
                        changeAmount('plus');
                      }}
                    >
                      <SmallAddIcon w="20px" h="25px" />
                    </Button>
                  </Flex>
                  <Button
                    isDisabled={product.stock === 0}
                    colorScheme="blue"
                    onClick={addItem}
                  >
                    Add To Cart
                  </Button>
                  <Stack width="270px">
                    <Flex alignItems="center">
                      <BiPackage size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2">
                        Free shipping if order is above $1000
                      </Text>
                    </Flex>

                    <Flex alignItems="center">
                      <BiCheckShield size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2">
                        2 year extended warranty
                      </Text>
                    </Flex>

                    <Flex alignItems="center">
                      <BiSupport size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2">
                        We are here for you 24/7
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex
                direciton="column"
                align="center"
                justify="center"
                flex="1"
                _dark={{ bg: 'gray.900' }}
              >
                <Image
                  mt="auto"
                  mb="auto"
                  src={product.image}
                  alt={product.name}
                />
              </Flex>
            </Stack>

            {userInfo && (
              <>
                <Tooltip
                  fontSize="md"
                  label={
                    hasUserReviewed()
                      ? 'you have already reviewd this product.'
                      : ''
                  }
                >
                  <Button
                    isDisabled={hasUserReviewed()}
                    my="20px"
                    w="140px"
                    colorScheme="blue"
                    onClick={() => {
                      setReviewBoxOpen((prevState) => !prevState);
                    }}
                  >
                    Write a review
                  </Button>
                </Tooltip>

                {reviewBoxOpen && (
                  <Stack mb="20px">
                    <Wrap>
                      <HStack spacing="2px">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setRating(1);
                          }}
                        >
                          <StarIcon color="blue.500" />
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => {
                            setRating(2);
                          }}
                        >
                          <StarIcon
                            color={
                              rating >= 2 ? 'blue.500' : 'gray.200'
                            }
                          />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setRating(3);
                          }}
                        >
                          <StarIcon
                            color={
                              rating >= 3 ? 'blue.500' : 'gray.200'
                            }
                          />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setRating(4);
                          }}
                        >
                          <StarIcon
                            color={
                              rating >= 4 ? 'blue.500' : 'gray.200'
                            }
                          />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setRating(5);
                          }}
                        >
                          <StarIcon
                            color={
                              rating >= 5 ? 'blue.500' : 'gray.200'
                            }
                          />
                        </Button>
                      </HStack>
                    </Wrap>

                    <Textarea
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Enter Your Review"
                    ></Textarea>

                    <Button
                      width="140px"
                      colorScheme="blue"
                      onClick={() => {
                        dispatch(
                          createProductReview(id, review, rating),
                        );
                      }}
                    >
                      Publish Review
                    </Button>
                  </Stack>
                )}
              </>
            )}

            <Stack>
              <Text fontSize="xl" fontWeight="bold" mb="10px">
                Reviews
              </Text>
              {product.reviews.length <= 0 ? (
                <Alert>Not Exist Reviews</Alert>
              ) : (
                <SimpleGrid
                  minChildWidth="300px"
                  spacingX="50px"
                  spacingY="20px"
                >
                  {product.reviews.map((review) => {
                    return (
                      <Stack key={review._id} spacing={2}>
                        <HStack>
                          <Avatar
                            width="2.2rem"
                            height="2.2rem"
                            name={review.user.name}
                            borderRadius="1000PX"
                          />

                          <Text> {review.user.name} </Text>
                        </HStack>

                        <Flex spacing="2px" alignItems="center">
                          <StarIcon color="blue.500" />
                          <StarIcon
                            color={
                              review.rating >= 2
                                ? 'blue.500'
                                : 'gray.200'
                            }
                          ></StarIcon>
                          <StarIcon
                            color={
                              review.rating >= 3
                                ? 'blue.500'
                                : 'gray.200'
                            }
                          ></StarIcon>
                          <StarIcon
                            color={
                              review.rating >= 4
                                ? 'blue.500'
                                : 'gray.200'
                            }
                          ></StarIcon>
                          <StarIcon
                            color={
                              review.rating >= 5
                                ? 'blue.500'
                                : 'gray.200'
                            }
                          ></StarIcon>
                        </Flex>

                        <TimeAgo timestamp={review.createdAt} />

                        <Text>{review.review}</Text>
                      </Stack>
                    );
                  })}
                </SimpleGrid>
              )}
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
};

export default ProductScreen;
