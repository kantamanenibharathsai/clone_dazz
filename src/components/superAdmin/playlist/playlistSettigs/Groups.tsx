import {
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { layOutDelete } from "../../../common/assets";
import { groupsStyles, playListSettingsStyles } from "./PlaylistSettingsStyles";

interface IState {
  listData: {
    isClicked: boolean;
    text: string;
  }[];
}
const checkListData = [
  { isClicked: true, text: "CMR Medical" },
  { isClicked: false, text: "CMRTC_Medchel" },
  { isClicked: false, text: "CMRTC_Medchel" },
  { isClicked: false, text: "Shadhan Engineering" },
  { isClicked: false, text: "CMR_IT" },
];
const tableData = [
  {
    screenName: "JohnDoe",
    status: "Online",
    screenLocation: "CMR MEDICAL COLLEGE",
    playing: "CMR Group of Colleges",
    locationOrCity: "Medchal-Malkajgiri",
  },
  {
    screenName: "JohnDoe",
    status: "Offline",
    screenLocation: "CMR MEDICAL COLLEGE",
    playing: "CMR Group of Colleges",
    locationOrCity: "Medchal-Malkajgiri",
  },
];
const tableRows = [
  "Screen Name",
  "Status",
  "Screen Location",
  "Playing",
  "Location or city",
  "Action",
];
const Groups = () => {
  const [listData, setListData] = useState(checkListData);
  const handleCheckListData = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newListData: IState["listData"] = [...listData];
    const newObj = newListData[index];
    const obj = { ...newObj, isClicked: event.target.checked };
    newListData[index] = obj;
    setListData(newListData);
  };
  return (
    <>
      <Box sx={groupsStyles.selectScreenBox}>
        <Typography sx={groupsStyles.selectText}>
          Select Screens, Groups and Playlists to Publish
        </Typography>
        <Box sx={playListSettingsStyles.checkBoxMain}>
          <Checkbox defaultChecked />
          <Typography sx={playListSettingsStyles.splitText}>
            Select All Group
          </Typography>
        </Box>
      </Box>
      <Box sx={groupsStyles.checkBoxMain}>
        {listData.map((list, index: number) => (
          <Box key={index} sx={groupsStyles.checkBox}>
            <Checkbox
              checked={list.isClicked}
              onChange={(event) => handleCheckListData(event, index)}
            />
            <Typography>{list.text}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={groupsStyles.tableMainBox}>
        <Box sx={groupsStyles.selectTextBox}>
          <Typography>Selected Screens</Typography>
          <Typography>6 Screens</Typography>
        </Box>
        <Box sx={playListSettingsStyles.tableBox}>
          <TableContainer  aria-label="customized table"  sx={playListSettingsStyles.tableContainer} >
            <Table sx={playListSettingsStyles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tableRows.map((row, index: number) => (
                    <TableCell align="left" key={index}>
                      {row}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array(3)
                  .fill(tableData)
                  .flat()
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">
                        <Typography sx={groupsStyles.tableUpperCaseText}>
                          {row.playing}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography sx={groupsStyles.statusText(row.status)}>
                          {row.status}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography sx={groupsStyles.tableNormalText}>
                          {row.playing}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography sx={groupsStyles.tableNormalText}>
                          {row.playing}
                        </Typography>
                      </TableCell>{" "}
                      <TableCell align="left">
                        <Typography sx={groupsStyles.tableNormalText}>
                          {row.locationOrCity}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton sx={groupsStyles.iconButton}>
                          <Box
                            component={"img"}
                            src={layOutDelete}
                            sx={playListSettingsStyles.deleteImg}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Groups;
