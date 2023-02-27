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
  const { isOpen, onClose, cancelRef, userToDelete, deleteAction } =
    props;

  const dispatch = useDispatch();

  //   onDeleteItem
  const onDeleteItem = () => {
    dispatch(deleteAction(userToDelete._id));
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
            Delete {userToDelete.name}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDeleteItem} ml={3}>
              Delete {userToDelete.name}
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
  userToDelete: PropTypes.object,
  deleteAction: PropTypes.func,
};

export default ConfirmRemovalAlert;
