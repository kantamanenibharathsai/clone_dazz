import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { colors } from "../../../../config/theme";
import {AddScreen} from "../newScreen/AddScreen";
import { addNewStyles } from "./AddNewStyles";
import { AddGroup, AddMedia } from "../newScreen/ScreenModals";
interface IProps {
  handleClose:()=>void
}
const AddNew = ({handleClose}:IProps) => {
  const [activeScreen, setActiveScreen] = useState("");
  const handleScreen = (name: string) => {
    setActiveScreen(name);
  };
  const handleRender = () => {
    switch (activeScreen) {
      case "addScreen":
        return <AddScreen handleClose={handleClose} />;
      case "addMedia":
        return <AddMedia handleClose={handleClose} />;
      case "addGroup":
        return <AddGroup handleClose={handleClose} type={"Group"}/>;
      case "addPlaylist":
        return <AddGroup handleClose={handleClose} type={"Playlist"} />;
      default:
        return (
          <Stack
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box sx={addNewStyles.mainContainer}>
              <Box
                sx={addNewStyles.innerCard(
                  colors.thickBlue,
                  "30px 0px 0px 0px"
                )}
              >
                <Stack
                  direction={"column"}
                  gap={2}
                  alignItems={"center"}
                  onClick={() => handleScreen("addScreen")}
                >
                  <IconButton sx={addNewStyles.iconBtn(colors.thickBlue)}>
                    <AddIcon />
                  </IconButton>
                  <Typography>New Screen</Typography>
                </Stack>
              </Box>
              <Box
                sx={addNewStyles.innerCard(
                  colors.lightGreen,
                  "0px 30px 0px 0px"
                )}
              >
                <Stack
                  direction={"column"}
                  gap={2}
                  alignItems={"center"}
                  onClick={() => handleScreen("addMedia")}
                >
                  <IconButton sx={addNewStyles.iconBtn(colors.lightGreen)}>
                    <AddIcon />
                  </IconButton>
                  <Typography>Add Media</Typography>
                </Stack>
              </Box>
              <Box
                sx={addNewStyles.innerCard(colors.thickRed, "0px 0px 0px 30px")}
              >
                <Stack
                  direction={"column"}
                  gap={2}
                  alignItems={"center"}
                  onClick={() => handleScreen("addPlaylist")}
                >
                  <IconButton sx={addNewStyles.iconBtn(colors.thickRed)}>
                    <AddIcon />
                  </IconButton>
                  <Typography>New Playlist</Typography>
                </Stack>
              </Box>
              <Box
                sx={addNewStyles.innerCard(colors.purple, "0px 0px 30px 0px")}
              >
                <Stack
                  direction={"column"}
                  gap={2}
                  alignItems={"center"}
                  onClick={() => handleScreen("addGroup")}
                >
                  <IconButton sx={addNewStyles.iconBtn(colors.purple)}>
                    <AddIcon />
                  </IconButton>
                  <Typography>New Group</Typography>
                </Stack>
              </Box>
            </Box>
          </Stack>
        );
    }
  };
  return <>{handleRender()}</>;
};

export default AddNew;
