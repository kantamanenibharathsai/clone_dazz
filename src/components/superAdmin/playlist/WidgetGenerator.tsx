import { Box, SxProps, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Widget } from "../../../redux/reducers/layoutsReducer/layouts";
import RenderWebFields from "./fields/RenderWebFields";
interface IProps {
  parentId:number;
  widgetName: string;
  selectedWidgetItem: Widget;
  closeWidgetPreview: () => void;
}

const WidgetGenerator: React.FC<IProps> = ({
  parentId,
  widgetName,
  selectedWidgetItem,
  closeWidgetPreview,
}: IProps) => {
  const [previewHtml, setPreviewHtml] = useState<string>("")
  const renderWidgetField = useMemo(() => {
    const props = {
      parentId,
      closeWidgetPreview,
      initialFieldsValue: selectedWidgetItem,
      onChange: (text: string) => setPreviewHtml(text)
    }
    switch (selectedWidgetItem.type) {
      case "web":
      default:
        return <RenderWebFields {...props} />;
    }
    // eslint-disable-next-line
  }, [selectedWidgetItem])// eslint-disable-this-line

  return (
    <Box sx={styles.container}>
      <Box>
        <Typography sx={styles.title}>{widgetName}</Typography>
      </Box>
      <Box sx={styles.innerContainer}>
        <Box sx={styles.fieldsContainer}>
          {renderWidgetField}
        </Box>
        <Box sx={styles.previewContainer} dangerouslySetInnerHTML={{ __html: previewHtml }} />
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    p: 4,
  },
  title: {
    color: "#0C6DFB",
    fontSize: "20px",
  },
  innerContainer: {
    display: 'flex',
    mt: 4,
  },
  fieldsContainer: {
    flex: 2,
    pr: 2
  },
  previewContainer: {
    flex: 3,
    border: '1px solid #000',
    height: 450,
    background: '#ffffff'
  }
} satisfies Record<string, SxProps>;

export default WidgetGenerator;
