import { getCurrentOrg } from '@auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { getProjects } from '@http/get-projects'
import { getNameInitials } from '@utils/get-name-initials'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ArrowRight } from 'lucide-react'

dayjs.extend(relativeTime)

export const ProjectList = async () => {
  const currentOrg = getCurrentOrg()

  const { projects } = await getProjects(currentOrg!)

  return (
    <div className="grid grid-cols-3 gap-4">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              {project.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 leading-relaxed">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center gap-1.5">
            <Avatar className="size-4">
              {project.owner.avatarUrl && (
                <AvatarImage src={project.owner.avatarUrl} />
              )}
              <AvatarFallback className="text-[.5rem]">
                {getNameInitials(project.owner.name)}
              </AvatarFallback>
            </Avatar>

            <span className="text-xs text-muted-foreground">
              By{' '}
              <span className="font-medium text-foreground">
                {project.owner.name}
              </span>{' '}
              {dayjs(project.createdAt).fromNow()}
            </span>

            <Button
              className="ml-auto"
              size="xs"
              variant="outline"
              icon={<ArrowRight className="ml-2 size-3" />}
              iconPosition="right"
            >
              View
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
