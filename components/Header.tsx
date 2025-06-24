import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <Link className="text-xl font-bold" href="/">LMS</Link>
      <nav className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/courses">Courses</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </nav>
    </header>
  )
}
