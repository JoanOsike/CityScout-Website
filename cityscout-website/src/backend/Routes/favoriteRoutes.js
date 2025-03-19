const express = require("express");
const db = require("../db");

const router = express.Router();

// Add Favorite
router.post("/add", (req, res) => {
    const { username, name, category, street_address, city, province, contacts } = req.body;

    // Step 1: Get the user_id from the username
    const getUserIdSql = "SELECT id FROM users WHERE username = ?";
    db.query(getUserIdSql, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to retrieve user ID." });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const user_id = results[0].id;

        // Step 2: Check if the favorite already exists
        const checkFavoriteSql =
            "SELECT * FROM favorites WHERE user_id = ? AND name = ? AND city = ?";
        db.query(checkFavoriteSql, [user_id, name, city], (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Failed to check existing favorites." });
            }

            if (results.length > 0) {
                return res.status(409).json({ message: "This location is already in your favorites." });
            }

            // Step 3: Insert into the favorites table if not already present
            const addFavoriteSql =
                "INSERT INTO favorites (user_id, name, category, street_address, city, province, contacts) VALUES (?, ?, ?, ?, ?, ?, ?)";
            db.query(
                addFavoriteSql,
                [user_id, name, category, street_address, city, province, contacts],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: "Failed to add favorite." });
                    }

                    res.json({ message: "Favorite added successfully!" });
                }
            );
        });
    });
});



// Get User Favorites
router.get("/:username", (req, res) => {
    const { username } = req.params;

    // Query to get the user_id from the users table
    const getUserIdSql = "SELECT id FROM users WHERE username = ?";
    db.query(getUserIdSql, [username], (err, userResults) => {
        if (err) return res.status(500).json({ error: err.message });

        if (userResults.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const userId = userResults[0].id;

        // Query to get the favorites using the user_id
        const getFavoritesSql = "SELECT * FROM favorites WHERE user_id = ?";
        db.query(getFavoritesSql, [userId], (err, favoriteResults) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json(favoriteResults);
        });
    });
});


// Delete a Favorite
router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM favorites WHERE id = ?";
    
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Favorite deleted successfully!" });
    });
});

module.exports = router;
