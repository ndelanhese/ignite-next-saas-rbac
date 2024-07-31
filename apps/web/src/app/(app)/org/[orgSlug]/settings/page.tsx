import { ability, getCurrentOrg } from '@auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import { getOrganization } from '@http/get-organization'
import type { Metadata } from 'next'

import { Billing } from './billing'
import { ShutdownOrganization } from './shutdown-organization'
import { UpdateOrganizationForm } from './update-organization-form'

export const metadata: Metadata = {
  title: 'Org settings',
}

const Settings = async () => {
  const currentOrganization = getCurrentOrg()
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBillingOrganization = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  const { organization: organizationData } = await getOrganization({
    organizationSlug: currentOrganization!,
  })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Organization settings</CardTitle>
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UpdateOrganizationForm initialData={organizationData} />
            </CardContent>
          </Card>
        )}

        {canGetBillingOrganization && (
          <>
            <Separator />
            <Card>
              <CardHeader>
                <CardTitle>Billing</CardTitle>
                <CardDescription>
                  Information about your organization costs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Billing />
              </CardContent>
            </Card>
          </>
        )}

        {canShutdownOrganization && (
          <>
            <Separator />
            <Card>
              <CardHeader>
                <CardTitle>Danger zone</CardTitle>
                <CardDescription>
                  This all delete all organization data including all projects.
                  You cannot undo this action.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ShutdownOrganization />
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

export default Settings
