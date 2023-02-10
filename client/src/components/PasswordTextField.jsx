import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Field, useField } from 'formik';
import { useState } from 'react';
import {
  InputRightElement,
  Button,
  InputGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

/* ------------------------------------------------------ */

const PasswordTextField = ({ label, type, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField({ type, name, placeholder });
  return (
    <FormControl isInvalid={meta.error && meta.touched} mb="6">
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <InputGroup>
        <Field
          as={Input}
          {...field}
          type={showPassword ? 'text' : type}
          name={name}
          placeholder={placeholder}
        />
        <InputRightElement h="full">
          <Button
            variant="ghost"
            onClick={() =>
              setShowPassword((showPassword) => !showPassword)
            }
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

PasswordTextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default PasswordTextField;
