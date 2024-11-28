  import { MoreHoriz } from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  IconButton,
  Popover,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";
import { roles } from "../../../config/config";
import { translate } from "../../../config/i18n";
import { colors, fonts } from "../../../config/theme";
import { useAppSelector } from "../../../utils/useRedux";
import { tokenWithUrl } from "../../../utils/utils";
import { notificationBell, userImage } from "../assets";
import Sidebar from "../sidebar/Sidebar";
import { styles } from "./Styles";
interface IProps {
  headerButton?: ReactNode;
  onClicked?: () => void;
}

const Header = ({ headerButton, onClicked }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [isShowMobileSidebar, setIsShowMobileSidebar] =
    useState<boolean>(false);
  const [tabValue, setTabValue] = useState<number>(0);
  const { user } = useAppSelector((state) => state.Auth);
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenMobileSideBar = () => setIsShowMobileSidebar(true);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box sx={styles.mainContainer} component={"header"}>
      <Sidebar
        handleCloseMobileSideBar={() => setIsShowMobileSidebar(false)}
        isShowMobileSidebar={isShowMobileSidebar}
        onClicked={onClicked}
      />
      <Box mr={"auto"} display={"flex"} flexWrap={"wrap"} alignItems={"center"}>
        <IconButton sx={styles.menuIcon} onClick={handleOpenMobileSideBar}>
          <MenuIcon />
        </IconButton>
        <Typography component={"h6"} sx={styles.welcomeText}>
          {user.roleId === roles.USER ? (
            <>
              <Typography>Welcome to</Typography>
              <Typography>D'Adz Media 👋🏼,</Typography>
            </>
          ) : (
            <Typography>
              {translate("common.hello")}
              {user?.fullName} 👋🏼,{" "}
            </Typography>
          )}
        </Typography>
      </Box>
      <Stack direction={"row"} gap={1.5} alignItems={"center"}>
        <Stack
          direction={"row"}
          spacing={2}
          flexWrap={{ xs: "wrap", sm: "nowrap" }}
          justifyContent={{ xs: "end", sm: "start" }}
          alignItems={"center"}
          width={"max-content"}
          rowGap={"10px"}
        >
          <Box
            component={"img"}
            src={tokenWithUrl(user.image)}
            onError={(event) => event.currentTarget.src=`${userImage}`}
            sx={styles.avatar}
            alt="user-avatar"
          />
          <Box color={"white"} textAlign={"end"}>
            <Typography
              fontSize={"14px"}
              fontWeight={"600"}
              fontFamily={fonts.primary}
              textAlign={"left"}
              textTransform={"capitalize"}
              title={user.fullName}
              sx={styles.profileText}
            >
              {user?.fullName}
            </Typography>
            <Typography
              fontSize={"12px"}
              fontWeight={500}
              fontFamily={fonts.primary}
              sx={styles.profileText}
              title={user.email}
            >
              {user.email}
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={styles.notificationContainer}
          aria-describedby={id}
          onClick={handleClick}
        >
          <Box
            component={"img"}
            src={notificationBell}
            alt="notification-bell"
          />
          <CircleIcon fontSize="small" sx={styles.notificationBadge} />
        </Box>
        {headerButton}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={styles.popoverStyles}
        >
          <Box p={2} sx={styles.notifyHolder}>
            <Box
              position={"sticky"}
              top={0}
              bgcolor={colors.lightBlack}
              zIndex={3}
              pt={2}
            >
              <Typography sx={styles.notificationText}>
                Notifications
              </Typography>
              <Tabs
                value={tabValue}
                onChange={(_event, newValue) => {
                  setTabValue(newValue);
                }}
                sx={styles.tabs}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  label={
                    <Typography>
                      All
                      <Typography component={"span"} sx={styles.customBadge}>
                        25
                      </Typography>
                    </Typography>
                  }
                />
                <Tab
                  label={
                    <Typography>
                      Unread
                      <Typography component={"span"} sx={styles.customBadge}>
                        25+
                      </Typography>
                    </Typography>
                  }
                />
              </Tabs>
            </Box>
            {Array(16)
              .fill(0)
              .map((each, index) => (
                <Box key={index} sx={styles.eachNotifyContainer}>
                  <Box display={"flex"} sx={styles.unReadAvatarHolder}>
                    <Avatar
                      src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                      sx={styles.avatarSize}
                    />
                  </Box>
                  <Typography sx={styles.notificationBody}>
                    Ashwin Bose{" "}
                    <Typography component={"span"} fontWeight={400}>
                      is requesting access to{" "}
                    </Typography>{" "}
                    Design File - Final Project. and you have to approve
                  </Typography>
                  <Stack
                    color={colors.white}
                    ml={"auto"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Typography color={colors.lightGray} fontWeight={400}>
                      15h
                    </Typography>
                    <MoreHoriz cursor={"pointer"} />
                  </Stack>
                </Box>
              ))}
          </Box>
        </Popover>
      </Stack>
    </Box>
  );
};

export default Header;
