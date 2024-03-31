import React from "react";
import { Typography, Container, Card, CardContent } from "@mui/material";

const About = () => {
  return (
    <Container sx={{ mt: "50px" }} maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            About Book Finder
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to Book Finder, your go-to web app for discovering and
            organizing your favorite books!
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to make it easy for book lovers to search for books
            based on subjects, keywords, authors, and more. Whether you're
            looking for your next great read or building a personalized reading
            list, Book Finder has got you covered.
          </Typography>
          <Typography variant="body1" paragraph>
            With our intuitive user interface and seamless integration with
            popular book APIs, finding and saving books has never been easier.
          </Typography>
          <Typography variant="body1">
            Start exploring and organizing your reading journey with Book Finder
            today!
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;
