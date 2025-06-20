import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">LMS</h1>
      <nav className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/courses">Courses</Link>
        <Link href="/profile">Profile</Link>
      </nav>
    </header>
  )
}
