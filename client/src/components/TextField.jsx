import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Field, useField } from 'formik';
import PropTypes from 'prop-types';

/* ---------------------- TextField --------------------- */
const TextField = ({ label, type, name, placeholder }) => {
  const [field, meta] = useField({ type, name, placeholder });

  return (
    <FormControl isInvalid={meta.error && meta.touched} mb="6">
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <Field
        as={Input}
        {...field}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextField;
