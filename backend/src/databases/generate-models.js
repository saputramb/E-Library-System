const SequelizeAuto = require("sequelize-auto");
require("dotenv").config();

const GENERATE_MODELS = new SequelizeAuto(
    process.env.DATABASE_DB,
    process.env.USERNAME_DB,
    process.env.PASSWORD_DB,
    {
        host: process.env.HOST_DB,
        dialect: process.env.DIALECT_DB,
        directory: "./src/databases/models",
        port: process.env.PORT_DB,
        caseFile: "c",
        // caseModel: "c",
        // caseProp: "c",
        singularize: true,
        spaces: true,
        indentation: 2,
        additional: {
            timestamps: false,
            // ...options added to each model
        },
        lang: 'ts',
        useDefine: true,
        views: true,
    },
);

GENERATE_MODELS.run();