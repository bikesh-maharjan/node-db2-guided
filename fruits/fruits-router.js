const express = require("express");
// db is the connection to the database

const db = require("../data/connection");
const router = express.Router();

router.get("/", (req, res) => {
  //select * from fruits
  // db.select('*') from ('fruits') <----- returns a promise
  db.select("*")
    .from("fruits")
    .then((fruits) => {
      res.status(200).json({ data: fruits });
    })
    .catch((err) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("fruits")
    .where({ id })
    .first()
    .then((fruit) => {
      res.json(fruit);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve fruit" });
    });
});

router.post("/", (req, res) => {
  const fruitData = req.body; // validate the dta before calling the database
  // insert into fruits (name, avgWeightOz, delicious)
  // values ( 'mango', 7.5, true)
  // there willb e a warning when using sqlite, ignore it
  db("fruits")
    .insert(fruitData)
    .returning("id") // to make it work with postgress as well as sqlite
    .then((ids) => {
      res.status(200).json({ data: ids });
    })
    .catch((err) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
