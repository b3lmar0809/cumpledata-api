/**
 *auth class
 *
 * @version 1.0.0 - 16 jul. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 16 jul. 2026
 *
 **/

const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const env = require("../config/env");

const client = jwksClient({
    jwksUri: `${env.SUPABASE_URL}/auth/v1/.well-known/jwks.json`,
    cache: true,
})

function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) return callback(err);
        callback(null, key.getPublicKey());
    });
}

function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No autenticado" });
    }

    const token = header.slice(7);

    jwt.verify(token, getKey, { algorithms: ["ES256", "RS256"] }, (err, payload) => {
        if (err) return res.status(401).json({ error: "Token inválido o expirado" });
        req.auth = { authProviderId: payload.sub, email: payload.email };
        next();
    });
}

module.exports = requireAuth;