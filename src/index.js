/* IMPORTS */
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import corn from "node-cron";
import { swaggerUi, swaggerDocs } from "./common/config/swaggerOptions.js";
import db from "./common/config/database.js";
import { createHandler } from "graphql-http";

/* IMPORT ROUTES */
import errorHandling from "./common/middleware/errorMiddleware.js";
import userRoutes from "./restAPI/routes/authRoutes.js";
import productRoutes from "./restAPI/routes/productRoutes.js";
import categoryRoutes from "./restAPI/routes/categoryRoutes.js";

dotenv.config();
const app = express();

/* MIDDLEWARES */
app.use(helmet());
app.disable("x-powered-by");
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", process.env.ALLOWED_METHODS);
  res.setHeader("Access-Control-Allow-Headers", process.env.ALLOWED_HEADERS);
  res.setHeader(
    "Access-Control-Allow-Credentials",
    process.env.ALLOWED_CREDENTIALS
  );
  next();
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

/* CORN JOB - SERVER TIMESTAMP TRACKER */
corn.schedule("*/15 * * * *", () => {
  console.log(
    "Server timestamp: ",
    new Date(),
    " Minutes:  ",
    new Date().getMinutes()
  );
});

// Swagger setup
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* ROUTES HANDLERS */
userRoutes(app);
productRoutes(app);
categoryRoutes(app);

/* GRAPHQL HANDLERS */
// app.use(
//   "/graphql",
//   createHandler({
//     schema: schema,
//     rootValue: resolvers,
//     graphiql: true,
//   })
// );

/* ERROR HANDLERS */
app.use(errorHandling);

// Start server after database connection established
db.connectDB()
  .then(async () => {
    // Synchronize models
    try {
      await db.sequelize.sync({ force: false });
      console.log("Models synchronized successfully.");
    } catch (err) {
      console.error("Error synchronizing the models:", err);
    }

    const server = app.listen(process.env.PORT || 3001, () => {
      console.log("Listening on port " + server.address().port);
    });
  })
  .catch((err) => {
    console.log("DB connection failed, server initiation failed.", err);
  });

export default app;
