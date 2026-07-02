import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "RAYS Agent — Documentation" },
      {
        name: "description",
        content:
          "Official documentation for the RAYS coding agent: install, quickstart, architecture, skills, MCP servers and more.",
      },
    ],
  }),
  component: () => <Outlet />,
});
