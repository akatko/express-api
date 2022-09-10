// require the express module
import express from "express";
import { Shop } from "../models/shop";

// create a new Router object
const routes = express.Router();

// creating my first route
routes.get("/greetings", (req, res) => {
  console.log("howdy");
});

routes.get("/movies/2022", (req, res) => {
  res.json({ name: "taz", favColor: "blue" });
});

routes.get("/stores", (req, res) => {
  res.json("here are the stores");
});

const shops: Shop[] = [
  { id: 111, name: "Pepper's Pizza", rating: 4.5 },
  { id: 222, name: "Clive's Chives", rating: 3.4 },
  { id: 333, name: "Betty's Brews", rating: 4.3 },
  { id: 444, name: "Sylvester's Shoes", rating: 3.8 },
  { id: 555, name: "Teddy's Tunes", rating: 4.7 },
];

routes.get("/api/shops", (req, res) => {
    console.log(req.query);
    let minRating = Number(req.query.minRating);
    if (minRating) {
    let filteredShops = shops.filter(shop => shop.rating >= minRating);
    res.json(filteredShops) 
    } else {
    res.json(shops);
    }
});

routes.get("/api/shops/:id", (req, res) => {
  console.log(req.params);

  let id = parseInt(req.params.id);
//   let id = Number(req.params.id);
//   let id = +req.params.id;
// ^^^ alt ways to turn string to number ^^^
  
let foundShop = shops.find(shop => shop.id === id);
if(foundShop) {
    res.json(foundShop);
} else {
    res.status(404);
    res.json({ "error": `Shop not found: ${req.params.id}`});
}

// res.json(foundShop);
 
});

export default routes;
