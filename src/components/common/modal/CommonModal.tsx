import { Box, Modal, ModalProps, Stack, styled } from "@mui/material";
import { modalStyles } from "./ModalStyles";
import { closeSvg } from "../assets";
const StylesModal = styled(Modal)<{
  isClose?: boolean;
  isbgColor?: string;
}>(() => {
  return {};
});

interface IProps extends ModalProps {
  handleClose?: () => void;
  isClose?: boolean;
  isbgColor?: string;
}
export const ModalStyled = (props: IProps) => {
  return (
    <StylesModal {...props}>
      <Box
        sx={
          props.isbgColor
            ? modalStyles.main
            : { ...modalStyles.main, boxShadow: "none",borderRadius:'none' }
        }
      >
        <Stack
          sx={
            props.isbgColor
              ? { ...modalStyles.container, bgcolor: props.isbgColor }
              : {}
          }
        >
          {props.isClose && (
            <Box
              component={"img"}
              src={closeSvg}
              sx={modalStyles.icon}
              onClick={() => props.handleClose && props.handleClose()}
            />
          )}
          {props.children}
        </Stack>
      </Box>
    </StylesModal>
  );
};
