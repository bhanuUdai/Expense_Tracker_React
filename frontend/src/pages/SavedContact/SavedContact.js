import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";

export default function SavedContact({ contactPageDetails, ...prop }) {
  return (
    <Card sx={{ maxWidth: "50vw", margin: "auto auto auto auto" }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          padding: "15px",
          textAlign: "center",
        }}
      >
        {`Hi, ${contactPageDetails[0]?.["name"]}`}
      </Typography>
      <CardActionArea
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection : "column"
        }}
      >
        <Box
          sx={{
            padding: "0px 20px",
            height: "500px",
            width: "500px",
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            width="100%"
            image={contactPageDetails[0]?.["profile_photo"]}
            alt="profile"
          />
        </Box>
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="div">
            {contactPageDetails[0]?.["name"]}
          </Typography> */}
          <Button
            variant="contained"
            size="medium"
            startIcon={<EditIcon />}
            onClick={prop.editButton}
          >
            Edit
          </Button>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
