import {
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";

export const Input = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& p": {
    fontSize: 11,
  },
}));

export const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 500,
  fontSize: "clamp(0.875rem, 0.8596rem + 0.0877vw, 1rem)",
  marginLeft: 10,
}));
