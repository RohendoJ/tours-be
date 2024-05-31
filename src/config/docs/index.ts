export const toursDocs = {
  openapi: "3.0.3",
  info: {
    title: "Tours RESTful API",
    version: "1.0.0",
    description: "RESTful API for manage Tours",
    contact: {
      email: "rohendoj3134@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3500",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  tags: [
    {
      name: "Authentication",
    },
    {
      name: "Tours",
    },
    {
      name: "Users",
    },
  ],
  paths: {
    "/api/v1/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  fullname: {
                    type: "string",
                  },
                  username: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Ok",
          },
          "400": {
            description: "Bad request",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Ok",
          },
          "400": {
            description: "Bad request",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/tours": {
      post: {
        tags: ["Tours"],
        summary: "Create new tour",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  province: {
                    type: "string",
                  },
                  province_id: {
                    type: "string",
                  },
                  regency: {
                    type: "string",
                  },
                  regency_id: {
                    type: "string",
                  },
                  latitude: {
                    type: "string",
                  },
                  longtitude: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Ok",
          },
          "400": {
            description: "Bad request",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
      get: {
        tags: ["Tours"],
        summary: "Get all tours",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "page",
            in: "query",
            description: "Nomor halaman",
            required: false,
            schema: {
              type: "integer",
              default: 1,
            },
          },
          {
            name: "page_size",
            in: "query",
            description: "Ukuran halaman",
            required: false,
            schema: {
              type: "integer",
              default: 10,
            },
          },
        ],
        responses: {
          "200": {
            description: "Ok",
          },
          "400": {
            description: "Bad request",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/tours/{id}": {
      get: {
        tags: ["Tours"],
        summary: "Get tour by id",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID tour",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Ok",
          },
          "400": {
            description: "Bad request",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
      patch: {
        tags: ["Tours"],
        summary: "Update tour by id",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID tour",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  province: {
                    type: "string",
                  },
                  province_id: {
                    type: "string",
                  },
                  regency: {
                    type: "string",
                  },
                  regency_id: {
                    type: "string",
                  },
                  latitude: {
                    type: "string",
                  },
                  longtitude: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Ok",
          },
          "400": {
            description: "Bad request",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
      delete: {
        tags: ["Tours"],
        summary: "Delete tour by id",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID tour",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Ok",
          },
          "400": {
            description: "Bad request",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/users/profile": {
      get: {
        tags: ["Users"],
        summary: "Get user profile",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Ok",
          },
          "400": {
            description: "Bad request",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
  },
};
