import { ability } from '@auth/auth'
import { ProfileButton } from '@components/profile-button'
import { DatabaseZap, Slash } from 'lucide-react'
import Link from 'next/link'

import { OrganizationSwitcher } from './organization-switcher'

export const Header = async () => {
  const permissions = await ability()

  return (
    <header className="mx-auto flex max-w-[75rem] items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <DatabaseZap />
        </Link>

        <Slash className="size-3 -rotate-[24deg] stroke-border" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && <p>projects</p>}
      </div>

      <div className="inline-flex items-center gap-4">
        <ProfileButton />
      </div>
    </header>
  )
}
