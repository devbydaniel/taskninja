import type { APIRoute } from "astro";
import { createTask } from "../../../lib/data/taskWarrior";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const form = Object.fromEntries(data.entries());
  const description = form.description as string | undefined;
  const project = form.project as string | undefined;
  const scheduled = form.scheduled as string | undefined;
  const due = form.due as string | undefined;
  const tags = Object.entries(form)
    .filter(([tag, value]) => tag.startsWith("tag-") && value === "on")
    .map(([tag]) => tag.replace("tag-", ""));

  if (!description) {
    return new Response(
      JSON.stringify({
        message: "Missing required field description",
      }),
      { status: 400 },
    );
  }
  await createTask({ description, project, scheduled, due, tags });
  return new Response(null, { status: 201 });
};
