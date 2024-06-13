import { ProfileButton } from '@components/profile-button'
import { DatabaseZap, Slash } from 'lucide-react'

import { OrganizationSwitcher } from './organization-switcher'

export const Header = () => (
  <header className="mx-auto flex max-w-[75rem] items-center justify-between">
    <div className="flex items-center gap-3">
      <DatabaseZap />

      <Slash className="size-3 -rotate-[24deg] stroke-border" />

      <OrganizationSwitcher />
    </div>

    <div className="inline-flex items-center gap-4">
      <ProfileButton />
    </div>
  </header>
)
