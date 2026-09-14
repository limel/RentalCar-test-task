'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import css from './Header.module.css';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={104}
            height={16}
            loading="eager"
          />
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href} className={css.navigationItem}>
                  <Link
                    href={href}
                    className={
                      isActive
                        ? `${css.navigationLink} ${css.active}`
                        : css.navigationLink
                    }
                    aria-current={isActive ? 'page' : undefined}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
