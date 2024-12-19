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
app.use(express.static("public"));

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
            res.redirect("index.html");
        } catch (err) {
            console.log(err);
        }
    });

app.listen(port, ()=> {
    console.log(`Server Successfully running on port ${port}`);
});



// document.addEventListener('DOMContentLoaded', function() { 
//     const stars = document.querySelectorAll('.star'); 
//     const ratingValue = document.getElementById('rating-value');
//     const heading = document.getElementById('heading-change'); 
//     stars.forEach(star => { 
//         star.addEventListener('click', function() { 
//             const value = this.getAttribute('data-value'); 
//             ratingValue.textContent = `Rating: ${value}`;
             
//             stars.forEach(s => { 
//                 s.classList.remove('selected'); 
//                 if (s.getAttribute('data-value') <= value) { 
//                     s.classList.add('selected'); 
//                 } 
//             });  
//         }); 
//     }); 
// });