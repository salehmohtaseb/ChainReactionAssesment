const port = parseInt(process.env.HTTP_PORT) || 3001
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "CChain Reaction API'S",
        version: "0.1.0",
        description:
          "Doc for Chain-Reaction assessment",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Saleh Almohtaseb",
          email: "saleh.a.almohtaseb@gmail.com",
        },
      },
      servers: [
        {
          url: `http://localhost:${port}/api/v1`,
        },
      ],
    },
    apis: ["./app/routes/*.routes.js", './app/controllers/*.controller.js'],
  };

module.exports = options;