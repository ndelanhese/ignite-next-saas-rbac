'use client'

import { GithubIcon } from '@components/icons/github'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'
import { useFormState } from '@hooks/use-form-state'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { signInWithGithub } from '../actions'
import { signInWithEmailAndPassword } from './actions'

export const SignInForm = () => {
  const { push } = useRouter()
  const searchParams = useSearchParams()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState({
    action: signInWithEmailAndPassword,
    onSuccess: () => push('/'),
  })

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            type="email"
            id="email"
            inputMode="email"
            defaultValue={searchParams.get('email') ?? undefined}
          />

          {errors?.email && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
          {errors?.password && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}

          <Link
            href="/auth/forgot-password"
            className="pt-2 text-sm font-medium text-foreground hover:underline"
          >
            Forgot your password
          </Link>
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={isPending}
          isLoading={isPending}
        >
          Sign in with e-mail
        </Button>

        <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>

        <Separator />
      </form>
      <form action={signInWithGithub}>
        <Button
          className="w-full"
          variant="outline"
          type="submit"
          icon={<GithubIcon className="mr-2 dark:invert" />}
        >
          Sign in with Github
        </Button>
      </form>
    </div>
  )
}
