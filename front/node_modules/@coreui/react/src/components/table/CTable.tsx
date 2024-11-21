import React, { forwardRef, TableHTMLAttributes, useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CTableHead, CTableHeadProps } from './CTableHead'
import { CTableHeaderCell } from './CTableHeaderCell'
import { CTableBody } from './CTableBody'
import { CTableDataCell } from './CTableDataCell'
import { CTableRow } from './CTableRow'
import { CTableFoot, CTableFootProps } from './CTableFoot'
import { CTableCaption } from './CTableCaption'
import { CTableResponsiveWrapper } from './CTableResponsiveWrapper'

import { colorPropType } from '../../props'
import type { Colors } from '../../types'
import { getColumnLabel, getColumnNames } from './utils'
import type { Column, FooterItem, Item } from './types'

export interface CTableProps extends Omit<TableHTMLAttributes<HTMLTableElement>, 'align'> {
  /**
   * Set the vertical aligment.
   */
  align?: 'bottom' | 'middle' | 'top' | string
  /**
   * Sets the border color of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  borderColor?: Colors
  /**
   * Add borders on all sides of the table and cells.
   */
  bordered?: boolean
  /**
   * Remove borders on all sides of the table and cells.
   */
  borderless?: boolean
  /**
   * Put the caption on the top if you set `caption="top"` of the table or set the text of the table caption.
   */
  caption?: 'top' | string
  /**
   * Set the text of the table caption and the caption on the top of the table.
   *
   * @since 4.3.0
   */
  captionTop?: string
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Prop for table columns configuration. If prop is not defined, table will display columns based on the first item keys, omitting keys that begins with underscore (e.g. '_props')
   *
   * In columns prop each array item represents one column. Item might be specified in two ways:
   * String: each item define column name equal to item value.
   * Object: item is object with following keys available as column configuration:
   * - key (required)(String) - define column name equal to item key.
   * - label (String) - define visible label of column. If not defined, label will be generated automatically based on column name, by converting kebab-case and snake_case to individual words and capitalization of each word.
   * - _props (Object) - adds classes to all cels in column, ex. `_props: { scope: 'col', className: 'custom-class' }`,
   * - _style (Object) - adds styles to the column header (useful for defining widths)
   *
   * @since 4.3.0
   */
  columns?: (string | Column)[]
  /**
   * Sets the color context of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  color?: Colors
  /**
   * Array of objects or strings, where each element represents one cell in the table footer.
   *
   * Example items:
   * `['FooterCell', 'FooterCell', 'FooterCell']`
   * or
   * `[{ label: 'FooterCell', _props: { color: 'success' }, ...]`
   *
   * @since 4.3.0
   */
  footer?: (FooterItem | string)[]
  /**
   * Enable a hover state on table rows within a `<CTableBody>`.
   */
  hover?: boolean
  /**
   * Array of objects, where each object represents one item - row in table. Additionally, you can add style classes to each row by passing them by '_props' key and to single cell by '_cellProps'.
   *
   * Example item:
   * `{ name: 'John' , age: 12, _props: { color: 'success' }, _cellProps: { age: { className: 'fw-bold'}}}`
   *
   * @since 4.3.0
   */
  items?: Item[]
  /**
   * Make any table responsive across all viewports or pick a maximum breakpoint with which to have a responsive table up to.
   */
  responsive?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * Make table more compact by cutting all cell `padding` in half.
   */
  small?: boolean
  /**
   * Add zebra-striping to any table row within the `<CTableBody>`.
   */
  striped?: boolean
  /**
   * Add zebra-striping to any table column.
   *
   * @since 4.3.0
   */
  stripedColumns?: boolean
  /**
   * Properties that will be passed to the table footer component.
   *
   * @link https://coreui.io/react/docs/components/table/#ctablefoot
   * @since 4.3.0
   */
  tableFootProps?: CTableFootProps
  /**
   * Properties that will be passed to the table head component.
   *
   * @link https://coreui.io/react/docs/components/table/#ctablehead
   * @since 4.3.0
   */
  tableHeadProps?: CTableHeadProps
}

export const CTable = forwardRef<HTMLTableElement, CTableProps>(
  (
    {
      children,
      align,
      borderColor,
      bordered,
      borderless,
      caption,
      captionTop,
      className,
      color,
      columns,
      footer,
      hover,
      items,
      responsive,
      small,
      striped,
      stripedColumns,
      tableFootProps,
      tableHeadProps,
      ...rest
    },
    ref,
  ) => {
    const columnNames = useMemo(() => getColumnNames(columns, items), [columns, items])

    return (
      <CTableResponsiveWrapper responsive={responsive}>
        <table
          className={classNames(
            'table',
            {
              [`align-${align}`]: align,
              [`border-${borderColor}`]: borderColor,
              [`caption-top`]: captionTop || caption === 'top',
              'table-bordered': bordered,
              'table-borderless': borderless,
              [`table-${color}`]: color,
              'table-hover': hover,
              'table-sm': small,
              'table-striped': striped,
              'table-striped-columns': stripedColumns,
            },
            className,
          )}
          {...rest}
          ref={ref}
        >
          {((caption && caption !== 'top') || captionTop) && (
            <CTableCaption>{caption || captionTop}</CTableCaption>
          )}
          {columns && (
            <CTableHead {...tableHeadProps}>
              <CTableRow>
                {columns.map((column: Column, index: number) => (
                  <CTableHeaderCell
                    {...(column._props && { ...column._props })}
                    {...(column._style && { style: { ...column._style } })}
                    key={index}
                  >
                    {getColumnLabel(column)}
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
          )}
          {items && (
            <CTableBody>
              {items.map((item: Item, index: number) => (
                <CTableRow {...(item._props && { ...item._props })} key={index}>
                  {columnNames &&
                    columnNames.map((colName: string, index: number) => {
                      // eslint-disable-next-line unicorn/no-negated-condition
                      return item[colName] !== undefined ? (
                        <CTableDataCell
                          {...(item._cellProps && {
                            ...(item._cellProps['all'] && { ...item._cellProps['all'] }),
                            ...(item._cellProps[colName] && { ...item._cellProps[colName] }),
                          })}
                          key={index}
                        >
                          {item[colName]}
                        </CTableDataCell>
                      ) : null
                    })}
                </CTableRow>
              ))}
            </CTableBody>
          )}
          {children}
          {footer && (
            <CTableFoot {...tableFootProps}>
              <CTableRow>
                {footer.map((item: FooterItem | string, index: number) => (
                  <CTableDataCell
                    {...(typeof item === 'object' && item._props && { ...item._props })}
                    key={index}
                  >
                    {typeof item === 'object' ? item.label : item}
                  </CTableDataCell>
                ))}
              </CTableRow>
            </CTableFoot>
          )}
        </table>
      </CTableResponsiveWrapper>
    )
  },
)

CTable.propTypes = {
  align: PropTypes.oneOf(['bottom', 'middle', 'top']),
  borderColor: PropTypes.string,
  bordered: PropTypes.bool,
  borderless: PropTypes.bool,
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(['top'])]),
  captionTop: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
  columns: PropTypes.array,
  footer: PropTypes.array,
  hover: PropTypes.bool,
  items: PropTypes.array,
  responsive: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(['sm', 'md', 'lg', 'xl', 'xxl']),
  ]),
  small: PropTypes.bool,
  striped: PropTypes.bool,
  stripedColumns: PropTypes.bool,
  tableFootProps: PropTypes.shape({ ...CTableFoot.propTypes }),
  tableHeadProps: PropTypes.shape({ ...CTableHead.propTypes }),
}

CTable.displayName = 'CTable'
