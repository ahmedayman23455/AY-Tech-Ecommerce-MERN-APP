import React, { useState, useRef } from 'react';
import {
  Tr,
  Td,
  Button,
  Image,
  VStack,
  Textarea,
  Tooltip,
  Input,
  useToast,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Badge,
  useDisclosure,
} from '@chakra-ui/react';

import { MdOutlineDataSaverOn } from 'react-icons/md';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import {
  updateProduct,
  deleteProduct,
  resetErrorAndRemovel,
} from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';
import PropTypes from 'prop-types';
/* ------------------------------------------------------ */
const ProductTableItem = ({ product }) => {
  const cancelRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [brand, setBrand] = useState(product.brand);
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const [isNew, setIsNew] = useState(product.isNew);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image.substring(8));
  const dispatch = useDispatch();

  //   onSaveProduct
  const onSaveProduct = () => {
    dispatch(
      updateProduct(product._id, {
        brand,
        name,
        category,
        stock,
        price,
        isNew,
        description,
        image: `/images/${image}`,
      }),
    );

    dispatch(resetErrorAndRemovel());
  };

  // openDeleteConfirmBox
  const openDeleteConfirmBox = (user) => {
    onOpen();
  };

  return (
    <>
      <Tr>
        <Td>
          <Tooltip label={product.image} fontSize="sm">
            <Image
              src={product.image}
              boxSize="100px"
              fit="contain"
            />
          </Tooltip>

          <input
            type="text"
            size="sm"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Td>

        <Td>
          <Textarea
            w="270px"
            h="120px"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="sm"
          ></Textarea>
        </Td>

        <Td>
          <Flex direction="column" gap="2">
            <Input
              size="sm"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <Input
              size="sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Flex>
        </Td>

        <Td>
          <Flex direction="column" gap="2">
            <Input
              size="sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Input
              size="sm"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Flex>
        </Td>

        <Td>
          <Flex direction="column" gap="2">
            <Input
              size="md"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />

            <FormControl display="flex" alignItems="center">
              <FormLabel
                htmlFor="productIsNewFlag"
                mb="0"
                fontSize="sm"
              >
                Enable
                <Badge
                  rounded="full"
                  px="1"
                  mx="1"
                  fontSize=".8em"
                  colorScheme="green"
                >
                  New
                </Badge>
                badge ?
              </FormLabel>
              <Switch
                id="productIsNewFlage"
                onChange={(e) => setIsNew((prevState) => !prevState)}
                isChecked={isNew}
              />
            </FormControl>
          </Flex>
        </Td>

        <Td>
          <VStack>
            <Button
              colorScheme="red"
              w="160px"
              variant="outline"
              onClick={openDeleteConfirmBox}
            >
              <DeleteIcon mr="5px" />
              Remove Product
            </Button>
            <Button
              colorScheme="orange"
              w="160px"
              variant="outline"
              onClick={onSaveProduct}
            >
              <MdOutlineDataSaverOn style={{ marginRight: '5px' }} />
              Save Changes
            </Button>
          </VStack>
        </Td>
      </Tr>

      <ConfirmRemovalAlert
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        itemToDelete={product}
        itemType="product"
        deleteAction={deleteProduct}
      />
    </>
  );
};

ProductTableItem.propTypes = {
  product: PropTypes.object,
};
export default ProductTableItem;
