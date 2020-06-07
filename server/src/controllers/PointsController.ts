import { Request, Response } from 'express';
import knex from '../database/connections';

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')

        return response.json(points);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();
        if (!point) {
            return response.status(400).json({ message: `Point ${id} not found` });
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point, items });
    }


    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const trx = await knex.transaction();

        const point = {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            image: 'https://mhmcdn.ynvolve.net/?w=750&h=450&quality=90&clipping=landscape&url=//manualdohomemmoderno.com.br/files/2018/03/mercado-700x400.jpg&format=webp&hash=4dbf12ff263d563e489ba16388ed82d26dc5a4fd1e327f5c1b538accf704a345',
        }
    
        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0]
    
        const pointsItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        });
    
        await trx('point_items').insert(pointsItems);

        await trx.commit();

        console.log(point_id);
    
        return response.json({ 
            id: point_id,
            ...point,
         });
    }
}

export default PointsController;