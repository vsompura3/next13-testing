export default function UserProfile({ params }: any) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-4 gap-8">
      <h1 className="text-2xl font-semibold">Profile - {params.id}</h1>
    </div>
  )
}
