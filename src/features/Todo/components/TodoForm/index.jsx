import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../../../components/form-controls/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm(props) {
  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Please enter title")
      .min(5, "Title is too short"),
  });
  const form = useForm({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, reset } = form;

  const handleOnSubmit = (values) => {
    const { onSubmit } = props;

    if (onSubmit) {
      onSubmit(values);
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <InputField
        {...register("title")}
        label="Todo"
        form={form}
      />
    </form>
  );
}

export default TodoForm;
