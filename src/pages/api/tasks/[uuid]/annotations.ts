import type { APIRoute } from "astro";
import { annotateTask, getAnnotations } from "../../../../lib/data/taskWarrior";

export const POST: APIRoute = async ({ request, params }) => {
  const { uuid } = params;
  if (!uuid) {
    return new Response(
      JSON.stringify({
        message: "Missing param uuid",
      }),
      { status: 400 },
    );
  }
  const { annotation } = await request.json();
  if (!annotation) {
    return new Response(
      JSON.stringify({
        message: "Missing annotation",
      }),
      { status: 400 },
    );
  }

  const processedAnnotation = annotation
    .replace(/\n/g, " ")
    .replace(/"/g, '\\"')
    .trim();

  try {
    await annotateTask(uuid, processedAnnotation);
    const updatedAnnotations = await getAnnotations(uuid);
    return new Response(JSON.stringify({ data: updatedAnnotations }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "An error occurred";
    return new Response(
      JSON.stringify({
        message,
      }),
      { status: 500 },
    );
  }
};

export const GET: APIRoute = async ({ params }) => {
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
    const annotations = await getAnnotations(uuid);
    return new Response(JSON.stringify({ data: annotations }), { status: 200 });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "An error occurred";
    return new Response(
      JSON.stringify({
        message,
      }),
      { status: 500 },
    );
  }
};
