import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  return new Response("Hi from TaskNinja!", { status: 200 });
};
