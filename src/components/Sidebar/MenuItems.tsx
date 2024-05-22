import { Home, ListVideo, Mic2, Music, Play, RadioIcon, SquareStack, User2 } from 'lucide-react';

export const menuItems = [
  {
    label: 'Discover',
    name: 'Inicio',
    icon: <Home size={15} className="mr-2" />,
    href: '/',
  },
  {
    label: 'Discover',
    name: 'Browse',
    icon: <SquareStack size={15} className="mr-2" />,
    href: '/browse',
  },
  {
    label: 'Discover',
    name: 'Radio',
    icon: <RadioIcon size={15} className="mr-2" />,
    href: '/radio',
  },
  {
    label: 'Library',
    name: 'Playlist',
    icon: <Play size={15} className="mr-2" />,
    href: '/playlist',
    submenu: [
      {
        name: 'Playlist 1',
        icon: <ListVideo size={15} className="mr-2" />,
        href: '/playlist1',
      },
      {
        name: 'Playlist 2',
        icon: <ListVideo size={15} className="mr-2" />,
        href: '/playlist2',
      },
      {
        name: 'Playlist 3',
        icon: <ListVideo size={15} className="mr-2" />,
        href: '/playlist3',
      },
    ],
  },
  {
    label: 'Library',
    name: 'Songs',
    icon: <Music size={15} className="mr-2" />,
    href: '/songs',
  },
  {
    label: 'Library',
    name: 'Artist',
    icon: <Mic2 size={15} className="mr-2" />,
    href: '/artists',
  },
  {
    label: 'Users',
    name: 'Perfil',
    icon: <User2 size={15} className="mr-2" />,
    href: '/profile',
  },
];
