import { serve } from "https://deno.land/std@0.176.0/http/server.ts";
import { join, extname } from "https://deno.land/std@0.176.0/path/mod.ts";

// Ensure the static assets are in the root directory
const ROOT_DIR = "./";  // The root directory where static files are located

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname === "/" ? "/index.html" : url.pathname;

  const filePath = join(ROOT_DIR, path);
  
  try {
    const file = await Deno.readFile(filePath);
    const ext = extname(filePath).toLowerCase();

    const mimeTypes: { [key: string]: string } = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
      ".ttf": "font/ttf",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";
    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (e) {
    return new Response("Not Found", { status: 404 });
  }
}

// Start server on port 8000
serve(handler, { port: 8000 });
console.log("Server is running at port 8000");
