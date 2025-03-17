const express = require("express");
const db = require("../db");

const router = express.Router();

// Add Favorite
router.post("/add", (req, res) => {
    const { user_id, name, category, street_address, city, province, contacts } = req.body;
    
    const sql = "INSERT INTO favorites (user_id, name, category, street_address, city, province, contacts) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [user_id, name, category, street_address, city, province, JSON.stringify(contacts)], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Favorite added successfully!" });
    });
});

// Get User Favorites
router.get("/:user_id", (req, res) => {
    const sql = "SELECT * FROM favorites WHERE user_id = ?";
    
    db.query(sql, [req.params.user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
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
