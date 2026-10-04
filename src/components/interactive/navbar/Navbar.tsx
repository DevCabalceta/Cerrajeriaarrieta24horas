import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { mainNavigation, type NavItem } from '@/data/navigation';
import { business } from '@/data/site';
import { cn } from '@/utils/cn';
import { getFocusableElements, lockScroll, setInertOutside } from '@/utils/dom';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useAccentSurfaceAt } from '../hooks/useAccentSurfaceAt';
import { useActiveSection } from '../hooks/useActiveSection';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useScrolled } from '../hooks/useScrolled';
import { DesktopNav } from './DesktopNav';
import { HeaderActions } from './HeaderActions';
import { MenuToggle } from './MenuToggle';
import { MobileMenu } from './MobileMenu';

const MOBILE_MENU_ID = 'mobile-menu';
const sectionIds = mainNavigation.map((item) => item.id);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const scrolled = useScrolled();
  const activeId = useActiveSection(sectionIds);
  const isDesktop = useMediaQuery('(min-width: 64rem)');
  const overAccent = useAccentSurfaceAt('top', 64);

  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    const header = headerRef.current;
    if (!menuOpen || !header) return;

    const island = header.closest<HTMLElement>('astro-island') ?? header;
    const unlockScroll = lockScroll();
    const releaseInert = setInertOutside(island);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !header) return;

      const focusable = getFocusableElements(header);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      releaseInert();
      unlockScroll();
    };
  }, [menuOpen]);

  function handleMobileNavigate(event: MouseEvent<HTMLAnchorElement>, href: NavItem['href']) {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) {
      setMenuOpen(false);
      return;
    }

    event.preventDefault();
    setMenuOpen(false);
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start' });
      history.pushState(null, '', href);
    });
  }

  const solid = scrolled || menuOpen;

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-0 transition-[background-color,backdrop-filter] duration-300 ease-smooth',
              menuOpen || overAccent ? 'bg-canvas' : solid ? 'bg-canvas/75 backdrop-blur-md' : 'bg-transparent',
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-x-0 bottom-0 h-px bg-line transition-opacity duration-300',
              scrolled && !menuOpen ? 'opacity-100' : 'opacity-0',
            )}
          />

          <AnimatePresence>
            {menuOpen && (
              <MobileMenu
                id={MOBILE_MENU_ID}
                items={mainNavigation}
                activeId={activeId}
                onNavigate={handleMobileNavigate}
              />
            )}
          </AnimatePresence>

          <div className="relative container-page flex h-header items-center justify-between">
            <a
              href="#top"
              aria-label={`${business.name}, ir al inicio`}
              className="group -m-2 animate-enter-down rounded-full p-2"
              onClick={() => setMenuOpen(false)}
            >
              <BrandLogo />
            </a>

            <DesktopNav items={mainNavigation} activeId={activeId} />

            <div className="flex animate-enter-down items-center gap-2 [animation-delay:200ms]">
              <HeaderActions />
              <MenuToggle
                ref={toggleRef}
                open={menuOpen}
                controls={MOBILE_MENU_ID}
                onToggle={() => setMenuOpen((open) => !open)}
              />
            </div>
          </div>
        </header>
      </LazyMotion>
    </MotionConfig>
  );
}
