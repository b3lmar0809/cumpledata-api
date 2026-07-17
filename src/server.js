/**
 *server class
 *
 * @version 1.0.0 - 17 jul. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 17 jul. 2026
 *
 **/

const app = require("./app");
const {env}  = require("./config/env");

app.listen(env.PORT, () => {
    console.log(` CumpleData API escuchando en http://localhost:${env.PORT}`);
});