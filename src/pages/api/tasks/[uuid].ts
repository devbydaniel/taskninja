import type { APIRoute } from "astro";
import { TaskStatus } from "../../../lib/models/types";
import {
  updateTask,
  updateTaskWithCommand,
  deleteTask,
} from "../../../lib/data/taskWarrior";

export const PATCH: APIRoute = async ({ request, params }) => {
  const { uuid } = params;
  const { key, newValue, command } = await request.json();
  if (!uuid) {
    return new Response(
      JSON.stringify({
        message: "Missing param uuid",
      }),
      { status: 400 },
    );
  }
  if (!key && !command) {
    // value can be empty string
    return new Response(
      JSON.stringify({
        message: "Missing key and newValue or command",
      }),
      { status: 400 },
    );
  }
  if (command) {
    try {
      await updateTaskWithCommand(uuid, command);
      return new Response(null, { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: "An error occurred",
        }),
        { status: 500 },
      );
    }
  }
  if (key === "status" && !Object.values(TaskStatus).includes(newValue)) {
    return new Response(
      JSON.stringify({
        message: "Invalid status",
      }),
      { status: 400 },
    );
  }
  try {
    await updateTask(uuid, key, newValue || "");
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "An error occurred",
      }),
      { status: 500 },
    );
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  const { uuid } = params;
  if (!uuid) {
    return new Response(
      JSON.stringify({
        message: "Missing param uuid",
      }),
      { status: 400 },
    );
  }
  try {
    await deleteTask(uuid);
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "An error occurred",
      }),
      { status: 500 },
    );
  }
};
