import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, type, name, label, disabled } = props;
  const { errors } = form.formState;
  const hasError = !!errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          disabled={disabled}
          error = {hasError}
          helperText={errors[name]?.message}
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
}

export default InputField;
