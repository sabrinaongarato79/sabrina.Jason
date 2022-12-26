/* Imports */
// Dependencies/Libraries
const express = require("express");
// Custom imports
const router = require("./routes");
const controllers = require("./controllers");
/* END */

// Constants
const app = express();
const PORT = 3001;
/* END */

/* Middlewares */
app.use(express.json());
/* END */

/* Routes */
app.use("/tasks", router);
app.all("*", controllers.all);
/* END */

/* Server listening petitions */
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
/* END */
