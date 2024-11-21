import { ComponentPropsWithRef, ElementType, PropsWithChildren, ReactNode } from 'react'

export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>

export type ReplaceProps<Inner extends ElementType, P> = Omit<ComponentPropsWithRef<Inner>, P> & P

export interface AsProp<As extends ElementType = ElementType> {
  as?: As
}

export interface Props<As extends ElementType = ElementType> extends AsProp<As> {}

export interface PolymorphicRefForwardingComponent<TInitial extends ElementType, P = unknown> {
  <As extends ElementType = TInitial>(
    props: PropsWithChildren<ReplaceProps<As, Props<As> & P>>,
    context?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  ): ReactNode | null
  propTypes?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  defaultProps?: Partial<P>
  displayName?: string
}
