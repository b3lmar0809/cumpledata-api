/**
 *AppError class
 *
 * @version 1.0.0 - 16 jul. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 16 jul. 2026
 *
 **/

class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = AppError;