import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const db = new pg.Client({
    user: 'postgres',
    host:'localhost',
    database: 'Portfolio',
    password: '0.2242',
    port: 5432
});

const app = express();
const port = 3000;

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("Public"));

app.get("/", async (req, res) => {
    res.render("index.html");
});

app.post("/submit", async (req, res) => {
    const person = req.body.namef;
    const rating = req.body.num;

    try {
        const result = await db.query(
            "INSERT INTO feedback (fname, rating) VALUES ($1, $2)",
            [person, rating]
        );
            res.render("index.ejs"); 
        } catch (err) {
            const message = "This is a custom error message"; 
            console.error(message);  
            console.error(err); 
            res.status(500).send(message);
        }
    });

app.listen(port, ()=> {
    console.log(`Server Successfully running on port ${port}`);
});

