import React, { useState } from 'react';
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
  useToast,
  MenuButton,
  MenuDivider,
  Menu,
  MenuItem,
  MenuList,
  Avatar,
} from '@chakra-ui/react';

import { Link as ReactLink, useNavigate } from 'react-router-dom';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from './../redux/slices/user';
import { CgProfile } from 'react-icons/cg';
import {
  MdLocalShipping,
  MdLogout,
  MdOutlineAdminPanelSettings,
} from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';
import { GiTechnoHeart } from 'react-icons/gi';

import { logout } from '../redux/actions/userActions';
import { cartSelector } from './../redux/slices/cart';
/* ------------------ shoppingCartIcon ------------------ */
const ShoppingCartIcon = () => {
  const { cart } = useSelector(cartSelector);
  return (
    <Flex alignItems="center">
      <Icon
        ml="-1.5"
        as={FiShoppingCart}
        h="4"
        w="7"
        alignSelf="center"
      />
      Cart
      <Flex
        justifyContent="cetner"
        alignItems="center"
        fontSize="xs"
        w="5"
        h="5"
        ml="2"
        bgColor="orange.500"
        borderRadius="full"
      >
        <Text textAlign="center" w="full" color="white">
          {cart.length}
        </Text>
      </Flex>
    </Flex>
  );
};

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

/* ----------------------- Navbar ----------------------- */
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isHovering, setIsHovering] = useState(false);
  const { userInfo } = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const links = [
    {
      linkName: 'Products',
      path: '/products',
    },
    {
      linkName: <ShoppingCartIcon />,
      path: '/cart',
    },
  ];

  const logoutHandler = () => {
    dispatch(logout());
    toast({
      description: `You have been logged out.`,
      status: 'success',
      isClosable: true,
    });

    // navigate('/');
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
          <Link
            as={ReactLink}
            to="/"
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Flex alignItems="center">
              <Icon
                color={isHovering ? 'cyan.400' : 'orange.400'}
                as={GiTechnoHeart}
                h={6}
                w={6}
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
            {userInfo ? (
              <HStack ml="2">
                <HStack>
                  <Avatar
                    width="2.6rem"
                    height="2.6rem"
                    name={userInfo.name}
                    borderRadius="1000PX"
                  />

                  <Text textTransform="capitalize">
                    {userInfo.name}
                  </Text>
                </HStack>

                <Menu>
                  <MenuButton
                    px="4"
                    py="2"
                    transition="all .3s"
                    as={Button}
                  >
                    <ChevronDownIcon />
                  </MenuButton>

                  <MenuList>
                    <MenuItem as={ReactLink} to="/profile">
                      <CgProfile />
                      <Text ml="2">Profile</Text>
                    </MenuItem>

                    <MenuItem as={ReactLink} to="/your-orders">
                      <MdLocalShipping />
                      <Text ml="2">Your Orders</Text>
                    </MenuItem>

                    <MenuDivider />

                    <MenuItem onClick={logoutHandler}>
                      <MdLogout />
                      <Text ml="2">Logout</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            ) : (
              <>
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
              </>
            )}
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
