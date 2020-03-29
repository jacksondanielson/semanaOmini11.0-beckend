const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const icidents = await connection('icidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(icidents);
    },
}