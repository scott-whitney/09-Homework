// require dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, "/db/db.json");

const uuidv4 = require('uuid/v4');
const database = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static("public"));
// // notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
// return all saved notes in database as JSON
app.get("/api/notes", function(req, res) {
    res.json(database);
  });

app.post("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", function read(err, data) {
        if (err) {
            throw err;
        }
        let content = data;
        let readContent = JSON.parse(content)

       

        req.body.id = uuidv4();


        readContent.push(req.body)
        // pushing the new note into the hold note.

       newNotes = JSON.stringify(readContent)

        fs.writeFile("./db/db.json", newNotes, function (err) {

           if (err) throw err;
           console.log("Note successfully added")
           console.log(data)

 
       })

    });

    res.sendFile(path.join(__dirname, "./db/db.json"))
})

app.delete ("/api/notes/:id", function(req, res) {

    fs.readFile("./db/db.json", function read(err, data) {
        if (err){
            throw err;
        }
        let currentDelete = req.params.id

        console.log(currentDelete)
        let content = data

        console.log(JSON.parse(content))

        let readContent = JSON.parse(content)
        var index = readContent.findIndex(p => p.id == currentDelete)

        console.log(index)

        readContent.splice(index, 1)
 
        

        console.log(readContent)
        newNotes = JSON.stringify(readContent)
        fs.writeFile("./db/db.json", newNotes, function (err) {

            if (err) throw err;
            console.log("Note successfully delete")
            console.log(data)
 
          res.sendFile(path.join(__dirname, "./db/db.json"))
        })

    })

})



  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
