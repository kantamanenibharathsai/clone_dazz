import { AccessTimeFilledOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import * as React from "react";
import { useState } from "react";
import { colors } from "../../../../config/theme";
import { InputCalendar } from "../../../common/assets";
import { CustomButton } from "../../../common/customButton/CustomButton";
import { ModalStyled } from "../../../common/modal/CommonModal";
import Playlist from "../Playlist";
import { groupsStyles, playListSettingsStyles } from "./PlaylistSettingsStyles";
import Screens from "./Screens";
const tabs = ["Screen", "Playlists"];
const PlaylistsSettings = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const [cleared, setCleared] = React.useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleScheduleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);
  const handleSetTab = (tabNum: number) => {
    setTabNumber(tabNum);
  };
  const tableJSX = () => {
    switch (tabNumber) {
      case 0:
        return <Screens />;
      case 1:
        return (
          <Box sx={groupsStyles.selectScreenBox}>
            <Playlist />
          </Box>
        );
    }
  };
  return (
    <Stack direction={"column"}>
      <ModalStyled
        open={isOpenModal}
        isClose={true}
        isbgColor={colors.lightBlack}
        handleClose={handleScheduleModal}
      >
        <Box sx={playListSettingsStyles.modalMainBox}>
          <Typography sx={playListSettingsStyles.scheduleText}>
            Schedule Playlist
          </Typography>
          <Grid container spacing={4} sx={playListSettingsStyles.grid}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                  <DatePicker
                    slotProps={{
                      field: {
                        clearable: true,
                        onClear: () => setCleared(true),
                      },
                      textField: { placeholder: "MM-DD-YYYY" },
                    }}
                    slots={{
                      openPickerIcon: () => <InputCalendar />,
                    }}
                  />
                </DemoItem>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                  <DatePicker
                    slotProps={{
                      field: {
                        clearable: true,
                        onClear: () => setCleared(true),
                      },
                      textField: { placeholder: "MM-DD-YYYY" },
                    }}
                    slots={{
                      openPickerIcon: () => <InputCalendar />,
                    }}
                  />
                </DemoItem>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    slotProps={{
                      field: {
                        clearable: true,
                        onClear: () => setCleared(true),
                      },
                      textField: { placeholder: "--:--" },
                    }}
                    slots={{
                      openPickerIcon: () => <AccessTimeFilledOutlined />,
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    slotProps={{
                      field: {
                        clearable: true,
                        onClear: () => setCleared(true),
                      },
                      textField: { placeholder: "--:--" },
                    }}
                    slots={{
                      openPickerIcon: () => <AccessTimeFilledOutlined />,
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <CustomButton sx={playListSettingsStyles.scheduleButton}>
              Schedule
            </CustomButton>
          </Grid>
        </Box>
      </ModalStyled>
      <Box sx={playListSettingsStyles.tabBox}>
        <Box sx={playListSettingsStyles.tabs}>
          {tabs.map((tab, index) => (
            <Button
              onClick={() => handleSetTab(index)}
              sx={playListSettingsStyles.tabsElement(index, tabNumber)}
            >
              {tab}
            </Button>
          ))}
        </Box>
      </Box>
      {tableJSX()}
    </Stack>
  );
};

export default PlaylistsSettings;
