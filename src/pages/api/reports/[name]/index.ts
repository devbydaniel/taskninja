import type { APIRoute } from "astro";
import { getReportTasks } from "../../../../lib/data/taskWarrior";

export const GET: APIRoute = async ({ params }) => {
  const { name } = params;
  if (!name) {
    return new Response(
      JSON.stringify({
        message: "Missing required field description",
      }),
      { status: 400 },
    );
  }
  const tasks = await getReportTasks(name);
  return new Response(JSON.stringify({ data: tasks }), { status: 200 });
};
