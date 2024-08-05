import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { getNameInitials } from '@utils/get-name-initals'
import { ArrowRight } from 'lucide-react'

export const ProjectList = () => (
  <div className="grid grid-cols-3 gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Project 01</CardTitle>
        <CardDescription className="line-clamp-2 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          culpa blanditiis autem. Quam voluptates, quas quis repellendus
          veritatis, nobis et voluptatibus libero vero incidunt optio doloribus,
          explicabo facilis provident saepe?
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center gap-1.5">
        <Avatar className="size-4">
          <AvatarImage src="https://github.com/ndelanhese.png" />
          <AvatarFallback className="text-[.5rem]">
            {getNameInitials('Nathan Delanhese')}
          </AvatarFallback>
        </Avatar>

        <span className="text-xs text-muted-foreground">
          Created by{' '}
          <span className="font-medium text-foreground">Nathan Delanhese</span>{' '}
          a day ago
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
  </div>
)
