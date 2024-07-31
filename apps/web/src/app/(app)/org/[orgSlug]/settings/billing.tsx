import { getCurrentOrg } from '@auth/auth'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import { getBilling } from '@http/get-billing'

export const Billing = async () => {
  const currentOrg = getCurrentOrg()

  const { billing } = await getBilling({ organizationSlug: currentOrg! })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Amount of projects</TableCell>
          <TableCell className="text-right">
            {billing.projects.amount}
          </TableCell>
          <TableCell className="text-right">
            {billing.projects.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
            (
            {billing.projects.unit.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
            each)
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Amount of seats</TableCell>
          <TableCell className="text-right">{billing.seats.amount}</TableCell>
          <TableCell className="text-right">
            {billing.seats.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
            (
            {billing.seats.unit.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
            each)
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell />
          <TableCell className="text-right">total</TableCell>
          <TableCell className="text-right">
            {billing.total.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
