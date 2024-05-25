import { Typography, makeStyles } from "@material-ui/core";
import React from "react";
import { Container } from "@material-ui/core";
import bgImage from "../assets/images/banner.jpg";
import Carousel from "./Carousel";
const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: `url(${bgImage})`,
    height: "25rem",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    gap: "1rem",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{ fontWeight: "bold", fontFamily: "Montserrat" }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Gell all the info regarding your favority crypto currency
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  );
};

export default Banner;
