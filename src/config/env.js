/**
 *env class
 *
 * @version 1.0.0 - 16 jul. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 16 jul. 2026
 *
 **/

//valida las variables de entorno

require("dotenv").config();
const z = require("zod");

const schema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string().min(1),
    FRONTEND_URL: z.string().url().default("http://localhost:5173"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
    console.error("variables de entorno invalidad o faltan");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
}

module.exports = { env: parsed.data };