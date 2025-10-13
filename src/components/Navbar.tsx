'use client';

import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout');
      toast.success(response.data.message);
      router.push('/login'); // Redirect to login after logout
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const listItems = [
    {
      href: '/companies/maa-saraswati-road-carriers/66376f17b752100159dc12d9',
      title: 'Maa Saraswati Road Carriers',
    },
    {
      href: '/companies/the-rising-freight-carriers/663770b3b752100159dc12db',
      title: 'The Rising Freight Carriers',
    },
    {
      href: '/companies/sharma-transport/663771e7b752100159dc12dd',
      title: 'Sharma Transport',
    },
  ];

  const handleHomeClick = () => {
    router.push('/home'); // ✅ Works reliably in client components
  };

  return (
    <div className="px-20 py-5 flex items-center justify-between">
      <div className="logo text-4xl font-bold cursor-pointer" onClick={handleHomeClick}>
        Invoice Mate
      </div>

      <NavigationMenu>
        <NavigationMenuList className="px-0">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Companies</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul>
                {listItems.map((item) => (
                  <ListItem key={item.title} href={item.href}>
                    {item.title}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="cursor-pointer px-3">
            <NavigationMenuLink asChild>
              <button onClick={handleHomeClick} className="text-base font-medium">
                Home
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="cursor-pointer px-3">
            <Button onClick={handleLogout}>Logout</Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="w-[250px]">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground min-w-full',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Navbar;
