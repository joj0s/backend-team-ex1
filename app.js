const express = require("express");
const app = express();

app.use(express.json());  //Middleware. Το χρησιμοποιούμε για να 
                          //μετατρέψουμε σε json τα δεδομένα που μας στέλνουν

const movies = [
  { id: 1, title: "John Wick" },
  { id: 2, title: "Knives out" },
  { id: 3, title: "Saw" }
];

app.get("/movies", (request, response) => {
  response.send(movies);    //Στέλνουμε στην απάντηση όλο τον πίνακα ταινιών
});

app.post("/movies", (request, response) => {
  const movie = {
    id: movies.length + 1,   //Βάζουμε ως id το μέγεθος του πίνακα + 1
    title: request.body.title  //Παίρνουμε τον τίτλο από το σώμα της αίτησης HTTP
  };

  //Έλεγχος αν μας έστειλαν τον τίτλο της ταινίας στο σώμα της αίτησης
  //Αν όχι, επιστρέφουμε κωδικό 400 (Bad request), και μήνυμα λάθους
  if (!request.body.title) return response.status(400).send("No title given");
  
  //Προσθέτουμε τη νέα ταινία στον πίνακα και την επιστρέφουμε στην απάντηση
  movies.push(movie);
  response.send(movie);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
