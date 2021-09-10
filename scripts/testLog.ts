import { Category, CategoryServiceFactory, CategoryLogger } from 'typescript-logging'

const testCategory = new Category('skypin-test')
export const logger: CategoryLogger = CategoryServiceFactory.getLogger(testCategory)
