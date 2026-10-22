import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-paper-deep">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo className="size-24" />
          <p className="text-ink-soft mt-4 leading-relaxed">{site.description}</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-olive transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Say hello</p>
          <ul className="space-y-2.5">
            <li>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                className="hover:text-olive transition-colors"
              >
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-olive transition-colors">
                {site.email}
              </a>
            </li>
            <li className="flex gap-5 pt-1">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-olive transition-colors"
              >
                Instagram
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-olive transition-colors"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap border-line text-ink-soft flex flex-col justify-between gap-2 border-t py-6 text-sm sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. Handcrafted in India.
        </p>
        <p className="script text-sage text-xl">made with love, drafted with care</p>
      </div>
    </footer>
  );
}
