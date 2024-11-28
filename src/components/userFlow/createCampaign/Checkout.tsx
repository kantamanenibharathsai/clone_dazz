import {
  Box,
  Button,
  Divider,
  Pagination,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { roles } from "../../../config/config";
import { translate } from "../../../config/i18n";
import { colors } from "../../../config/theme";
import {
  applyCoupon,
  doCallbackRequest,
  doCheckout,
  fillCheckoutDetails,
  getAvailableCoupons,
  removeAppliedCoupon,
  removeRazorPayOrderId,
  restoreStateToInitial,
  savePaymentOrder,
  updateCampaignDetails,
} from "../../../redux/reducers/userReducers/createCampaignSlice";
import { displayAlert } from "../../../utils/toastMessage";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import { DAdzLogo } from "../../common/assets";
import { CustomButton } from "../../common/customButton/CustomButton";
import DashBoardIndicator from "../../common/dashboardIndicator/DashBoardIndicator";
import { InputField } from "../../common/inputField/InputField";
import { ModalStyled } from "../../common/modal/CommonModal";
import { bag, razorPayIcon } from "../assets/Index";
import { checkoutStyle, mediaByGenre } from "./CommonStyles";
import { getBalance } from "../../../redux/reducers/adAgencyReducers/adAgencyWallet";
import { getBalance as getUserBalance } from "../../../redux/reducers/userReducers/myWalletSlice";
interface CheckoutProps {
  handlePaymentMethod: () => void;
}
const Checkout = ({ handlePaymentMethod }: CheckoutProps) => {
  const {
    couponPagination,
    couponErrorTxt,
    coupons,
    campaignId,
    checkout,
    form,
    loading,
  } = useAppSelector((state) => state.Campaign);
  const { balance: userBalance } = useAppSelector(
    (state) => state.MyWalletSlice
  );
  const { balance: agencyBalance } = useAppSelector(
    (state) => state.adAgencyWallet
  );
  const { roleId } = useAppSelector((state) => state.Auth.user);
  const [showCoupon, setShowCoupon] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [Razorpay] = useRazorpay();

  const handleShowCoupons = () => {
    setShowCoupon((prev) => !prev);
  };

  const refreshBrowser = () => {
    window.location.reload();
  };

  const openRazorPayModal = () => {
    const options: RazorpayOptions = {
      key: process.env.REACT_APP_RAZOR_PAY_KEY as string,
      amount: (Number(checkout.totalAmount) * 100).toString(),
      currency: "INR",
      name: "D'Adz Signage App",
      description: "Making payment for the order",
      image: DAdzLogo,
      order_id: checkout.razorpayOrderId,
      handler: async (successData) => {
        const paymentId = successData.razorpay_payment_id;
        await dispatch(
          savePaymentOrder({
            orderId: checkout.razorpayOrderId,
            paymentId: paymentId,
          })
        );
        dispatch(restoreStateToInitial());
        setTimeout(() => {
          refreshBrowser();
        }, 300);
      },
      theme: {
        color: colors.primary,
      },
      modal: {
        ondismiss() {
          dispatch(removeRazorPayOrderId());
          setTimeout(() => {
            refreshBrowser();
          }, 300);
        },
      },
    };
    const razorPay = new Razorpay(options);
    razorPay.open();
    razorPay.on(
      "paymentFailed",
      (response: { error: { description: string } }) => {
        displayAlert(response.error.description);
      }
    );
  };
  const billDetails = [
    {
      id: 1,
      title: "Price",
      value: checkout.price,
    },
    {
      id: 2,
      title: "Commission",
      value: checkout.commissionAmount,
    },
    {
      id: 3,
      title: `${checkout.gstPercentage} GST`,
      value: checkout.gstAmount,
    },
    {
      id: 4,
      title: "Total Amount",
      value: checkout.totalAmount,
    },
  ];
  const handleApplyCoupon = async (couponId: number) => {
    if (campaignId) {
      const { payload } = await dispatch(
        applyCoupon({
          campaignId: campaignId.toString(),
          couponId: couponId.toString(),
        })
      );
      if (payload?.statusCode === "200") {
        const { payload } = await dispatch(
          updateCampaignDetails({ id: campaignId.toString() })
        );
        if (payload.statusCode === "200") {
          dispatch(fillCheckoutDetails(payload.data));
        }
        handleShowCoupons();
      }
    }
  };
  const handleRemoveCoupon = async () => {
    if (campaignId) {
      const { payload } = await dispatch(
        removeAppliedCoupon({ campaignId: campaignId.toString() })
      );
      if (payload?.statusCode === "200") {
        const { payload } = await dispatch(
          updateCampaignDetails({ id: campaignId.toString() })
        );
        if (payload.statusCode === "200") {
          dispatch(fillCheckoutDetails(payload.data));
        }
        handleShowCoupons();
      }
    }
  };
  const handlePagination = (page: number) => {
    dispatch(
      getAvailableCoupons({
        page: page.toString(),
        totalPrice: checkout.totalAmount,
        pageSize: couponPagination.pageSize.toString(),
      })
    );
  };
  const handleCheckoutBtn = async () => {
    if (campaignId) {
      const { payload } = await dispatch(
        doCheckout({
          campaignId: campaignId.toString(),
          paymentMode: form.paymentMode,
          step: "10",
        })
      );
      if (form.paymentMode === "Wallet" && payload.statusCode === "200") {
        dispatch(restoreStateToInitial());
        dispatch(getBalance())
        dispatch(getUserBalance())
      }
    }
  };
  const handleCallback = async () => {
    if (campaignId) {
      await dispatch(doCallbackRequest(campaignId.toString()));
      dispatch(restoreStateToInitial());
    }
  };

  useEffect(() => {
    if (checkout.razorpayOrderId) openRazorPayModal();
    // eslint-disable-next-line
  }, [checkout.razorpayOrderId]);

  useEffect(() => {
    dispatch(
      getAvailableCoupons({
        page: "1",
        totalPrice: checkout.totalAmount,
        pageSize: couponPagination.pageSize.toString(),
      })
    );
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <ModalStyled
        open={showCoupon}
        onClose={handleShowCoupons}
        isbgColor={colors.modalBg}
      >
        <Box minWidth={320} minHeight={300} position={"relative"}>
          {couponErrorTxt ? (
            <Typography sx={mediaByGenre.errorTxt}>{couponErrorTxt}</Typography>
          ) : (
            <>
              <Typography variant="h6" color={colors.green}>
                Applicable Coupons
              </Typography>
              <Box mb={2} mt={2}>
                {coupons.map((coupon) => (
                  <Box key={coupon.id} sx={checkoutStyle.couponCard}>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={2}
                    >
                      <Box>
                        <Typography
                          sx={checkoutStyle.couponCode}
                          title={coupon.code}
                        >
                          Code : {coupon.code}
                        </Typography>
                        {coupon.discountPercentage ? (
                          <Typography sx={checkoutStyle.couponSubTxt}>
                            Discount : {coupon.discountPercentage}%
                          </Typography>
                        ) : (
                          <Typography sx={checkoutStyle.couponSubTxt}>
                            Flat {coupon.flatDiscount} Off
                          </Typography>
                        )}
                      </Box>
                      <Button
                        sx={checkoutStyle.couponApplyBtn}
                        size="small"
                        onClick={() =>
                          checkout.couponCode === coupon.code
                            ? handleRemoveCoupon()
                            : handleApplyCoupon(coupon.id)
                        }
                        variant="contained"
                        color="warning"
                        disableElevation
                      >
                        {checkout.couponCode === coupon.code
                          ? "Remove"
                          : "Apply"}
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </Box>
              {couponPagination.totalPages > 1 && (
                <Pagination
                  page={couponPagination.currentPage}
                  count={couponPagination.totalPages}
                  onChange={(_, page) => handlePagination(page)}
                />
              )}
            </>
          )}
        </Box>
      </ModalStyled>
      <Stack sx={checkoutStyle.cardHolder}>
        <Box sx={checkoutStyle.leftContainer}>
          <Box sx={checkoutStyle.card} mb={2}>
            <DashBoardIndicator
              image={bag}
              title="My Wallet"
              value={roleId === roles.AD_AGENCY ? agencyBalance : userBalance}
            />
            <Radio
              name="paymentMode"
              sx={checkoutStyle.walletRadio}
              checked={form.paymentMode === "Wallet"}
              onChange={handlePaymentMethod}
            />
          </Box>
          <Box sx={checkoutStyle.card} height={"calc(100% - 150px)"}>
            <Typography mb={1} fontSize={14} fontWeight={600}>
              {translate("userFlow.selectYourTransactionMethod")}
            </Typography>
            <Divider />
            <Stack direction={"row"} alignItems={"center"} gap={1} height={60}>
              <Radio
                name="paymentMode"
                sx={{ p: 0 }}
                id="razorpay"
                checked={form.paymentMode === "Online"}
                onChange={handlePaymentMethod}
              />
              <Stack mb={0.8} flexDirection={"row"} alignItems={"center"}>
                <Box component={"img"} src={razorPayIcon} alt="razorpay-icon" />
                <Typography htmlFor="razorpay" component={"label"}>
                  Razorpay
                </Typography>
              </Stack>
            </Stack>
            <Divider />
          </Box>
        </Box>
        <Box
          sx={{ ...checkoutStyle.card, minWidth: { xs: "initial", md: 429 } }}
        >
          <Box component={"form"}>
            <InputField
              fieldName="Add Coupon Code"
              textProps={{ sx: { ml: 0, mb: 1 } }}
              inputProps={{
                placeholder: translate("userFlow.couponPlaceholder"),
                InputProps: {
                  endAdornment: (
                    <CustomButton
                      sx={checkoutStyle.applyBtn}
                      onClick={handleShowCoupons}
                    >
                      {checkout.couponCode
                        ? "Applied"
                        : translate("userFlow.applyBtn")}
                    </CustomButton>
                  ),
                  readOnly: true,
                },
                fullWidth: true,
                value: checkout.couponCode ? checkout.couponCode : "",
              }}
            />
          </Box>
          <Box mt={3} sx={checkoutStyle.listItem}>
            {billDetails.map((item) => (
              <Typography variant="h6" key={item.id}>
                <Typography component={"b"}>{item.title}</Typography>
                <Typography component={"span"}>
                  <Typography className="rupeeSymbol" component={"b"}>
                    &#x20b9;
                  </Typography>
                  {item.value.toLocaleString()}
                </Typography>
              </Typography>
            ))}
          </Box>
          <CustomButton
            sx={checkoutStyle.checkoutBtn}
            fullWidth
            onClick={handleCheckoutBtn}
            disabled={loading}
          >
            {translate("userFlow.checkoutBtn")}
          </CustomButton>
          <CustomButton
            sx={checkoutStyle.callBackBtn}
            fullWidth
            outlined={true}
            onClick={handleCallback}
            disabled={loading}
          >
            {translate("userFlow.callbackBtn")}
          </CustomButton>
        </Box>
      </Stack>
    </>
  );
};

export default Checkout;
