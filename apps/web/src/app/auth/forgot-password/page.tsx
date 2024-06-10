import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import Link from 'next/link'

const ForgotPasswordPage = () => (
  <form className="space-y-4">
    <div className="space-y-1">
      <Label htmlFor="email">E-mail</Label>
      <Input name="email" type="email" id="email" inputMode="email" />
    </div>

    <Button className="w-full" type="submit">
      Recover password
    </Button>

    <Button className="w-full" variant="link" size="sm" asChild>
      <Link href="/auth/sign-in">Sign in instead</Link>
    </Button>
  </form>
)

export default ForgotPasswordPage
