'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { useFormState } from '@hooks/use-form-state'
import { AlertTriangle } from 'lucide-react'

import {
  updateOrganizationAction,
  type UpdateOrganizationSchema,
} from './actions'

type UpdateOrganizationFormProps = {
  initialData: UpdateOrganizationSchema
}

export const UpdateOrganizationForm = ({
  initialData,
}: UpdateOrganizationFormProps) => {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState({
    action: updateOrganizationAction,
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save organization failed!</AlertTitle>
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
      <div className="space-y-1">
        <Label htmlFor="name">Organization Name</Label>
        <Input name="name" id="name" defaultValue={initialData.name} />

        {errors?.name && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          name="domain"
          type="text"
          id="domain"
          inputMode="url"
          placeholder="example.com"
          defaultValue={initialData.domain ?? undefined}
        />

        {errors?.domain && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.domain[0]}
          </p>
        )}
      </div>

      <div className="items-top flex space-x-2">
        <Checkbox
          id="shouldAttachUsersByDomain"
          name="shouldAttachUsersByDomain"
          defaultChecked={initialData.shouldAttachUsersByDomain}
        />
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            Auto-join new members
          </label>
          <p className="text-sm text-muted-foreground">
            This will automatically invite all members with same e-mail domain
            to this organization
          </p>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
        isLoading={isPending}
      >
        Save organization
      </Button>
    </form>
  )
}
