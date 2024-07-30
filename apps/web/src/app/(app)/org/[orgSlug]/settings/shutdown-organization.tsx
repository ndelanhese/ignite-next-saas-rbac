'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/ui/alert-dialog'
import { Button } from '@components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { shutdownOrganization } from '@http/shutdown-organization'
import { XCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ShutdownOrganization = () => {
  const { push } = useRouter()
  const { orgSlug } = useParams<{
    orgSlug: string
  }>()

  const shutdownOrganizationSchema = z.object({
    confirmation_text: z
      .string()
      .refine((value) => `delete ${orgSlug}` === value),
  })

  type ShutdownOrganizationSchema = z.infer<typeof shutdownOrganizationSchema>

  const shutdownOrganizationAction = async () => {
    await shutdownOrganization({ orgSlug })
    push('/')
  }

  const form = useForm<ShutdownOrganizationSchema>({
    resolver: zodResolver(shutdownOrganizationSchema),
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-56">
          <XCircle className="mr-2 size-4" />
          Shutdown organization
        </Button>
      </AlertDialogTrigger>
      <Form {...form}>
        <AlertDialogContent asChild>
          <form action={shutdownOrganizationAction}>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                organization including all projects.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div>
              <FormField
                control={form.control}
                name="confirmation_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-destructive">
                      Confirmation text
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={`delete ${orgSlug}`} {...field} />
                    </FormControl>
                    <FormDescription>
                      Type the confirmation text "delete {orgSlug}".
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                disabled={
                  form.formState.isSubmitting ||
                  form.watch('confirmation_text') !== `delete ${orgSlug}`
                }
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </Form>
    </AlertDialog>
  )
}
