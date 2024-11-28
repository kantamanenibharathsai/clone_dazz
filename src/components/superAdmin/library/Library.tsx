import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import Media from "../../admin/library/Library";
import Widgets from "./Widgets";
import { libraryStyles } from "./libraryStyles";

const Library = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={libraryStyles.tabsContainer}
      >
        <Tab label="Media" />
        <Tab label="Widgets" />
      </Tabs>
      {value === 0 ? <Media /> : <Widgets />}
    </>
  );
};

export default Library;
