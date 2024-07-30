import { ability, getCurrentOrg } from '@auth/auth'
import { Button } from '@components/ui/button'

import { NavLink } from './nav-link'

export const Tabs = async () => {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  const canGetProjects = permissions?.can('get', 'Project')
  const canGetMembers = permissions?.can('get', 'User')
  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBillingOrganization = permissions?.can('get', 'Billing')

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[75rem] items-center gap-2">
        {canGetProjects && (
          <Button
            size="sm"
            variant="ghost"
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
            asChild
          >
            <NavLink href={`/org/${currentOrg}`}>Projects</NavLink>
          </Button>
        )}
        {canGetMembers && (
          <Button
            size="sm"
            variant="ghost"
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
            asChild
          >
            <NavLink href={`/org/${currentOrg}/members`}>Members</NavLink>
          </Button>
        )}
        {(canUpdateOrganization || canGetBillingOrganization) && (
          <Button
            size="sm"
            variant="ghost"
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
            asChild
          >
            <NavLink href={`/org/${currentOrg}/settings`}>
              Settings & Billing
            </NavLink>
          </Button>
        )}
      </nav>
    </div>
  )
}
