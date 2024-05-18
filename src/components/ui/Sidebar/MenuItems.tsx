import { Home, ListVideo, Mic2, Music, Play, RadioIcon, SquareStack, User, User2 } from "lucide-react";

export const menuItems = [
  {
    label: "Discover",
    name: "Inicio",
    icon: <Home size={15} className="mr-2" />,
    href: "/home",
  },
  {
    label: "Discover",
    name: "Browse",
    icon: <SquareStack size={15} className="mr-2" />,
    href: "/home",
  },
  {
    label: "Discover",
    name: "Radio",
    icon: <RadioIcon size={15} className="mr-2" />,
    href: "/home/",
  },
  {
    label: "Library",
    name: "Playlist",
    icon: <Play size={15} className="mr-2" />,
    href: "/home/playlist",
    submenu: [
      {
        name: "Playlist 1",
        icon: <ListVideo size={15} className="mr-2" />,
        href: "/home/",
      },
      {
        name: "Playlist 2",
        icon: <ListVideo size={15} className="mr-2" />,
        href: "/home/",
      },
      {
        name: "Playlist 3",
        icon: <ListVideo size={15} className="mr-2" />,
        href: "/home/",
      },
    ],
  },
  {
    label: "Library",
    name: "Songs",
    icon: <Music size={15} className="mr-2" />,
    href: "/home/",
  },
  {
    label: "Library",
    name: "Made for You",
    icon: <User size={15} className="mr-2" />,
    href: "/home/",
  },
  {
    label: "Library",
    name: "Artist",
    icon: <Mic2 size={15} className="mr-2" />,
    href: "/home/",
  },
  {
    label: "Users",
    name: "Perfil",
    icon: <User2 size={15} className="mr-2" />,
    href: "/profile/",
  },
  
];