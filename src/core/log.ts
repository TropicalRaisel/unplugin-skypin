import { Category, CategoryServiceFactory, CategoryConfiguration, LogLevel } from 'typescript-logging'

CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info))

const category = new Category('skypin')
export const log = CategoryServiceFactory.getLogger(category)
