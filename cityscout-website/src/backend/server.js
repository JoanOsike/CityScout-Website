const express = require("express");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes.js");
const favoriteRoutes = require("./Routes/favoriteRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
