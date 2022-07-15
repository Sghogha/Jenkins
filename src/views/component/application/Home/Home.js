import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";

const Home = () => {
  return (
    <Box className="main-section-box main-content-block">
      <Container maxWidth="lg" className="main-container">
        <Grid container className="main-grid-container">
          <Grid item xs={12} sm={12} md={12} lg={12} className="">
            <Typography variant="h4" className="main-title">
              Home
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
