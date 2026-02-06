import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center w-full">
      <SignIn routing="hash" />
    </div>
  )
}