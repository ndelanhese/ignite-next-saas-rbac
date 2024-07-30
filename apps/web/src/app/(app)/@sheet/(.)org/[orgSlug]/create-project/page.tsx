import { InterceptedSheetContent } from '@components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@components/ui/sheet'
import type { Metadata } from 'next'

import { CreateProjectForm } from '@/app/(app)/org/[orgSlug]/create-project/create-project-form'

export const metadata: Metadata = {
  title: 'Create a new project',
}

const CreateProject = () => (
  <Sheet defaultOpen>
    <InterceptedSheetContent>
      <SheetHeader>
        <SheetTitle>Create project</SheetTitle>
      </SheetHeader>

      <div className="py-4">
        <CreateProjectForm />
      </div>
    </InterceptedSheetContent>
  </Sheet>
)

export default CreateProject
