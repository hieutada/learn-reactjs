import {
  Box,
  FormHelperText,
  IconButton,
  Input,
  makeStyles,
  Typography
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {},

  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '200px',
  },
}));

function QuantityField(props) {
  const classes = useStyles();

  const { form, name, label, disabled } = props;
  const { setValue } = form;
  const { errors } = form.formState;
  const hasError = !!errors[name];

  return (
    <FormControl fullWidth margin="normal" error={hasError} size="small">
      <Typography>{label}</Typography>

      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Box className={classes.box}>
            <IconButton
              onClick={() => {
                const number = Number.parseInt(value);
                setValue(name, number > 1 ? number - 1 : 1);
              }}
            >
              <RemoveCircleOutline />
            </IconButton>

            <Input
              id={name}
              type="number"
              disabled={disabled}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />

            <IconButton
              onClick={() => {
                const number = Number.parseInt(value);
                setValue(name, number ? number + 1 : 1);
              }}
            >
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
