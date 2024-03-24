/**
 * category controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params
        console.log('slug', ctx.params)
        const entity = await strapi.db.query('api::category.category').findOne({
            where: {
                slug: id
            },
            populate: {
                'products': {
                    select: ['name', 'slug', 'price'],
                    populate: {
                        'image': {
                            select: ['url', 'alternativeText']
                        }
                    }
                }
            }
        })

        const sanitizedEntity = await this.sanitizeOutput(entity, ctx)

        return this.transformResponse(sanitizedEntity)
    },
}))