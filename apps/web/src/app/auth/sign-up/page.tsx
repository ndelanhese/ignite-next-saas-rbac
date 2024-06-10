import { GithubIcon } from '@components/icons/github'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'
import Link from 'next/link'

const SignUpPage = () => (
  <form className="space-y-4">
    <div className="space-y-1">
      <Label htmlFor="name">Name</Label>
      <Input name="name" id="name" />
    </div>

    <div className="space-y-1">
      <Label htmlFor="email">E-mail</Label>
      <Input name="email" type="email" id="email" inputMode="email" />
    </div>

    <div className="space-y-1">
      <Label htmlFor="password">Password</Label>
      <Input name="password" type="password" id="password" />
    </div>

    <div className="space-y-1">
      <Label htmlFor="password_confirmation">Confirm your password</Label>
      <Input
        name="password_confirmation"
        type="password"
        id="password_confirmation"
      />
    </div>

    <Button className="w-full" type="submit">
      Create account
    </Button>

    <Button className="w-full" variant="link" size="sm" asChild>
      <Link href="/auth/sign-in">Already registered? Sign in</Link>
    </Button>

    <Separator />

    <Button className="w-full" variant="outline">
      <GithubIcon className="mr-2 dark:invert" /> Sign up with Github
    </Button>
  </form>
)

export default SignUpPage
