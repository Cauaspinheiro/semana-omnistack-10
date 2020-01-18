const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.get("/devs", DevController.index);
routes.get("/devs/:github_username", DevController.show);
routes.put("/devs/:github_username", DevController.update);
routes.delete("/devs/:github_username", DevController.destroy);
routes.post("/devs", DevController.store);
routes.get("/search", SearchController.index);

module.exports = routes;
