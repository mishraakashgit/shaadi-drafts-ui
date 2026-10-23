import Link from "next/link";
import { nav, site } from "@/content/site";
import { buttonClass } from "./button";
import { InstagramIcon } from "./icons";
import { LogoMark } from "./logo";

export function Footer() {
  return (
    <footer className="bg-night text-paper/70 relative overflow-hidden">
      <div className="wrap pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <LogoMark className="size-20" />
            <p className="mt-6 leading-relaxed">{site.description}</p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass("ghostLight")} mt-7 !py-2.5`}
            >
              <InstagramIcon className="size-4" /> @shaadi_drafts
            </a>
          </div>
          <FooterCol title="Explore">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-paper transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title="Gifting">
            <li>
              <Link href="/work?c=wedding" className="hover:text-paper transition-colors">
                Wedding gifting
              </Link>
            </li>
            <li>
              <Link href="/work?c=design" className="hover:text-paper transition-colors">
                Invitations &amp; monograms
              </Link>
            </li>
            <li>
              <Link href="/festive/diwali" className="hover:text-paper transition-colors">
                Diwali hampers
              </Link>
            </li>
            <li>
              <Link href="/work?c=personal" className="hover:text-paper transition-colors">
                Custom gifts
              </Link>
            </li>
            <li>
              <a
                href="/brochure/shaadi-drafts-brochure.pdf"
                download
                className="hover:text-paper transition-colors"
              >
                Download brochure (PDF)
              </a>
            </li>
          </FooterCol>
          <FooterCol title="Contact">
            <li>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                className="hover:text-paper transition-colors"
              >
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-paper transition-colors">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paper transition-colors"
              >
                Facebook
              </a>
            </li>
          </FooterCol>
        </div>

        <p
          aria-hidden="true"
          className="text-paper/[0.07] mt-20 text-center font-serif text-[16vw] leading-[0.8] tracking-[-0.03em] whitespace-nowrap select-none md:text-[13.5vw]"
        >
          Shaadi Drafts
        </p>

        <div className="border-paper/10 mt-8 flex flex-col justify-between gap-2 border-t pt-6 text-[0.8rem] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Designed &amp; handmade in India.
          </p>
          <p>Gifts, drafted with meaning.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-paper/40 mb-5">{title}</p>
      <ul className="space-y-3 text-[0.92rem]">{children}</ul>
    </div>
  );
}
