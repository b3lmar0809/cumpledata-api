/**
 *errorHandler class
 *
 * @version 1.0.0 - 16 jul. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 16 jul. 2026
 *
 **/
//cualquier error que ocurra en el controller o service via next(err)
// termina aqui
const { ZodError } = require("zod");
const AppError = require("../utils/AppError");

function errorHandler(err, req, res, next) {

    if (err instanceof ZodError) {
        return res.status(400).json({
            error: "Datos inválidos",
            detalles: err.flatten().fieldErrors,
        });
    }
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
}
module.exports = { errorHandler };