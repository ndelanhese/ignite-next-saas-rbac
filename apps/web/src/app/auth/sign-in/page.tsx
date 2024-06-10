import { GithubIcon } from '@components/icons/github'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'
import Link from 'next/link'

const SignInPage = () => (
  <form className="space-y-4">
    <div className="space-y-1">
      <Label htmlFor="email">E-mail</Label>
      <Input name="email" type="email" id="email" inputMode="email" />
    </div>

    <div className="space-y-1">
      <Label htmlFor="password">Password</Label>
      <Input name="password" type="password" id="password" />

      <Link
        href="/auth/forgot-password"
        className="text-sm font-medium text-foreground hover:underline"
      >
        Forgot your password
      </Link>
    </div>

    <Button className="w-full" type="submit">
      Sign in with e-mail
    </Button>

    <Button className="w-full" variant="link" size="sm" asChild>
      <Link href="/auth/sign-up">Create new account</Link>
    </Button>

    <Separator />

    <Button className="w-full" variant="outline">
      <GithubIcon className="mr-2 dark:invert" /> Sign in with Github
    </Button>
  </form>
)

export default SignInPage
