'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { Skeleton } from '@components/ui/skeleton'
import { getProjects } from '@http/get-projects'
import { useQuery } from '@tanstack/react-query'
import { getNameInitials } from '@utils/get-name-initals'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export const ProjectSwitcher = () => {
  const { orgSlug, projectSlug } = useParams<{
    orgSlug: string
    projectSlug?: string
  }>()

  const { data: projectsData, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects', orgSlug],
    queryFn: () => getProjects(orgSlug!),
    enabled: !!orgSlug,
  })

  const currentProject =
    projectsData &&
    projectSlug &&
    projectsData?.projects.find((project) => project.slug === projectSlug)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[10.5rem] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {!isLoadingProjects ? (
          <>
            {' '}
            {currentProject ? (
              <>
                <Avatar className="size-4">
                  {currentProject?.avatarUrl && (
                    <AvatarImage src={currentProject.avatarUrl} />
                  )}
                  <AvatarFallback>
                    {getNameInitials(currentProject.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate text-left">
                  {currentProject.name}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">Select project</span>
            )}
            <ChevronsUpDown className="ml-auto size-4 stroke-muted-foreground" />
          </>
        ) : (
          <>
            <Skeleton className="size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3 shrink-0 rounded-full" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-[12.5rem]"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          {projectsData &&
            projectsData?.projects?.map((project) => (
              <DropdownMenuItem key={project.id} asChild>
                <Link href={`/org/${orgSlug}/project/${project.slug}`}>
                  <Avatar className="mr-2 size-4">
                    {project?.avatarUrl && (
                      <AvatarImage src={project.avatarUrl} />
                    )}
                    <AvatarFallback>
                      {getNameInitials(project.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="line-clamp-1">{project.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`org/${orgSlug}/create-project`} prefetch={false}>
            <PlusCircle className="mr-2 size-4" /> Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
