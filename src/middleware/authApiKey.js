export function authApiKey(req, res, next) {
    // Tomamos la key de la cabecera (header) "x-api-key", por ejemplo
    const clientApiKey = req.headers['x-api-key'];
    if (!clientApiKey || clientApiKey !== process.env.API_KEY) {
        return res.status(401).json({
            error: 'No autorizado. Debes proveer una API Key válida.',
        });
    }

    // Si coincide, continuamos
    next();
}