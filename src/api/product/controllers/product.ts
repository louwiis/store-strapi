/**
 * product controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params
        console.log('slug', ctx.params)
        const entity = await strapi.db.query('api::product.product').findOne({
            where: {
                slug: id
            },
            populate: {
                'image': {
                    select: ['url', 'alternativeText']
                },
                'category': {
                    select: ['name', 'slug']
                }
            }
        })

        const sanitizedEntity = await this.sanitizeOutput(entity, ctx)

        return this.transformResponse(sanitizedEntity)
    },
}))