import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const BookCard = ({ book }) => {

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
