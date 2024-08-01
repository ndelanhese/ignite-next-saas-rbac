'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { useFormState } from '@hooks/use-form-state'
import { roleSchema } from '@saas/auth'
import { AlertTriangle, UserPlus } from 'lucide-react'

import { createInviteAction } from './actions'

export const CreateInviteForm = () => {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState({
    action: createInviteAction,
  })

  const rolesArray = roleSchema.options.map((option) => option.value)

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save invite failed!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-start gap-2">
        <div className="flex-1 space-y-1">
          <Input
            name="email"
            id="email"
            type="email"
            inputMode="email"
            placeholder="john@example.com"
          />

          {errors?.email && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <Select defaultValue="MEMBER" name="role">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {rolesArray.map((role) => (
              <SelectItem key={role} value={role} className="capitalize">
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type="submit"
          disabled={isPending}
          icon={<UserPlus className="mr-2 size-4" />}
          isLoading={isPending}
        >
          Invite user
        </Button>
      </div>
    </form>
  )
}
