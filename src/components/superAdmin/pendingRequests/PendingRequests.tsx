import { Stack } from "@mui/material";
import { useState } from "react";
import { colors } from "../../../config/theme";
import { CustomButton } from "../../common/customButton/CustomButton";
import AdCampaignsRequest from "./AdCampaignsRequest";
import FinancialRequest from "./FinancialRequest";
import HostAdsRequest from "./HostAdsRequests";
import { styles } from "./PendingStyles";
import RegisterRequest from "./RegisterRequest";
import { ActiveTab } from "./types/Types";

const tabs: ActiveTab[] = [
  "Register Request",
  "Ad Campaigns Request",
  "Call Back Request",
  "Host Ads Request",
  "Financial Request",
  "Sales Request",
];
interface IState {
  activeTab: ActiveTab;
}

const PendingRequests = () => {
  const [activeTab, setActiveTab] = useState<IState["activeTab"]>(tabs[0]);
  const getTable = () => {
    switch (activeTab) {
      case "Register Request":
        return <RegisterRequest />;
      case "Ad Campaigns Request":
        return <AdCampaignsRequest isCallback={false} key={'ad campaign'}/>;
      case "Call Back Request":
        return <AdCampaignsRequest isCallback={true} key={'call back'}/>;
      case "Financial Request":
        return <FinancialRequest isSales={false} />;
      case "Sales Request":
        return <FinancialRequest isSales={true} />;
      default:
        return <HostAdsRequest />;
    }
  };
  const handleTabNavigation = (tab: ActiveTab) => {
    setActiveTab(tab);
  };
  return (
    <Stack spacing={2}>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={1.5}
        justifyContent={{ xs: "center", md: "left" }}
      >
        {tabs.map((tab) => (
          <CustomButton
            onClick={() => handleTabNavigation(tab)}
            disableFocusRipple
            key={tab}
            bgcolor={activeTab === tab ? colors.primary : colors.white}
            sx={activeTab === tab ? styles.activeTab : styles.inActiveTab}
          >
            {tab}
          </CustomButton>
        ))}
      </Stack>
      {getTable()}
    </Stack>
  );
};

export default PendingRequests;
