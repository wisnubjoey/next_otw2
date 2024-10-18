import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import ProfilePostCard from "@/components/ProfilePostCard"


async function getPosts() {
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

const Page = async () => {
  const session = await auth()
  const posts = await getPosts();
  if (!session) return redirect('/access')

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 container mx-auto">
      {/* Left column - Profile */}
      <div className="w-64">
        <Card className="w-full rounded-lg overflow-hidden">
          <div className="relative h-24">
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary to-secondary"
              style={{
                backgroundImage: `url(${session.user.image || "/placeholder-user.jpg"})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px) brightness(0.7)',
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <Avatar className="absolute -bottom-8 left-4 border-4 border-background w-16 h-16">
              <AvatarImage src={session.user.image || "/placeholder-user.jpg"} alt="User Avatar" />
              <AvatarFallback>{session.user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </div>
          <CardContent className="p-6 pt-12 grid gap-3">
            <div className="grid gap-1">
              <div className="text-lg font-semibold">{session.user.name || 'User Name'}</div>
              <div className="text-sm text-muted-foreground">{session.user.email || 'user@example.com'}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {session.user.name || 'No public ID available'}
            </div>

            
            <div className="pt-4 space-y-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {/* Add form fields for editing profile */}
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <form
                action={async () => {
                  'use server'
                  await signOut()
                }}
                className='pb-2'
              >
                <Button type="submit" variant="destructive" className="w-full">Sign Out</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Right column - Recent Posts */}
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
        <ProfilePostCard posts={posts}/>
      </div>
    </div>
  )
}

export default Page
