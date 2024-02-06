// auto generates swagger documentation
const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "CSE341 Node.js",
        description: "Node.js assignment for CSE341",
    },
    host: "localhost:7100",
    schemes: ["http"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
