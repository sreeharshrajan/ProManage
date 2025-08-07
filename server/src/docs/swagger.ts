import swaggerJSDoc from 'swagger-jsdoc';
import swaggerDefinition from './definition';

const options = {
  swaggerDefinition,
  apis: [
    './src/docs/definitions/*.ts', // Custom structured definitions
    './src/routes/*.ts',           // (Optional) JSDoc in routes
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
