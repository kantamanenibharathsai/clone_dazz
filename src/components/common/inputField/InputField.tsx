import { Box, BoxProps, TextFieldProps, TypographyProps } from "@mui/material";
import { ReactNode } from "react";
import { Input, Title } from "./InputFieldStyles";

interface InputFieldProps {
  fieldName?: string | ReactNode;
  inputProps?: TextFieldProps;
  boxProps?: BoxProps;
  textProps?: TypographyProps;
}

export const InputField = ({
  fieldName,
  inputProps,
  boxProps,
  textProps,
}: InputFieldProps) => {
  return (
    <Box {...boxProps}>
      {fieldName && <Title {...textProps}>{fieldName}</Title>}
      <Input {...inputProps} />
    </Box>
  );
};
