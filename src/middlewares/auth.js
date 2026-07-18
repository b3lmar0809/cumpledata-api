/**
 *auth class
 *
 * @version 1.0.0 - 16 jul. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 16 jul. 2026
 *
 **/

const { createRemoteJWKSet, jwtVerify } = require("jose");
const { env } = require("../config/env");

//el set de llaves publica de Supabase, jose lo descarga,
// lo cachea y lo refresca solo cuando rotan las llaves.
const JWKS = createRemoteJWKSet(
    new URL(`${env.SUPABASE_URL}/auth/v1/.well-known/jwks.json`)
);

async function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No autenticado" });
    }

    const token = header.slice(7);

    try {
        const { payload } = await jwtVerify(token, JWKS);
        req.auth = { authProviderId: payload.sub, email: payload.email };
        next();
    } catch (err) {
        console.error("JWT verify falló:", err.message); // temporal, lo sacamos cuando todo ande
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
}

module.exports = { requireAuth };