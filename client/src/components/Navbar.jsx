import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  VStack,
} from '@chakra-ui/react';

import { Link as ReactLink, NavLink } from 'react-router-dom';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { GiTechnoHeart } from 'react-icons/gi';
import PropTypes from 'prop-types';

/* ------------------------------------------------------ */
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const links = [
    {
      linkName: 'Products',
      path: '/products',
    },
    {
      linkName: 'ShoppingCart',
      path: '/cart',
    },
  ];

  /* ------------------ NavLink Component ----------------- */
  const NavLink = (props) => {
    const { path, children } = props;
    return (
      <Link
        as={ReactLink}
        to={path}
        borderRadius="md"
        px={2}
        py={2}
        rounded="md"
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
      >
        {children}
      </Link>
    );
  };

  NavLink.propTypes = {
    path: PropTypes.string,
    children: PropTypes.any,
  };
  /* ----------------------- return ----------------------- */
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack>
          <Link as={ReactLink} to="/">
            <Flex alignItems="center">
              <Icon
                as={GiTechnoHeart}
                h={6}
                w={6}
                color="orange.400"
              />
              <Text fontWeight="extrabold" fontSize="lg" ml={1}>
                Tech Store
              </Text>
            </Flex>
          </Link>

          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems="center">
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            borderRadius="md"
            bg="transparent"
            px={2}
            py={2}
            rounded="md"
            _hover={{
              textDecoration: 'none',
              bg: useColorModeValue('gray.200', 'gray.700'),
            }}
          />

          <HStack>
            <Button
              as={ReactLink}
              variant="link"
              to="/login"
              p={2}
              fontSize="sm"
              fontWeight={400}
              color="inherit"
            >
              Sign In
            </Button>
            <Button
              as={ReactLink}
              to="/registration"
              m={2}
              fontSize="sm"
              fontWeight={600}
              bg="orange.500"
              _hover={{ bg: 'orange.400' }}
              color="white"
              display={{ base: 'none', md: 'flex' }}
            >
              Sign Up
            </Button>
          </HStack>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack spacing={4}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}

            <NavLink path="/registration" key="Sign Up">
              Sign Up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
