import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  Avatar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { roles } from "../../../config/config";
import { colors } from "../../../config/theme";
import {
  actionLogout,
  SidebarMenuItem,
  Submenu,
} from "../../../redux/reducers/auth";
import { AppDispatch, RootState } from "../../../redux/store";
import Storage from "../../../utils/Storage";
import { tokenWithUrl } from "../../../utils/utils";
import { CustomButton } from "../customButton/CustomButton";
import { ModalStyled } from "../modal/CommonModal";
import RouteNotFound from "../routeFallBacks/RouteNotFound";
import { logo } from "./assets/assets";
import { SidebarCard, SidebarCardForAdmin } from "./SidebarCard";
import { styles } from "./SidebarStyles";

interface IProps {
  isShowMobileSidebar?: boolean;
  handleCloseMobileSideBar?: () => void;
  onClicked?: () => void;
}

const Sidebar = ({
  handleCloseMobileSideBar,
  isShowMobileSidebar,
  onClicked,
}: IProps) => {
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("/Dashboard");
  const [activeNestedItem, setActiveNestedItem] = useState("");
  const { sidebar, user } = useSelector((state: RootState) => state.Auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogOutModalClose = () => {
    setIsLogOutModalOpen(false);
    const currentPath = window.location.pathname.split("/").pop();
    setActiveItem(
      currentPath === "ScreenAds" ? "Screen Ads" : currentPath ?? "Dashboard"
    );
  };
  const handleLogOut = () => {
    dispatch(actionLogout());
  };
  const handleClick = async (route: string, isNested = false) => {
    if (handleCloseMobileSideBar && route !== "/Users" && route !== "/Logout") {
      handleCloseMobileSideBar();
      onClicked && onClicked();
    }
    if (isNested) {
      setActiveNestedItem(`${route.replace(" ", "")}`);
      setActiveItem("/Users");
      navigate(`${route?.replace(" ", "")}`);
    } else if (route === "/Logout") {
      setIsLogOutModalOpen(true);
      setOpen(false);
      setActiveItem(route);
      setOpen(false);
    } else if (route === "/Users") {
      setOpen(!open);
      setActiveItem("/Users");
    } else {
      setOpen(false);
      setActiveItem(route);
      setActiveNestedItem("");
      navigate(`${route.replace(" ", "")}`);
    }
  };
  const activePath = useLocation().pathname.split("/")[1];
  useEffect(() => {
    try {
      let nestedItem;
      const activeItemData = sidebar?.sidemenu.find(
        (each) =>
          each.name.replaceAll(" ", "").toLowerCase() ===
          activePath?.toLowerCase()
      );
      if (activeItemData === undefined) {
        const usersItem = sidebar?.sidemenu.find(
          (each) => each.name === "users"
        );
        if (usersItem) {
          nestedItem = usersItem.submenus.find(
            (each) =>
              each.name.replaceAll(" ", "").toLowerCase() ===
              activePath?.toLowerCase()
          );
        }
      }
      if (activeItemData) {
        setActiveItem(activeItemData.path);
        setOpen(false);
      } else {
        setActiveNestedItem(nestedItem?.path!);
        setActiveItem("/Users");
        setOpen(true);
      }
    } catch (error) {
      navigate("*");
    }
  }, []); //eslint-disable-line

  const renderExpandIcon = (each: SidebarMenuItem) => {
    return open ? (
      <ExpandLess
        sx={{
          color: each.path === activeItem ? colors.activeColor : colors.white,
        }}
      />
    ) : (
      <ExpandMore
        sx={{
          color: each.path === activeItem ? colors.activeColor : colors.white,
        }}
      />
    );
  };

  const isSmall = useMediaQuery("(max-width:900px)");
  return (
    <Drawer
      variant={isSmall ? "temporary" : "permanent"}
      open={isShowMobileSidebar}
      onClose={handleCloseMobileSideBar}
      sx={styles.drawerStyle}
    >
      <Box
        sx={{
          ...styles.mainContainer,
          display: "flex",
          position: "sticky",
          top: 0,
        }}
      >
        <ModalStyled
          open={isLogOutModalOpen}
          isClose={false}
          onClose={handleLogOutModalClose}
          handleClose={handleLogOutModalClose}
          isbgColor={colors.lightBlack}
        >
          <Box sx={styles.modalBox}>
            <Box>
              <Typography sx={styles.deleteAdsText}>Logout</Typography>
              <Typography sx={styles.areYouText}>
                Are you sure you want to log out?
              </Typography>
            </Box>
            <Box sx={styles.buttonsBox}>
              <CustomButton
                bgcolor={colors.primary}
                textColor={colors.white}
                width={128}
                onClick={handleLogOutModalClose}
                outlined
              >
                Cancel
              </CustomButton>
              <CustomButton width={158} onClick={handleLogOut}>
                Logout
              </CustomButton>
            </Box>
          </Box>
        </ModalStyled>
        <Box sx={styles.subContainer}>
          <Box component="img" src={logo} sx={styles.logo} />
          <List component="nav" aria-labelledby="nested-list-subheader">
            {sidebar?.sidemenu
              ?.slice()
              .sort((a, b) => a.id - b.id)
              .map((each: SidebarMenuItem) => (
                <React.Fragment key={each.id}>
                  <ListItemButton
                    sx={styles.listItemButton}
                    onClick={() => handleClick(each.path)}
                  >
                    <ListItemIcon>
                      <Avatar
                        sx={
                          each.path === activeItem
                            ? styles.activeAvatar
                            : styles.avatar
                        }
                      >
                        <Box
                          component="img"
                          src={tokenWithUrl(each.iconImage)}
                          sx={
                            each.path === "/Payments"
                              ? styles.paymentIconImage
                              : styles.iconImage
                          }
                        />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={each.name}
                      sx={{
                        ...styles.labelText,
                        color:
                          each.path === activeItem
                            ? colors.activeColor
                            : colors.white,
                      }}
                    />
                    {each.submenus.length !== 0 && renderExpandIcon(each)}
                  </ListItemButton>
                  {each.submenus.length !== 0 && (
                    <Accordion expanded={open} sx={styles.accordian}>
                      <AccordionDetails>
                        <List
                          sx={{ display: open ? "block" : "none" }}
                          component="div"
                          disablePadding
                        >
                          {each?.submenus
                            ?.slice()
                            .sort((a: Submenu, b: Submenu) => a.id - b.id)
                            .map((item: Submenu) => (
                              <ListItemButton
                                key={item.id}
                                onClick={() => handleClick(item.path, true)}
                                sx={styles.nestedButton}
                              >
                                <ListItemIcon>
                                  <Box
                                    component="img"
                                    src={tokenWithUrl(item?.image)}
                                    sx={{
                                      height: "21px",
                                      width: "21px",
                                      filter:
                                        item.path === activeNestedItem
                                          ? " brightness(0) saturate(100%) invert(35%) sepia(93%) saturate(1597%) hue-rotate(173deg) brightness(88%) contrast(94%)"
                                          : "",
                                    }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={item.name}
                                  sx={{
                                    ...styles.subRouteLabelText,
                                    color:
                                      `${item.path.replace(" ", "")}` ===
                                      activeNestedItem
                                        ? colors.activeColor
                                        : colors.white,
                                  }}
                                />
                              </ListItemButton>
                            ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  )}
                </React.Fragment>
              ))}
          </List>
        </Box>
        {user?.roleId !== roles.SUPER_ADMIN && (
          <Box sx={styles.sideBarCardContainer}>
            {user?.roleId === roles.ADMIN ? (
              <SidebarCardForAdmin />
            ) : (
              <SidebarCard wallet={user?.wallet?.balance ?? 0} />
            )}
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
interface ProtectedLayoutProps {
  children: ReactNode;
}
export const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  children,
}) => {
  const sidebar = Storage.get("sidebar") as {
    id: number;
    sidemenu: SidebarMenuItem[];
    path: string | null;
    sidebar: null;
  };
  const activePath = useLocation().pathname.split("/")[1];
  let nestedItem;
  const activeItemData = sidebar?.sidemenu.find(
    (each) =>
      each.name.replaceAll(" ", "").toLowerCase() === activePath?.toLowerCase()
  );
  if (activeItemData === undefined) {
    const usersItem = sidebar?.sidemenu.find((each) => each.name === "users");
    if (usersItem) {
      nestedItem = usersItem.submenus.find(
        (each) =>
          each.name.replaceAll(" ", "").toLowerCase() ===
          activePath?.toLowerCase()
      );
    }
  }
  if (nestedItem === undefined && activeItemData === undefined) {
    return <RouteNotFound />;
  }
  return <>{children}</>;
};
