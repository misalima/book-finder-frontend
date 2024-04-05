import { Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ padding: "80px" }} id="error-page">
      <Typography variant="h4" color={"red"} sx={{ p: "20px" }}>
        Error
      </Typography>
      <hr />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p style={{ fontSize: "24px" }}>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
