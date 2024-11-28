import CloseIcon from "@mui/icons-material/Close";
import { IconButton, ThemeProvider } from "@mui/material";
import { SnackbarKey, SnackbarProvider, useSnackbar } from "notistack";
import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./components/common/routes/AppRoutes";
import { colors, theme } from "./config/theme";
import { store } from "./redux/store";
import { navigation } from "./utils/navigation";

const SnackbarCloseButton = ({ snackbarKey }: { snackbarKey: SnackbarKey }) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)} sx={{color:colors.white}}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};
const App = () => {
  const navigate = useNavigate();
  navigation.navigate = navigate;

  return (
    <Provider store={store}>
      <SnackbarProvider
        preventDuplicate
        hideIconVariant
        action={(snackbarKey) => (
          <SnackbarCloseButton snackbarKey={snackbarKey} />
        )}
      />
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
