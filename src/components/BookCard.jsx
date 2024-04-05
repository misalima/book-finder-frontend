import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const BookCard = ({ title, author, coverImageUrl, summary }) => {
    const book = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImageUrl:
        "https://m.media-amazon.com/images/I/81QuEGw8VPL._AC_UF1000,1000_QL80_.jpg",
      summary:
        "A classic novel about the Roaring Twenties and the elusive American Dream.",
    };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={book.coverImageUrl}
        alt={`Cover of the book ${book.title}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          by {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.summary}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
