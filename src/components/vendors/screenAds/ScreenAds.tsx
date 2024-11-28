import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardLayout from "../../common/cardLayout/CardLayout";
import Inputs from "./InputsBox";
import { screenAdsStyles } from "./ScreenAdsStyles";
import { displayAlert } from "../../../utils/toastMessage";
const layOutData = {
  id: 1,
  imageSrc:
    "https://s3-alpha-sig.figma.com/img/5bff/712f/d276f4d4d9e370939623a964c6a7be70?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HtyMdIiQPzffYnhbEWUiIcWdAA~DNVWmpd~zvp0Ee9ZZz1a89qSvZhArznVOw49Rz-kgTk7r0pVQRzH6WsASvmyykmzwVJsuxdr4cxAiQAoaimPethLpAdYd1hEugQbvJ2SOHqJL9fwbIBtMgJIIHp77MJIoO5gyTM4jENsreWGfIYMB3sKyapQd0g4h6UGYxwJTFEBBaiiv0K7g0cs~63UuiYAZuUi1MWAbe1OY63HRZuyDZdV3euPuiQSvKCpO3Wu1JjIl-2U94DVJWDFs-MOXJievBjfLw4zFkZFm1DpNJ5OyF4vrV31~yQIs~tyMRDhG2pMc1-zBdorz6h-e7Q__",
  title: "Business Ads Design",
  date: "May 26,2024",
  layout: 2,
  status: "Approved",
};

interface IState {
  isDeleteModalOpen: boolean;
  activeLayoutId: null | number;
}
const ScreenAds = () => {
  const [activeLayoutId, setActiveLayoutId] =
    useState<IState["activeLayoutId"]>(null);
  const navigate = useNavigate();
  const handleEdit = (layOutId: number) => {};
  const handleModalClose = () => {
    setActiveLayoutId(null);
  };
  const handleShow = (layOutId: number) => {
    navigate(`/ScreenAds/view`);
  };
  const handleSettings = (layOutId: number) => {};
  const handleDelete = (layOutId: number) => {
    setActiveLayoutId(layOutId);
  };
  const handleDeleteLayout = () => {
    displayAlert("layout deleted successfully");
    handleModalClose();
  };
  return (
    <Box sx={screenAdsStyles.mainBox}>
      <Inputs />
      <Grid
        container
        spacing={screenAdsStyles.gridSpacing}
        sx={screenAdsStyles.grid}
      >
        {Array(15)
          .fill(layOutData)
          .map((layout, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <CardLayout
                layOutId={index}
                activeLayoutId={activeLayoutId}
                imageSrc={layout.imageSrc}
                title={layout.title}
                date={layout.date}
                layout={layout.layout}
                status={layout.status}
                isShow={true}
                handleCloseModal={() => handleModalClose()}
                handleEdit={() => handleEdit(index)}
                handleShow={() => handleShow(index)}
                handleSettings={() => handleSettings(index)}
                handleDelete={() => handleDelete(index)}
                handleDeleteLayout={handleDeleteLayout}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ScreenAds;
