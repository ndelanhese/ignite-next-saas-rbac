'use client'

import { Button } from '@components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { getPendingInvites } from '@http/get-pending-invites'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Check, UserPlus2, X } from 'lucide-react'
import { useState } from 'react'

import { acceptInviteAction, rejectInviteAction } from './actions'

dayjs.extend(relativeTime)

export const PendingInvites = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data: pendingInvites } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: getPendingInvites,
    enabled: isOpen,
  })

  const handleAcceptInvite = async (inviteId: string) => {
    await acceptInviteAction(inviteId)

    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  const handleRejectInvite = async (inviteId: string) => {
    await rejectInviteAction(inviteId)

    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          icon={<UserPlus2 className="size-4" />}
        >
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-2">
        <span className="block text-sm font-medium">
          Pending invites ({pendingInvites?.invites.length ?? 0})
        </span>

        {pendingInvites?.invites.length === 0 && (
          <p className="text-sm text-muted-foreground">No invites found.</p>
        )}

        {pendingInvites?.invites.map((invite) => (
          <div className="space-y-2">
            <p className="leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">
                {invite?.author?.name ?? 'Someone'}
              </span>{' '}
              invited you to join{' '}
              <span className="font-medium text-foreground">
                {invite.organization.name}
              </span>{' '}
              <span>{dayjs(invite.createdAt).fromNow()}</span>
            </p>

            <div className="flex gap-1">
              <Button
                size="xs"
                variant="outline"
                icon={<Check className="mr-1.5 size-3" />}
                onClick={() => handleAcceptInvite(invite.id)}
              >
                Accept
              </Button>
              <Button
                size="xs"
                variant="outline"
                icon={<X className="mr-1.5 size-3" />}
                className="text-muted-foreground"
                onClick={() => handleRejectInvite(invite.id)}
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
