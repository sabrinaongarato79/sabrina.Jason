/* Imports */
const { sendPayload, messageCreator } = require("./utils");
const db = require("./db");
/* END */

/* Controllers */
const controllers = {};

controllers.get = async (req, res) => {
  // 2.- Obtener todas las tareas
  const method = "GET";
  let statusCode;
  let message;

  try {
    const queryResult = await db.query("SELECT * FROM tasks;");
    const tasks = queryResult.rows;

    if (queryResult.rows.length === 0) {
      statusCode = 404;
      message = messageCreator(method, true, "Not found");
    } else {
      statusCode = 200;
      message = messageCreator(method, false, "Retrieving all tasks");
    }

    res.status(statusCode).json(sendPayload(message, tasks, statusCode));
  } catch (e) {
    statusCode = 500;
    message = messageCreator(
      method,
      true,
      `Internal Server Error: DANGER! showing backend error message, only with testing purposes. message<${e.message}>`
    );
    res.status(statusCode).json(sendPayload(message, null, statusCode));
  }
};

controllers.post = async (req, res) => {
  // 1.- Crear una tarea
  const { title, description, status } = req.body;

  const method = "POST";
  let statusCode;
  let message;

  try {
    const queryResult = await db.query(
      "INSERT INTO tasks(title, description, status) VALUES($1, $2, $3) RETURNING *;",
      [title, description, status]
    );
    const insertedTask = queryResult.rows;

    if (insertedTask.length === 0 || !queryResult) {
      statusCode = 400;
      message = messageCreator(method, true, "Not created");
    } else {
      statusCode = 201;
      message = messageCreator(method, false, "Created successfully");
    }

    res.status(statusCode).json(sendPayload(message, insertedTask, statusCode));
  } catch (e) {
    statusCode = 500;
    message = messageCreator(
      method,
      true,
      `Internal Server Error: DANGER! showing backend error message, only with testing purposes. message<${e.message}>`
    );
    res.status(statusCode).json(sendPayload(message, null, statusCode));
  }
};

controllers.put = async (req, res) => {
  // 3.- Actualizar el status de una tarea. (complete: false/true) por ID
  // En este punto debes considerar que el update solo permite actualizar la propiedad estatus, no el nombre, no la descripción de una tarea.
  const { id, status } = req.body;

  const method = "PUT";
  let statusCode;
  let message;

  try {
    const queryResult = await db.query(
      "UPDATE tasks SET status = $2 WHERE id = $1 RETURNING *;",
      [id, status]
    );
    const updatedTask = queryResult.rows;

    if (updatedTask.length === 0 || !queryResult) {
      statusCode = 400;
      message = messageCreator(method, true, "Not updated");
    } else {
      statusCode = 200;
      message = messageCreator(method, false, "Updated successfully");
    }

    res.status(statusCode).json(sendPayload(message, updatedTask, statusCode));
  } catch (e) {
    statusCode = 500;
    message = messageCreator(
      method,
      true,
      `Internal Server Error: DANGER! showing backend error message, only with testing purposes. message<${e.message}>`
    );
    res.status(statusCode).json(sendPayload(message, null, statusCode));
  }
};

controllers.delete = async (req, res) => {
  // 4.- Eliminar una tarea por ID
  const { id } = req.body;

  const method = "DELETE";
  let statusCode;
  let message;

  try {
    const queryResult = await db.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *;",
      [id]
    );
    const deletedTask = queryResult.rows;

    if (deletedTask.length === 0 || !queryResult) {
      statusCode = 400;
      message = messageCreator(method, true, "Not deleted");
    } else {
      statusCode = 200;
      message = messageCreator(method, false, "Deleted successfully");
    }

    res.status(statusCode).json(sendPayload(message, deletedTask, statusCode));
  } catch (e) {
    statusCode = 500;
    message = messageCreator(
      method,
      true,
      `Internal Server Error: DANGER! showing backend error message, only with testing purposes. message<${e.message}>`
    );
    res.status(statusCode).json(sendPayload(message, null, statusCode));
  }
};

controllers.all = (req, res) => {
  const statusCode = 404;
  const message = "Route not found";
  const payload = [
    {
      route: "/tasks",
      method: "GET",
    },
    {
      route: "/tasks",
      method: "POST",
      receives: {
        body: {
          title: "task title",
          description: "task description",
          status: "task status",
        },
      },
    },
    {
      route: "/tasks",
      method: "PUT",
      receives: { body: { id: "task id", status: "task status" } },
    },
    {
      route: "/tasks",
      method: "DELETE",
      receives: { body: { id: "task id" } },
    },
  ];

  res.status(404).json(sendPayload(message, payload, statusCode));
};
/* END */

module.exports = controllers;
