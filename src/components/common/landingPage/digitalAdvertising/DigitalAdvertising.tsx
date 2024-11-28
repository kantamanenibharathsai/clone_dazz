import { Box, Grid, Pagination, Typography } from "@mui/material";
import React, { useState } from "react";
import { digitalAdvertisingData } from "./DigitalAdvertisingData";
import { digitalAdvertisingStyles } from "./DigitalAdvertisingStyles";

const DigitalAdvertising = () => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = digitalAdvertisingData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(digitalAdvertisingData.length / itemsPerPage);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={digitalAdvertisingStyles.mainContainer}>
      <Grid container spacing={3}>
        {currentItems.map((eachData) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={eachData.id}>
            <Box sx={digitalAdvertisingStyles.cardContainer}>
              <Box
                component={"img"}
                src={eachData.image}
                alt={eachData.title}
                sx={digitalAdvertisingStyles.imgStyle}
              />
              <Typography mt={2}>{eachData.title}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box mt={5}>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default DigitalAdvertising;
