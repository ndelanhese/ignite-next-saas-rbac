import { auth } from '@auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { getNameInitials } from '@utils/get-name-initals'
import { ChevronDown, LogOut } from 'lucide-react'
import Link from 'next/link'

export const ProfileButton = async () => {
  const { user } = await auth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
        <Avatar className="size-8">
          {user?.avatarUrl && <AvatarImage src={user.avatarUrl} />}
          {user?.name && (
            <AvatarFallback>{getNameInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/api/auth/sign-out" prefetch={false}>
            <LogOut className="mr-2 size-4" /> Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
