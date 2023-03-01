import React, { useState, useEffect, useRef } from 'react';
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

import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';

import { useDispatch, useSelector } from 'react-redux';

import {
  getAllUsers,
  deleteUser,
  resetErrorAndRemovel,
} from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';
/* ------------------------------------------------------ */
const UsersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = useRef();
  const [userToDelete, setUserToDelete] = useState({});
  const dispatch = useDispatch();
  const { loading, error, userList, userRemovel } = useSelector(
    (state) => state.admin,
  );
  const { userInfo } = useSelector((state) => state.user);

  // useEffect
  useEffect(() => {
    dispatch(getAllUsers());
    if (userRemovel) {
      toast({
        description: 'User has been removed.',
        status: 'success',
        isClosable: true,
      });
    }
    dispatch(resetErrorAndRemovel());
  }, [userRemovel, dispatch, toast]);

  // openDeleteConfirmBox
  const openDeleteConfirmBox = (user) => {
    setUserToDelete(user);
    onOpen();
  };

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
        userList && (
          <Box>
            <TableContainer overflow="auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th> Name</Th>
                    <Th> Email</Th>
                    <Th> Registered</Th>
                    <Th> Admin</Th>
                    <Th> Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {userList.map((user) => {
                    return (
                      <Tr key={user._id}>
                        <Td>
                          {user.name}
                          {user._id === userInfo._id
                            ? ' (You)'
                            : ''}{' '}
                        </Td>
                        <Td> {user.email}</Td>
                        <Td>
                          {new Date(user.createdAt).toDateString()}
                        </Td>
                        <Td>
                          {user.role === 'admin' ? (
                            <CheckCircleIcon color="blue.500" />
                          ) : (
                            ''
                          )}
                        </Td>

                        <Td>
                          <Button
                            variant="outline"
                            isDisabled={user._id === userInfo._id}
                            onClick={() => openDeleteConfirmBox(user)}
                          >
                            <DeleteIcon mr="5px" /> Remove User
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>

            <ConfirmRemovalAlert
              isOpen={isOpen}
              onClose={onClose}
              cancelRef={cancelRef}
              itemToDelete={userToDelete}
              itemType="user"
              deleteAction={deleteUser}
            />
          </Box>
        )
      )}
    </Box>
  );
};

export default UsersTab;
