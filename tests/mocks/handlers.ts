/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { db } from './db';

export const handlers = [
  ...db.product.toHandlers('rest'),
  ...db.category.toHandlers('rest')
]