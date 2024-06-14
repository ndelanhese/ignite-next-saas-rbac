import { InterceptedSheetContent } from '@components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@components/ui/sheet'
import type { Metadata } from 'next'

import { CreateOrganizationForm } from '../../create-organization/create-organization-form'

export const metadata: Metadata = {
  title: 'Create a new organization',
}

const CreateOrganization = () => (
  <Sheet defaultOpen>
    <InterceptedSheetContent>
      <SheetHeader>
        <SheetTitle>Create organization</SheetTitle>
      </SheetHeader>

      <div className="py-4">
        <CreateOrganizationForm />
      </div>
    </InterceptedSheetContent>
  </Sheet>
)

export default CreateOrganization
