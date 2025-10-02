import { jsonResponse } from "./utils.ts";
import { createTask, getAllTasks, findTasksByName, editTask, deleteTask, populate, checkTask } from "./service.ts";

export async function handleGetTasks(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const query = url.searchParams.get("q");
  if (query && query.trim().length > 0) {
    const results = await findTasksByName(query);
    return jsonResponse(results);
  }
  const tasks = await getAllTasks();
  return jsonResponse(tasks);
}

export async function handleEdit(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    if (!body || typeof body.title !== "string" || body.title.trim().length === 0) {
      return jsonResponse({ error: "'title' is required" }, 400);
    }
    const edited = await editTask(body);
    return jsonResponse(edited, 201);
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }
}

export async function handleCreateTask(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    console.log(body)
    if (!body || typeof body.title !== "string" || body.title.trim().length === 0) {
      return jsonResponse({ error: "'title' is required" }, 400);
    }
    const created = await createTask(body);
    return jsonResponse(created, 201);
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }
}

export async function handleDeleteTask(req: Request): Promise<Response> {
  console.log("trying to delete");
  try {
    const id = await req.json();
    const response = await deleteTask(id);
    return jsonResponse(response, 201);
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }
}

export async function handlePopulate(): Promise<Response> {
  console.log('populating');
  try {
    const response = await populate();
    return jsonResponse(response, 201);
  } catch {
    return jsonResponse({error: "Could not populate"}, 400)
  }
}

export async function handleCheck(req: Request): Promise<Response> {
  try {
    const id = await req.json();
    const response = await checkTask(id);
    return jsonResponse(response, 201);
  } catch {
    return jsonResponse({ error: "Could not check task" }, 400);
  }
}
