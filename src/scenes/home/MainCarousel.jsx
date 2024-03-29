import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { shades } from "../../theme";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { useEffect, useState } from "react";

// import all image from assets folder
async function importAllImages() {
  const modules = import.meta.glob("../../assets/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });
  const images = {};
  for (const path in modules) {
    const fileName = path.split("/").pop();
    images[fileName] = modules[path].default;
  }
  return images;
}

const MainCarousel = () => {
  const [images, setImages] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    importAllImages().then(setImages);
  }, []);

  return (
    <Carousel
      infiniteLoop
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler) => (
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
          onClick={onClickHandler}
        >
          <NavigateBefore sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler) => (
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
          onClick={onClickHandler}
        >
          <NavigateNext sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.entries(images).map(([fileName, path], index) => (
        <Box key={`carousel-image-${fileName}`}>
          <img
            src={path}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "700px",
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
          />
          <Box
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            backgroundColor="rgb(0,0,0,0.4)"
            position="absolute"
            top="46%"
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "240px"}
          >
            <Typography color={shades.secondary[200]}>-- NEW ITEMS</Typography>
            <Typography variant="h1">Summer Sale</Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{ textDecoration: "underline" }}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
