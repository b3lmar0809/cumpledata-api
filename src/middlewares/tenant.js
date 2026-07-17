/**
 *tenant class
 *
 * @version 1.0.0 - 16 jul. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 16 jul. 2026
 *
 **/

const prisma = require("../config/prisma")

async function requireTenant(req, res, next) {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {authProviderId: req.user.authProviderId}
        });

        if (!usuario) {
            return res.status(401).json({error: "usuario sin empresa registrada", codigo: "SIN_EMPRESA"});
        }
        req.usuario = { id: usuario.id, nombre: usuario.nombre, role: usuario.role };
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = requireTenant;