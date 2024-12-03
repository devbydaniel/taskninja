import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  return new Response("Hello from TaskNinja!", { status: 200 });
};
