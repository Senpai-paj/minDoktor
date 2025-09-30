import { jsonResponse, handleCors } from "./utils.ts";
import { handleCreateTask, handleGetTasks, handleEdit, handleDeleteTask } from "./controller.ts";

// In-memory seed removed; using repository-backed storage


Deno.serve(async (req) => {
  const url = new URL(req.url);

  // Handle CORS preflight
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  if (req.method === "GET" && url.pathname === "/tasks") {
    console.log('trying to get tasks');
    return await handleGetTasks(req);
  }

  if (req.method === "PUT" && url.pathname === "/edit") {
    return await handleEdit(req);
  }

  if (req.method === "POST" && url.pathname === "/create") {
    return await handleCreateTask(req);
  }

  if (req.method === "DELETE" && url.pathname === "/delete") {
    return await handleDeleteTask(req);
  }

  return jsonResponse({ error: "Not found" }, 404);
});