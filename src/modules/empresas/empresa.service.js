/**
 *empresa.service class
 *
 * @version 1.0.0 - 17 jul. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 17 jul. 2026
 *
 **/

const {prisma} = require("../../config/prisma");
const AppError = require("../../utils/AppError");

async function crearEmpresaConAdmin({ datosEmpresa, auth, nombreUsuario }) {

    const existente = await prisma.usuario.findUnique({
        where: { authProviderId: auth.authProviderId },
    });
    if (existente) throw new AppError(409, "Este usuario ya pertenece a una empresa");

    const rutOcupado = await prisma.empresa.findUnique({
        where: { rut: datosEmpresa.rut },
    });
    if (rutOcupado) throw new AppError(409, "Ya existe una empresa registrada con ese RUT");

    // transaccion
    return prisma.$transaction(async (tx) => {
        const empresa = await tx.empresa.create({ data: datosEmpresa });
        await tx.usuario.create({
            data: { empresaId: empresa.id, authProviderId: auth.authProviderId, email: auth.email,
                nombre: nombreUsuario, rol: "ADMIN",
            },
        });
        return empresa;
    });
}

async function obtenerMiEmpresa(empresaId) {
    return prisma.empresa.findUnique({ where: { id: empresaId } });
}

module.exports = { crearEmpresaConAdmin, obtenerMiEmpresa };