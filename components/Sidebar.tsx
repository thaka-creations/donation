'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  UserCog,
  Building2,
  Database,
  HeartHandshake,
  Gift,
  CreditCard,
  Settings,
  ChevronDown,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/staff' },
  {
    name: 'Users',
    icon: Users,
    path: '/staff/users',
    subItems: [
      { name: 'Staff', path: '/staff/users/staff' },
      { name: 'Institution', path: '/staff/users/institution' },
      { name: 'Donnees', path: '/staff/users/donnees' },
      { name: 'Donors', path: '/staff/users/donors' },
    ],
  },
  { name: 'Donations', icon: HeartHandshake, path: '/staff/donations' },
  { name: 'Subscriptions', icon: Gift, path: '/staff/subscriptions' },
  { name: 'Payments', icon: CreditCard, path: '/staff/payments' },
  { name: 'Settings', icon: Settings, path: '/staff/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <motion.div
      initial={{ width: expanded ? 240 : 80 }}
      animate={{ width: expanded ? 240 : 80 }}
      className="h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
    >
      <div className="p-4">
        <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">KenyanPad</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <div key={item.name}>
            <Link
              href={item.path}
              className={`flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                pathname === item.path ? 'bg-purple-100 dark:bg-purple-900' : ''
              }`}
              onClick={() => item.subItems && toggleSubmenu(item.name)}
            >
              <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {expanded && <span className="ml-3">{item.name}</span>}
              {item.subItems && expanded && (
                <ChevronDown
                  className={`ml-auto w-4 h-4 transition-transform ${
                    openSubmenu === item.name ? 'rotate-180' : ''
                  }`}
                />
              )}
            </Link>
            {item.subItems && expanded && openSubmenu === item.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pl-12"
              >
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.path}
                    className={`block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      pathname === subItem.path ? 'bg-purple-100 dark:bg-purple-900' : ''
                    }`}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </nav>
    </motion.div>
  );
} 