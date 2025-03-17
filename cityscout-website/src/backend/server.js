const express = require("express");
const userRoutes = require("./Routes/userRoutes.js");
const favoriteRoutes = require("./Routes/favoriteRoutes.js");

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
