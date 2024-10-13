'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const NavItems = () => (
    <ul className="grid gap-3 p-6 sm:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
      <li className="row-span-3">
        <NavigationMenuLink asChild>
          <a
            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
            href="/"
          >
            <div className="mb-2 mt-4 text-lg font-medium">
              Home
            </div>
            <p className="text-sm leading-tight text-muted-foreground">
              Welcome to our website
            </p>
          </a>
        </NavigationMenuLink>
      </li>
      <li>
        <NavigationMenuLink asChild>
          <a
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            href="/about"
          >
            <div className="text-sm font-medium leading-none">About</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Learn more about us
            </p>
          </a>
        </NavigationMenuLink>
      </li>
      <li>
        <NavigationMenuLink asChild>
          <a
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            href="/contact"
          >
            <div className="text-sm font-medium leading-none">Contact</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Get in touch with us
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    </ul>
  )

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold mr-4">
            Logo
          </Link>
          <div className="hidden sm:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavItems />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center">
          {!session && (
            <Link href="/access" passHref>
              <Button className="mr-4">
                Sign In | Sign Up
              </Button>
            </Link>
          )}
          <div className="sm:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Menu className="h-6 w-6 cursor-pointer" />
              </SheetTrigger>
              <SheetContent side="top" className="h-full p-4">
                <div className='flex flex-col gap-2 justify-center items-center h-full'>
                  <Button className="w-64">
                    <Link href="/" className="w-full text-center">Home</Link>
                  </Button>
                  <Button className="w-64">
                    <Link href="/about" className="w-full text-center">About</Link>
                  </Button>
                  <Button className="w-64">
                    <Link href="/contact" className="w-full text-center">Contact</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
