import { ability, getCurrentOrg } from '@auth/auth'
import { Button } from '@components/ui/button'
import { PlusIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { ProjectList } from './project-list'

export const metadata: Metadata = {
  title: 'Organization projects',
}

const Projects = async () => {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Organization Projects</h1>

        {permissions?.can('create', 'Project') && (
          <Button size="sm" asChild>
            <Link
              href={`org/${currentOrg}/create-project`}
              className="inline-flex items-center"
            >
              <PlusIcon className="mr-2 size-4" />
              Create project
            </Link>
          </Button>
        )}
      </div>

      {permissions?.can('get', 'Project') ? (
        <ProjectList />
      ) : (
        <p className="text-sm text-muted-foreground">
          You'r not allowed to see organization projects
        </p>
      )}
    </div>
  )
}

export default Projects
