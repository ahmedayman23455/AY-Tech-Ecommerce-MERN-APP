import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
} from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../redux/slices/user';
import { useLocation, NavLink, Navigate } from 'react-router-dom';
import TextField from '../components/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  updateProfile,
  resetUpdateSuccess,
} from '../redux/actions/userActions';
/* ------------------------------------------------------ */
const ProfileScreen = () => {
  const { userInfo, error, loading, updateSuccess } =
    useSelector(userSelector);
  const dispatch = useDispatch();
  const toast = useToast();
  const location = useLocation();

  useEffect(() => {
    if (updateSuccess) {
      toast({
        description: 'Profile Saved.',
        status: 'success',
        isClosable: true,
      });
    }
  }, [updateSuccess, toast]);

  return userInfo ? (
    <Formik
      initialValues={{ email: userInfo.email, name: userInfo.name }}
      validationSchema={Yup.object({
        name: Yup.string().required('An name is required.'),
        email: Yup.string()
          .email('Invalid email.')
          .required('An email address is required.'),
      })}
      onSubmit={(values) => {
        dispatch(resetUpdateSuccess());
        dispatch(updateProfile(values.name, values.email));
      }}
    >
      {(formik) => (
        <Box
          minH="100vh"
          maxW={{ base: '3xl', lg: '7xl' }}
          mx="auto"
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}
            spacing={{ base: '7', lg: '0' }}
          >
            <Stack
              pr={{ base: '0', md: '10' }}
              flex="1.5"
              mb={{ base: '2xl', md: 'none' }}
            >
              <Heading fontSize="2xl" fontWeight="extrabold" mb="5">
                Profile
              </Heading>

              <Stack spacing="6">
                <Stack
                  spacing="6"
                  as="form"
                  onSubmit={formik.handleSubmit}
                >
                  {error && (
                    <Alert
                      status="error"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <AlertIcon />
                      <AlertTitle>We are sorry!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Stack spacing="5">
                    <FormControl>
                      <TextField
                        type="text"
                        name="name"
                        placeholder="Your first and last name."
                        label="Full name"
                      />
                      <TextField
                        type="text"
                        name="email"
                        placeholder="you@example.com"
                        label="Email"
                      />
                    </FormControl>
                  </Stack>

                  <Stack spacing="6">
                    <Button
                      color="orange"
                      size="lg"
                      fontSize="md"
                      isLoading={loading}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Flex direction="column" align="center" flex="1">
              <Card>
                <CardHeader>
                  <Heading size="md">User Report</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing={4}>
                    <Box pt="2" fontSize="sm">
                      Registered on
                      {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to="/login" replace="true" state={{ from: location }} />
  );
};

export default ProfileScreen;
