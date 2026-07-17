/**
 *empresa.router class
 *
 * @version 1.0.0 - 17 jul. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 17 jul. 2026
 *
 **/

const Router = require("express")
const requireAuth = require("../../middlewares/auth");
const requireTenant = require("../../middlewares/tenant");
const controller = require("./empresa.controller")
const router = Router();

router.post("/", requireAuth, controller.crear);
router.get("/mia", requireAuth, requireTenant, controller.miEmpresa);

module.exports = router;