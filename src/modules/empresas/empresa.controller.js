/**
 *empresa.controller class
 *
 * @version 1.0.0 - 17 jul. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 17 jul. 2026
 *
 **/

const z = require("zod");
const empresasService = require("./empresa.service");

const crearEmpresaSchema = z.object({
    rut: z.string().regex(/^\d{7,8}-[\dkK]$/, "RUT inválido (formato: 12345678-9)"),
    razonSocial: z.string().min(2),
    nombreFantasia: z.string().optional(),
    rubro: z.enum(["SALUD", "ECOMMERCE", "SERVICIOS", "EDUCACION", "OTRO"]),
    sitioWeb: z.string().url().optional(),
    nombreUsuario: z.string().min(2),
});

async function crear(req, res, next) {
    try {
        const { nombreUsuario, ...datosEmpresa } = crearEmpresaSchema.parse(req.body);
        const empresa = await empresasService.crearEmpresaConAdmin({
            datosEmpresa,
            auth: req.auth,
            nombreUsuario,
        });
        res.status(201).json(empresa);
    } catch (err) {
        next(err);
    }
}

async function miEmpresa(req, res, next) {
    try {
        const empresa = await empresasService.obtenerMiEmpresa(req.empresaId);
        res.json(empresa);
    } catch (err) {
        next(err);
    }
}

module.exports = { crear, miEmpresa };