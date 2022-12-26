const router = require("express").Router();
const controllers = require("./controllers");

router.get("/", controllers.get);

router.post("/", controllers.post);

router.put("/", controllers.put);

router.delete("/", controllers.delete);

module.exports = router;
