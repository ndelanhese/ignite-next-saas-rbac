import { ProfileButton } from '@components/profile-button'
import { DatabaseZap } from 'lucide-react'

export const Header = () => (
  <header className="mx-auto flex max-w-[75rem] items-center justify-between">
    <div className="flex items-center gap-3">
      <DatabaseZap />
    </div>

    <div className="inline-flex items-center gap-4">
      <ProfileButton />
    </div>
  </header>
)
