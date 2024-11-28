import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { colors } from "../../../../config/theme";
import {
  getPlayListSchedule,
  updateOrDeletePlayListSchedule,
} from "../../../../redux/reducers/superAdmin/CanvasNextSlice";
import { displayAlert } from "../../../../utils/toastMessage";
import { useAppDispatch, useAppSelector } from "../../../../utils/useRedux";
import { editIcon, InputCalendar, layOutDelete } from "../../../common/assets";
import { layOutStyles } from "../../../common/cardLayout/CardLayoutStyles";
import CommonAlertModal from "../../../common/commonAlertModal/CommonAlertModal";
import { CustomButton } from "../../../common/customButton/CustomButton";
import { canvasGroupsStyles, canvasNextStyles } from "./CanvasNextStyles";

interface IProps {
  adId: number | null;
}
interface IState {
  dates: { startDate: Dayjs | null; endDate: Dayjs | null };
  errors: { startDate: string; endDate: string };
  actionType: "Idle" | "Edit" | "Add";
  booleanType: boolean;
}
const tableRows = ["Screen Date", "End Date", "Action"];
const PlaylistSchedule: React.FC<IProps> = ({ adId }) => {
  const { schedule, loadingStatus, message } = useAppSelector(
    (state) => state.canvasNextSlice.playListSchedule
  );
  const [dates, setDates] = React.useState<IState["dates"]>({
    startDate: null,
    endDate: null,
  });
  const [errors, setErrors] = React.useState<IState["errors"]>({
    startDate: "",
    endDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<IState["booleanType"]>(false);
  const [actionType, setActionType] =
    React.useState<IState["actionType"]>("Idle");
  const dispatch = useAppDispatch();
  const handleDateChange = (date: Dayjs | null, dateType: string) => {
    setDates((prev) => ({ ...prev, [dateType]: date }));
  };
  const handleAction = (actionType: IState["actionType"]) => {
    if (actionType === "Edit") {
      setActionType(actionType);
      setDates({
        startDate: dayjs(moment(schedule?.startDate).format("DD/MM/YYYY")),
        endDate: dayjs(moment(schedule?.endDate).format("DD/MM/YYYY")),
      });
    } else {
      setIsModalOpen(true);
    }
  };
  const handleSubmitSchedule = async () => {
    if (dates.startDate === null && dates.endDate === null) {
      setErrors((prev) => ({
        ...prev,
        startDate: "Required",
        endDate: "Required",
      }));
    } else if (dates.startDate === null) {
      setErrors({ startDate: "Required", endDate: "" });
    } else if (dates.endDate === null) {
      setErrors({ startDate: "", endDate: "Required" });
    } else {
      setErrors({ startDate: "", endDate: "" });
    }
    if (dates.startDate !== null && dates.endDate !== null) {
      const updateScheduleDispatch = await dispatch(
        updateOrDeletePlayListSchedule({
          playlistAdId: adId,
          startDate: dates.startDate?.format("YYYY-MM-DD"),
          endDate: dates.endDate?.format("YYYY-MM-DD"),
        })
      );
      if (updateScheduleDispatch.payload.statusCode === "200") {
        handleGetScheduleData();
        setActionType("Idle");
        setDates({ startDate: null, endDate: null });
      } else {
        displayAlert(updateScheduleDispatch.payload.message as string, "error");
      }
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleDeleteSchedule = async () => {
    const updateScheduleDispatch = await dispatch(
      updateOrDeletePlayListSchedule({
        playlistAdId: adId,
        isDelete: true,
      })
    );
    if (updateScheduleDispatch.payload.statusCode === "200") {
      handleModalClose();
      handleGetScheduleData();
      setActionType("Add");
    } else {
      displayAlert(updateScheduleDispatch.payload.message as string, "error");
    }
  };
  const handleGetScheduleData = () => {
    dispatch(getPlayListSchedule(adId));
  };
  useEffect(() => {
    handleGetScheduleData();
    setDates({ startDate: null, endDate: null });
    setActionType("Idle");
    // eslint-disable-next-line
  }, [adId]);
  useEffect(()=>{
    setDates({ startDate: dayjs(moment(schedule?.startDate).toDate()), endDate: dayjs(moment(schedule?.endDate).toDate()) });
  },[schedule])
  
  useEffect(() => {
    if (message === " Schedule  Not Found") setActionType("Add");
    if (schedule?.startDate && schedule.endDate) setActionType("Idle");
    // eslint-disable-next-line
  }, [schedule, adId]);

  const tableLoadinJSX = () => {
    if (loadingStatus === "PENDING") {
      return <CircularProgress />;
    } else if (loadingStatus === "REJECTED") {
      return <Typography>{message}</Typography>;
    } else {
      return false;
    }
  };
  return (
    <>
      <CommonAlertModal
        isModalOpen={isModalOpen}
        deleteTitle={"Schedule"}
        descriptionContent={"schedule"}
        handleCancelModal={handleModalClose}
        handleActionModal={handleDeleteSchedule}
      />
      <Box sx={canvasGroupsStyles.tableMainBox}>
        <Box sx={canvasGroupsStyles.selectTextBox}>
          <Typography sx={canvasNextStyles.tableHeading}>Schedule</Typography>
          <Typography sx={canvasNextStyles.screensText}>
            {schedule?.screenCount ?? 0} Screens
          </Typography>
        </Box>
        <Box sx={canvasNextStyles.tableBox}>
          <TableContainer
            aria-label="customized table"
            sx={canvasNextStyles.tableContainer}
          >
            <Table sx={canvasNextStyles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tableRows.map((row, index: number) => (
                    <TableCell
                      align={
                        index === 0 ? "left" : index === 1 ? "left" : "center"
                      }
                      key={index}
                    >
                      {row}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableLoadinJSX() && (
                  <TableRow>
                    <TableCell align="left" colSpan={5}>
                      <Box sx={canvasNextStyles.loadingTextBox}>
                        {tableLoadinJSX()}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {schedule?.startDate && schedule?.endDate && (
                  <TableRow>
                    <TableCell align="left">
                      <Typography
                        sx={canvasGroupsStyles.tableUpperCaseText}
                        title={schedule?.startDate ?? "-"}
                      >
                        {moment(schedule?.startDate).format("DD/MM/YYYY") ??
                          "-"}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        component={"span"}
                        title={schedule?.endDate ?? "-"}
                      >
                        {moment(schedule?.endDate).format("DD/MM/YYYY") ?? "-"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={canvasNextStyles.shceduleButtonsBox}>
                        <IconButton
                          onClick={() => handleAction("Edit")}
                          sx={layOutStyles.iconButton(colors.blue)}
                        >
                          <Box
                            component={"img"}
                            src={editIcon}
                            sx={canvasNextStyles.deleteImg}
                          />
                        </IconButton>
                        {actionType !== "Edit" && (
                          <IconButton
                            onClick={() => handleAction("Add")}
                            sx={layOutStyles.iconButton(colors.validate)}
                          >
                            <Box
                              component={"img"}
                              src={layOutDelete}
                              sx={canvasNextStyles.deleteImg}
                            />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      {actionType !== "Idle" && (
        <Box sx={canvasGroupsStyles.tableMainBox}>
          <Box sx={canvasGroupsStyles.selectTextBox}>
            <Typography sx={canvasNextStyles.tableHeading}>
              {actionType === "Edit" && "Update"} Schedue Playlist
            </Typography>
          </Box>
          <Grid container spacing={4} sx={canvasNextStyles.grid}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                  <DatePicker
                    format="DD/MM/YYYY"
                    disablePast
                    value={dayjs(moment(schedule?.startDate).toDate())}
                    onChange={(date) => handleDateChange(date, "startDate")}
                    slotProps={{
                      field: {
                        clearable: true,
                      },
                      textField: { placeholder: "DD/MM/YYYY" },
                    }}
                    slots={{
                      openPickerIcon: () => <InputCalendar />,
                    }}
                  />
                </DemoItem>
                <Typography sx={canvasNextStyles.errorText}>
                  {errors.startDate}
                </Typography>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                  <DatePicker
                    format="DD/MM/YYYY"
                    disablePast
                    value={dayjs(moment(schedule?.endDate).toDate())}
                    onChange={(date) => handleDateChange(date, "endDate")}
                    slotProps={{
                      field: {
                        clearable: true,
                      },
                      textField: { placeholder: "DD/MM/YYYY" },
                    }}
                    slots={{
                      openPickerIcon: () => <InputCalendar />,
                    }}
                  />
                </DemoItem>
                <Typography sx={canvasNextStyles.errorText}>
                  {errors.endDate}
                </Typography>
              </LocalizationProvider>
            </Grid>
            <CustomButton
              onClick={handleSubmitSchedule}
              sx={canvasNextStyles.scheduleButton}
            >
              Schedule
            </CustomButton>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default PlaylistSchedule;
