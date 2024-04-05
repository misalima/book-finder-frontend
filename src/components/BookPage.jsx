import React from "react";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";

const BookPage = () => {
    const book = {
      title: "1984",
      author: "George Orwell",
      coverImageUrl:
        "https://m.media-amazon.com/images/I/61NAx5pd6XL._AC_UF1000,1000_QL80_.jpg",
      summary: "A dystopian social science fiction novel and cautionary tale.",
      publicationDate: "June 8, 1949",
      isbn: "978-0451524935",
      pageCount: 328,
    };
  return (
    <Card raised sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            image={book.coverImageUrl}
            alt={`Cover of the book ${book.title}`}
            sx={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography gutterBottom variant="h3" component="h1">
              {book.title}
            </Typography>
            <Typography gutterBottom variant="h5" color="text.secondary">
              by {book.author}
            </Typography>
            <Typography variant="body1" paragraph>
              {book.summary}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Published: {book.publicationDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ISBN: {book.isbn}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pages: {book.pageCount}
            </Typography>
            {/* Additional details like reviews or ratings can be added here */}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BookPage;
