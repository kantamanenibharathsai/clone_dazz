import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Divider, Typography } from "@mui/material";
import { useRef } from "react";
import Slider from "react-slick";
import { translate } from "../../../../config/i18n";
import { testimonialData } from "./TestimonialData";
import { testimonialStyles } from "./TestimonialSectionStyles";

const TestimonialSection = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handleNextButton = () => {
    sliderRef.current?.slickNext();
  };

  const handlePrevButton = () => {
    sliderRef.current?.slickPrev();
  };
  function appendDots(dots: React.ReactNode) {
    return (
      <Box sx={testimonialStyles.dotsContainer}>
        <Box sx={testimonialStyles.iconContainer} onClick={handlePrevButton}>
          <KeyboardArrowLeftIcon />
        </Box>
        <Box>{dots}</Box>
        <Box sx={testimonialStyles.iconContainer} onClick={handleNextButton}>
          <KeyboardArrowRightIcon />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={testimonialStyles.mainContainer}>
      <Typography sx={testimonialStyles.title}>
        {translate("common.whatPeopleSayAboutUs")}
      </Typography>
      <Divider sx={testimonialStyles.dividerStyle} />

      <Slider {...settings} dots={true} appendDots={appendDots} ref={sliderRef}>
        {testimonialData.map((eachData) => (
          <Box key={eachData.id}>
            <Box
              component={"img"}
              src={eachData.imageSrc}
              sx={testimonialStyles.imgStyle}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TestimonialSection;
