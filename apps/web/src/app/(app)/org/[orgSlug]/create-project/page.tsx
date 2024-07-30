import { ability } from '@auth/auth'
import { redirect } from 'next/navigation'

import { CreateProjectForm } from './create-project-form'

const CreateProject = async () => {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create project</h1>

      <CreateProjectForm />
    </div>
  )
}

export default CreateProject
