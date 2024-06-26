import { ability } from '@auth/auth'
import { ProfileButton } from '@components/profile-button'
import { ThemeSwitcher } from '@components/theme/theme-switcher'
import { Separator } from '@components/ui/separator'
import { DatabaseZap, Slash } from 'lucide-react'
import Link from 'next/link'

import { OrganizationSwitcher } from './organization-switcher'

export const Header = async () => {
  const permissions = await ability()

  return (
    <header className="mx-auto flex max-w-[75rem] items-center justify-between border-b pb-2">
      <div className="flex items-center gap-3">
        <Link href="/">
          <DatabaseZap />
        </Link>

        <Slash className="size-3 -rotate-[24deg] stroke-border" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && <p>projects</p>}
      </div>

      <div className="inline-flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </header>
  )
}
