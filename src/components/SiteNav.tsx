const links = [
  { label: "Journey", href: "#journey" },
  { label: "City", href: "#city" },
  { label: "Ocean", href: "#ocean" },
  { label: "Space", href: "#space" },
];

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 md:px-12 md:py-7">
      <a
        href="#top"
        className="animate-rise truncate font-display text-xl tracking-[0.3em] text-cream md:text-2xl"
      >
        BEYOND
      </a>
      <nav className="flex shrink-0 items-center gap-4 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground sm:gap-9 sm:text-[11px] sm:tracking-[0.28em]">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-colors duration-300 hover:text-cream"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
