/**
 * Entry point for the todo-back server.
 * Sets up HTTP handlers for task routes using Deno's native server.
 * Handles CORS and maps API endpoints to controller functions.
 *
 * @module main
 */

import { jsonResponse, handleCors } from "./utils.ts";
import { handleCreateTask, handleGetTasks, handleEdit, handleDeleteTask, handlePopulate, handleCheck } from "./controller.ts";

/**
 * The main HTTP request handler for the todo API.
 * Routes requests based on method and pathname, applies CORS, and delegates to controller handlers.
 *
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<Response>} - The HTTP response to send back.
 */
Deno.serve(async (req) => {
  const url = new URL(req.url);

  /**
   * Handles CORS preflight requests.
   * @see handleCors
   */
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  /**
   * GET /tasks - Retrieves all tasks or searches tasks by query.
   */
  if (req.method === "GET" && url.pathname === "/tasks") {
    console.log('trying to get tasks');
    return await handleGetTasks(req);
  }

  /**
   * PUT /edit - Edits an existing task.
   */
  if (req.method === "PUT" && url.pathname === "/edit") {
    return await handleEdit(req);
  }

  /**
   * PUT /check - Checks/unchecks a task (e.g. mark as complete).
   */
  if (req.method === "PUT" && url.pathname === "/check") {
    return await handleCheck(req);
  }

  /**
   * POST /create - Creates a new task.
   */
  if (req.method === "POST" && url.pathname === "/create") {
    return await handleCreateTask(req);
  }

  /**
   * DELETE /delete - Deletes a task.
   */
  if (req.method === "DELETE" && url.pathname === "/delete") {
    return await handleDeleteTask(req);
  }

  /**
   * POST /populate - Populates tasks with sample data.
   */
  if (req.method === "POST" && url.pathname === "/populate") {
    return await handlePopulate();
  }

  /**
   * Any unmatched route returns a 404 error in JSON format.
   */
  return jsonResponse({ error: "Not found" }, 404);
});