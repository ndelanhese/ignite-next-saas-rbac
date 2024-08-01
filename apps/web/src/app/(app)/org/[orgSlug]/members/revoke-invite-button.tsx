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
import { Button } from '@components/ui/button'
import { CircleX } from 'lucide-react'

import { revokeInviteActions } from './actions'

type RevokeInviteButtonProps = {
  inviteId: string
}

export const RevokeInviteButton = ({ inviteId }: RevokeInviteButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="destructive"
          icon={<CircleX className="mr-2 size-4" />}
        >
          Revoke invite
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          action={revokeInviteActions.bind(null, inviteId)}
          className="flex flex-col gap-4"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              invite.
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
  )
}
