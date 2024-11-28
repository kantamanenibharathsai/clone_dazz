import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { screenAdsStyles } from "./ScreenAdsStyles";
import { searchIcon } from "../assets";

const Ads = () => {
  const [age, setAge] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleSearchInput = (input: string) => {
    setSearchInput(input);
  };
  const handleRemoveSearchInput = () => {
    setSearchInput("");
  };
  return (
    <Box sx={screenAdsStyles.mainContainer}>
      <Box sx={screenAdsStyles.titleContainer}>
        <Box>
          <Typography sx={screenAdsStyles.title}>My Ads</Typography>
          <Typography sx={screenAdsStyles.subTitle}>25 List</Typography>
        </Box>
        <Box sx={screenAdsStyles.textFieldContainer}>
          <TextField
            sx={screenAdsStyles.textField}
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(event) => handleSearchInput(event.target.value)}
            InputProps={{
              startAdornment: (
                <Box
                  component={"img"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={screenAdsStyles.textField.icon}
                  src={searchIcon}
                />
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <ClearIcon
                    cursor={"pointer"}
                    onClick={handleRemoveSearchInput}
                    sx={{ opacity: searchInput ? 1 : 0 }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={screenAdsStyles.sortContainer}>
            <Box sx={screenAdsStyles.sortBox}>
              <Typography sx={screenAdsStyles.menuItem}>Sort By:</Typography>
              <FormControl sx={screenAdsStyles.sortFormControl}>
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem value="All" sx={screenAdsStyles.menuItem}>
                    All
                  </MenuItem>
                  <MenuItem value="Trending" sx={screenAdsStyles.menuItem}>
                    Trending
                  </MenuItem>
                  <MenuItem value="LOW_TO_HIGH" sx={screenAdsStyles.menuItem}>
                    Price (low to high)
                  </MenuItem>
                  <MenuItem value="HIGH_TO_LOW" sx={screenAdsStyles.menuItem}>
                    Price (high to low)
                  </MenuItem>
                  <MenuItem value="A_TO_Z" sx={screenAdsStyles.menuItem}>
                    Name (A to Z)
                  </MenuItem>
                  <MenuItem value="Z_TO_A" sx={screenAdsStyles.menuItem}>
                    Name (Z to A)
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Ads;
