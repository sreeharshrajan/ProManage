const baseUrl =
  process.env.RENDER === 'true'
    ? 'https://promanage.onrender.com' // replace with your actual Render subdomain
    : `${process.env.HOST || 'http://localhost'}:${process.env.PORT || 5000}`;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ProManage API',
    version: '1.0.0',
    description: `
      The **ProManage API** provides endpoints for managing users, projects, and tasks.

      ## 🔐 Authentication

      Use a JWT token as a Bearer token:
      \`\`\`
      Authorization: Bearer <your-token>
      \`\`\`

      ## 📦 Content-Type

      All routes consume and produce \`application/json\`.
    `,
    contact: {
      name: 'ProManage API Support',
      email: 'support@promanage.com',
    },
  },
  servers: [
    {
      url: baseUrl,
      description: process.env.RENDER === 'true' ? 'Render Production' : 'Local Development Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

export default swaggerDefinition;
