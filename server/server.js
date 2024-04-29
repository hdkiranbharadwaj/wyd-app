// Import Libraries
import express from "express";
import cors from "cors";
import pg from "pg";
import db_ from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;
import env from "dotenv";
import bodyParser from "body-parser";

// Constants
const port = 5000;
const app = express();
env.config();
const db = db_;

// Middleware
env.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
db.connect();

// Routes

// Get notes
app.get("/api/getnotes", async (req, res) => {
  try {
    const allNotes = await db.query(
      "SELECT u.fullname, n.status FROM users u JOIN notes n ON u.userid = n.userid ORDER BY n.statusid ASC"
    );
    res.json(allNotes.rows);
  } catch (err) {
    console.log(err);
  }
});

// Signup
app.post("/api/signup", async (req, res) => {
  const email = req.body.email;
  const fullname = req.body.fullname;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkResult.rows.length > 0) {
      res.status(400).send("Email already exists. Try logging in.");
    } else {
      // Hashing
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error hashing password");
        } else {
          const result = await db.query(
            "INSERT INTO users (fullname,email,hash) VALUES ($1, $2, $3) RETURNING *",
            [fullname, email, hash]
          );
          const userid = result.rows[0].userid;
          const token = jwt.sign({ userid }, "secret", { expiresIn: "1hr" });
          res.status(200).json({ userid, token });
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.hash;
      const userid = user.userid;
      bcrypt.compare(password, storedPassword, (err, result) => {
        if (err) {
          console.error(err);
        }
        if (result) {
          const token = jwt.sign({ userid }, "secret", { expiresIn: "1hr" });

          res.status(200).json({ userid, token });
        } else {
          res.status(400).send("Incorrect Password");
        }
      });
    } else {
      res.status(500).send("User not found");
    }
  } catch (err) {
    console.error(err);
  }
});

//post notes
app.post("/api/noteadd", async (req, res) => {
  try {
    console.log(req.body);
    const userid = req.body.userid;
    const status = req.body.status;
    const response = await db.query("SELECT * FROM notes where userid = $1", [
      userid,
    ]);
    if (response.rows.length > 0) {
      res
        .status(400)
        .send("You have already set your note for the day, come back tomorrow");
    } else {
      const newnote = await db.query(
        "INSERT INTO notes (userid, status) VALUES ($1, $2)  RETURNING *",
        [userid, status]
      );
      res.send("Done");
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
