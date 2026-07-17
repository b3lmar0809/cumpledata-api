/**
 *app class
 *
 * @version 1.0.0 - 17 jul. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 17 jul. 2026
 *
 **/

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env= require("./config/env");
const {errorHandler}  = require("./middlewares/errorHandler");
const empresasRoutes = require("./modules/empresas/empresa.router");

const app = express();

app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ ok: true, servicio: "cumpledata-api", entorno: env.NODE_ENV });
});

app.use("/api/empresas", empresasRoutes);

app.use(errorHandler);

module.exports = app;