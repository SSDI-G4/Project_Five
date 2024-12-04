// import { Box, Grid, Modal, Typography } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./favorites.css";
// import moment from "moment";

// function Favorites() {
//   const [favorites, setFavorites] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState();
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/photos/favorites")
//       .then((res) => setFavorites(res.data))
//       .catch((err) => console.log(err));
//   }, []);
//   const onFavoriteRemove = (photo) => {
//     axios
//       .post("http://localhost:3000/photos/favorite/" + photo._id)
//       .then(() => {
//         axios
//           .get("http://localhost:3000/photos/favorites")
//           .then((res) => {
//             setFavorites(res.data);
//             setIsModalOpen(false);
//           })
//           .catch((err) => console.log(err));
//       })
//       .catch((err) => console.log(err));
//   };
//   console.log(favorites, "FAVORITES");
//   return (
//     <div>
//       <Typography variant="h4">Favorites</Typography>
//       <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4 }}>
//           <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={4}>
//             Image by {selectedImage?.user_id?.first_name} {selectedImage?.user_id?.last_name}
//           </Typography>
//           <img src={`../../images/${selectedImage?.file_name}`} alt="preview" className="img-style" />
//           <Typography variant="body2" fontSize={12}>
//             Posted on: {moment(selectedImage?.date_time).format("MMMM Do YYYY")} at {moment(selectedImage?.date_time).format("h:mm a")}
//           </Typography>
//           <Typography onClick={() => onFavoriteRemove(selectedImage)} sx={{ textDecoration: "underline", cursor: "pointer" }}>
//             Remove from favorites
//           </Typography>
//         </Box>
//       </Modal>
//       {favorites?.length > 0 ? (
//         <Grid spacing={2} container sx={{ marginTop: 4 }}>
//           {favorites.map((photo) => (
//             <Grid
//               sx={{ cursor: "pointer" }}
//               item
//               key={photo._id}
//               xs={3}
//               onClick={() => {
//                 setSelectedImage(photo);
//                 setIsModalOpen(true);
//               }}
//             >
//               <img src={`../../images/${photo?.file_name}`} className="image-style" />
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography>No favorite photos added yet</Typography>
//       )}
//     </div>
//   );
// }

// export default Favorites;


import { Box, Grid, Modal, Typography, Card, CardActionArea, CardMedia, CardContent, useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import "./favorites.css";
import moment from "moment";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios
      .get("http://localhost:3000/photos/favorites")
      .then((res) => setFavorites(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onFavoriteRemove = (photo) => {
    axios
      .post("http://localhost:3000/photos/favorite/" + photo._id)
      .then(() => {
        axios
          .get("http://localhost:3000/photos/favorites")
          .then((res) => {
            setFavorites(res.data);
            setIsModalOpen(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ padding: theme.spacing(4) }}>
      <Typography variant="h4" sx={{ marginBottom: theme.spacing(3), color: theme.palette.primary.main }}>
        Your Favorites
      </Typography>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: isMobile ? "90%" : "50%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            padding: theme.spacing(4),
          }}
        >
          <Typography variant="h6" marginBottom={2}>
            Image by {selectedImage?.user_id?.first_name} {selectedImage?.user_id?.last_name}
          </Typography>
          <CardMedia
            component="img"
            height="300"
            image={`../../images/${selectedImage?.file_name}`}
            alt="preview"
            sx={{ borderRadius: 1, marginBottom: theme.spacing(2) }}
          />
          <Typography variant="body2" sx={{ marginBottom: theme.spacing(2), color: theme.palette.text.secondary }}>
            Posted on: {moment(selectedImage?.date_time).format("MMMM Do YYYY")} at {moment(selectedImage?.date_time).format("h:mm a")}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: "underline", cursor: "pointer", color: theme.palette.error.main }}
            onClick={() => onFavoriteRemove(selectedImage)}
          >
            Remove from favorites
          </Typography>
        </Box>
      </Modal>

      {favorites?.length > 0 ? (
        <Grid container spacing={3}>
          {favorites.map((photo) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={photo._id}>
              <Card sx={{ borderRadius: 2 }}>
                <CardActionArea
                  onClick={() => {
                    setSelectedImage(photo);
                    setIsModalOpen(true);
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`../../images/${photo?.file_name}`}
                    alt={photo?.file_name}
                    sx={{ borderRadius: "4px 4px 0 0" }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      By {photo?.user_id?.first_name} {photo?.user_id?.last_name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No favorite photos added yet.
        </Typography>
      )}
    </Box>
  );
}

export default Favorites;