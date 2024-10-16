import { describe, it } from 'vitest';
//Use faker for generating random data
import { db } from './mocks/db';

describe('group', () => {
    it('should', () => {
        const product = db.product.create({ name: 'Apple'});
        console.log(db.product.delete({ where: { id: {equals: product.id } }}));
    })
})