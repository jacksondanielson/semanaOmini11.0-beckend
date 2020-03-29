const connection = require('../database/connection');
module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('icidents').count();

        const icidents = await connection('icidents')
        .join('ongs', 'ong_id', '=', 'icidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'icidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('x-total-Count', count['count(*)']);

        return response.json(icidents);
    },

    async create(request, response) {
        const { title, drescription, value } = request.body;
        const ong_id = request.headers.authorization;

       const [id] = await connection('icidents').insert({
            title,
            drescription,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request ,response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const icidents = await connection('icidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (icidents.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permited, '});
        }
        await connection('icidents').where('id', id).delete();
        return response.status(204).send();
    }
};