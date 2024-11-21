import { CTableDataCellProps } from '../table/CTableDataCell'
import { CTableHeaderCellProps } from '../table/CTableHeaderCell'
import { CTableRowProps } from '../table/CTableRow'

export type Column = {
  label?: string
  key: string
  _style?: any
  _props?: CTableHeaderCellProps
}

export type FooterItem = {
  label?: string
  _props?: CTableDataCellProps
}

export type Item = {
  [key: string]: number | string | any
  _props?: CTableRowProps
}
