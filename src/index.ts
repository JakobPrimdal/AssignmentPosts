import { serve } from "bun";

const server = serve({
  port: 3000,

  routes: {
    "/api/hello": {
      async GET() {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },

      async PUT() {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;

      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    "/*": async req => {
      const url = new URL(req.url);
      let path = url.pathname;

      // React Router SPA fallback
      if (path === "/" || path.startsWith("/post/")) {
        path = "/index.html";
      }

      const file = Bun.file(`./dist${path}`);

      if (await file.exists()) {
        return new Response(file);
      }

      return new Response("Not Found", { status: 404 });
    },
  },
});

console.log(`🚀 Server running at ${server.url}`);