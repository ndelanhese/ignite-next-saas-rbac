import { ability, getCurrentOrg } from '@auth/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@components/ui/table'
import { getInvites } from '@http/get-invites'

import { RevokeInviteButton } from './revoke-invite-button'

export const Invites = async () => {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  const { invites } = await getInvites({ organizationSlug: currentOrg! })

  return (
    <div className="space-y-4">
      {permissions?.can('create', 'Invite') && (
        <Card>
          <CardHeader>
            <CardTitle>Invite member</CardTitle>
          </CardHeader>
          <CardContent>{/* <InviteForm /> */}</CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Invites</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {invites?.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="py-2.5">
                    <div className="flex flex-col text-muted-foreground">
                      {invite.email}
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5 font-medium">
                    {invite.role}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex justify-end">
                      {permissions?.can('delete', 'Invite') && (
                        <RevokeInviteButton inviteId={invite.id} />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {invites.length === 0 && (
                <TableRow>
                  <TableCell className="py-2 text-center text-muted-foreground">
                    No invites found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
