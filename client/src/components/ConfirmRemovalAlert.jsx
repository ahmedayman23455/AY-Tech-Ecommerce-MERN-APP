import React from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
/* ------------------------------------------------------ */
const ConfirmRemovalAlert = (props) => {
  const {
    isOpen,
    onClose,
    cancelRef,
    itemToDelete,
    itemType,
    deleteAction,
  } = props;

  const dispatch = useDispatch();

  //   onDeleteItem
  const onDeleteItem = () => {
    dispatch(deleteAction(itemToDelete._id));
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete
            {itemType === 'user' || itemType === 'product'
              ? ' '+  itemToDelete.name
              : itemType === 'order' &&
                ` ${itemToDelete.username?.split(' ')[0]} Order`}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDeleteItem} ml={3}>
              Delete 
               {itemType === 'user' || itemType === 'product'
                ? ' '+ itemToDelete.name
                : itemType === 'order' &&
                  ` ${itemToDelete.username?.split(' ')[0]} Order`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

ConfirmRemovalAlert.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  cancelRef: PropTypes.object,
  itemToDelete: PropTypes.object,
  deleteAction: PropTypes.func,
  itemType: PropTypes.string,
};

export default ConfirmRemovalAlert;
