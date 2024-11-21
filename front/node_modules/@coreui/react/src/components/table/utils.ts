import type { Column, Item } from './types'

export const pretifyName = (name: string) => {
  return name
    .replace(/[-_.]/g, ' ')
    .replace(/ +/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const getColumnLabel = (column: Column | string) =>
  typeof column === 'object' ? column.label ?? pretifyName(column.key) : pretifyName(column)

export const getColumnNames = (columns: (string | Column)[] | undefined, items?: Item[]) =>
  columns
    ? columns.map((column: Column | string) => {
        return typeof column === 'object' ? column.key : column
      })
    : items && getColumnNamesFromItems(items)

export const getColumnNamesFromItems = (items: Item[]) =>
  Object.keys(items[0] || {}).filter((el) => el.charAt(0) !== '_')
