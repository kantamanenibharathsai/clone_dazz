import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  Box,
  capitalize,
  CircularProgress,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { colors } from "../../../config/theme";
import { updateWalletBalance } from "../../../redux/reducers/auth";
import {
  addAmount,
  getBalance,
  getOrderId,
  getTransactions,
} from "../../../redux/reducers/userReducers/myWalletSlice";
import { displayAlert } from "../../../utils/toastMessage";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { useRoutePermissions } from "../../../utils/useRoutePermissions";
import { blockInvalidChar, formateDateWithTime } from "../../../utils/utils";
import { DAdzLogo } from "../../common/assets";
import { CustomButton } from "../../common/customButton/CustomButton";
import DashBoardIndicator from "../../common/dashboardIndicator/DashBoardIndicator";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import { bag } from "../assets/Index";
import { myWalletStyles } from "./MyWalletStyles";

const MyWallet = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const {
    allApiStatus,
    orderId,
    balance,
    transactions,
    pagination,
    allApiError,
    loading,
  } = useAppSelector((state) => state.MyWalletSlice);
  const { fullName, mobileNumber, email } = useAppSelector(
    (state) => state.Auth.user
  );
  const [Razorpay] = useRazorpay();
  const permission = useRoutePermissions();
  const handlerProceedToPayment = () => {
    dispatch(getOrderId(amount));
  };
  const handlerModalClose = () => {
    setOpen(false);
    setAmount("");
  };
  const amountHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if ((Number(value) >= 1 && Number(value) <= 10000000) || value.length === 0)
      setAmount(event.target.value);
  };
  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    dispatch(getTransactions(page));
  };
  const refreshBrowser = () => {
    window.location.reload();
  };

  const enableRazorPay = () => {
    const options: RazorpayOptions = {
      key: process.env.REACT_APP_RAZOR_PAY_KEY + "",
      amount: Number(amount) * 100 + "",
      currency: "INR",
      name: "D'Adz Signage",
      description: "Test Transaction",
      image: `${DAdzLogo}`,
      order_id: orderId,
      handler: async (successData) => {
        const paymentId = successData.razorpay_payment_id;
        await dispatch(addAmount({ paymentId, orderId }));
        dispatch(updateWalletBalance(Number(amount) + balance));
        setTimeout(() => {
          refreshBrowser();
        },300)
      },
      prefill: {
        name: fullName,
        email,
        contact: mobileNumber,
      },
      notes: {
        address: "TR Square, Madhapur",
      },
      theme: {
        color: colors.primary,
      },
      modal: {
        ondismiss() {
          (async () => {
            await dispatch(getTransactions(1));
            refreshBrowser();
          })();
        },
      },
    };
    const razorPay = new Razorpay(options);
    razorPay.open();
    razorPay.on(
      "payment.failed",
      (response: { error: { description: string } }) => {
        displayAlert(response.error.description);
      }
    );
  };
  useEffect(() => {
    if (allApiStatus.getOrderId === "SUCCESS") {
      handlerModalClose();
      enableRazorPay();
    }
    dispatch(getBalance());
    dispatch(getTransactions(1));
  }, [allApiStatus.getOrderId]); //eslint-disable-line
  return (
    <Box>
      <Box sx={myWalletStyles.mainContainer}>
        <Box>
          <DashBoardIndicator image={bag} title="My Wallet" value={balance} />
        </Box>
        <Box>
          {permission.edit && (
            <CustomButton
              sx={myWalletStyles.addMoneyBtn}
              endIcon={<AddRoundedIcon />}
              onClick={() => setOpen(true)}
            >
              Add Money
            </CustomButton>
          )}
        </Box>
      </Box>
      <Box sx={myWalletStyles.transactionsContainer}>
        <Typography sx={myWalletStyles.transactionsText}>
          My Transactions
        </Typography>
        <TableContainer sx={myWalletStyles.tableContainer}>
          <Table size="small" aria-label="a dense table">
            {allApiStatus.getTransactions !== "SUCCESS" && (
              <caption
                style={{
                  textAlign: "center",
                }}
              >
                {allApiStatus.getTransactions === "PENDING" ? (
                  <CircularProgress />
                ) : (
                  <Typography variant="h6">
                    {allApiError.getTransactions}
                  </Typography>
                )}
              </caption>
            )}
            <TableHead>
              <TableRow sx={{ height: "50px" }}>
                <TableCell align="left">Transaction Time</TableCell>
                <TableCell align="center">Credit/Debit</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Order Id</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allApiStatus.getTransactions === "SUCCESS" &&
                transactions.map((row) => (
                  <TableRow
                    key={row.transactionDate}
                    sx={myWalletStyles.detailsTableRow}
                  >
                    <TableCell align="left" height={30}>
                      {formateDateWithTime(row.transactionDate)}
                    </TableCell>
                    <TableCell align="center">
                      {capitalize(row.transactionType)}
                    </TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">
                      {row.orderId ?? "----"}
                    </TableCell>
                    <TableCell align="center">
                      {capitalize(row.paymentStatus)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination.totalPages > 1 && (
          <Stack direction={"row"} justifyContent={"right"} mt={2} mr={2}>
            <Pagination
              count={pagination.totalPages}
              onChange={handlePageChange}
              page={pagination.currentPage}
            />
          </Stack>
        )}
      </Box>
      <ModalStyled
        open={open}
        isbgColor={colors.modalBg}
        onClose={handlerModalClose}
      >
        <Stack width={{ xs: 220 }} rowGap={3}>
          <InputField
            fieldName={
              <Typography ml={-1.1} mb={0.6}>
                Amount
              </Typography>
            }
            inputProps={{
              type: "number",
              placeholder: "Enter Amount",
              sx: { width: "100%" },
              inputProps: { min: 1, max: 100000 },
              onChange: amountHandler,
              value: amount,
              onKeyDown: blockInvalidChar,
            }}
            textProps={{ color: colors.white }}
          />
          <CustomButton
            sx={myWalletStyles.paymentBtn}
            disabled={amount.length === 0 || loading}
            onClick={handlerProceedToPayment}
          >
            Proceed To Payment
            {allApiStatus.getOrderId === "PENDING" && (
              <CircularProgress size={"small"} color="info" />
            )}
          </CustomButton>
        </Stack>
      </ModalStyled>
    </Box>
  );
};

export default MyWallet;
