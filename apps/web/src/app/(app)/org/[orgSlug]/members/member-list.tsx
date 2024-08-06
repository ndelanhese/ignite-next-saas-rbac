import { ability, getCurrentOrg } from '@auth/auth'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@components/ui/table'
import { getMembers } from '@http/get-members'
import { getMembership } from '@http/get-membership'
import { getOrganization } from '@http/get-organization'
import { organizationSchema } from '@saas/auth'
import { getNameInitials } from '@utils/get-name-initials'
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'

import { removeMemberAction } from './actions'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export const MemberList = async () => {
  const currentOrg = getCurrentOrg()

  const organizationSlug = currentOrg!

  const permissions = await ability()

  const [{ organization }, { members }, { membership }] = await Promise.all([
    getOrganization({ organizationSlug }),
    getMembers({ organizationSlug }),
    getMembership({ organizationSlug }),
  ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {members?.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="py-2.5" style={{ width: '3rem' }}>
                    <Avatar>
                      {member?.avatarUrl && (
                        <AvatarImage
                          src={member.avatarUrl}
                          width={32}
                          height={32}
                          alt={`${member?.name ?? 'member'}'s avatar`}
                          className="aspect-square size-full"
                        />
                      )}
                      <AvatarFallback>
                        {getNameInitials(member?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell className="py-2.5">
                    <div className="flex flex-col">
                      <p className="inline-flex items-center gap-2 font-medium">
                        {member?.name}

                        {member.userId === membership.userId && (
                          <span>(me)</span>
                        )}

                        {organization.ownerId === member.userId && (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Crown className="size-3" /> Owner
                          </span>
                        )}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {member?.email}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      {permissions?.can(
                        'transfer_ownership',
                        authOrganization,
                      ) && (
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<ArrowLeftRight className="mr-2 size-4" />}
                        >
                          Transfer ownership
                        </Button>
                      )}

                      <UpdateMemberRoleSelect
                        memberId={member.id}
                        disabled={
                          member.userId === membership.userId ||
                          member.userId === organization.ownerId ||
                          permissions?.cannot('update', 'User')
                        }
                        value={member.role}
                      />

                      {permissions?.can('delete', 'User') && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              disabled={
                                member.userId === membership.userId ||
                                member.userId === organization.ownerId
                              }
                              icon={<UserMinus className="mr-2 size-4" />}
                            >
                              Remove
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <form
                              action={removeMemberAction.bind(null, member.id)}
                            >
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this member from your
                                  organization.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  type="submit"
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </form>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
