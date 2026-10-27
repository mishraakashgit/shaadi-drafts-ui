import { site } from "@/content/site";
import type { OccasionValue } from "@/lib/enquiry";
import { whatsappUrl } from "@/lib/whatsapp";
import { EnquiryPanel } from "./enquiry-panel";
import { ArrowIcon, DownloadIcon, InstagramIcon, MailIcon, WhatsAppIcon } from "./icons";

export function EnquireSection({
  eyebrow = "Start a gift",
  title = "Tell us who",
  accent = "you're gifting.",
  intro = "Share a few details and we'll come back with ideas, options and a quote. Prefer to talk?",
  defaultOccasion,
}: {
  eyebrow?: string;
  title?: string;
  accent?: string;
  intro?: string;
  defaultOccasion?: OccasionValue;
}) {
  return (
    <section id="enquire" className="py-24 md:py-32">
      <div className="wrap">
        <div
          data-reveal
          className="bg-card border-line grid grid-cols-1 overflow-hidden rounded-[2rem] border shadow-[0_40px_80px_-50px_rgb(22_26_17/0.35)] lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="bg-olive-deep text-paper relative p-8 sm:p-12 lg:p-14">
            <p className="eyebrow text-gold-soft">{eyebrow}</p>
            <h2 className="mt-5 text-5xl leading-[1.02] md:text-6xl">
              {title} <em className="text-gold-soft">{accent}</em>
            </h2>
            <p className="text-paper/70 mt-5 max-w-sm leading-relaxed">{intro}</p>
            <div className="mt-10 space-y-3">
              <ContactTile
                href={whatsappUrl("Hi Shaadi Drafts!")}
                icon={<WhatsAppIcon className="size-5" />}
                label="WhatsApp"
                value={site.phoneDisplay}
              />
              <ContactTile
                href={`mailto:${site.email}`}
                icon={<MailIcon className="size-5" />}
                label="Email"
                value={site.email}
              />
              <ContactTile
                href="/brochure/shaadi-drafts-brochure.pdf"
                icon={<DownloadIcon className="size-5" />}
                label="Brochure · PDF, 12 pages"
                value="Download our brochure"
              />
              <ContactTile
                href={site.social.instagram}
                icon={<InstagramIcon className="size-5" />}
                label="Instagram"
                value="@shaadi_drafts"
              />
            </div>
          </div>
          <div className="p-8 sm:p-12 lg:p-14">
            <EnquiryPanel defaultOccasion={defaultOccasion} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactTile({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group border-paper/15 hover:border-paper/40 hover:bg-paper/5 flex items-center gap-4 rounded-2xl border p-4 transition-colors"
    >
      <span className="bg-paper/10 flex size-11 shrink-0 items-center justify-center rounded-full">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="text-paper/55 block text-xs">{label}</span>
        <span className="block truncate font-semibold">{value}</span>
      </span>
      <ArrowIcon className="ml-auto size-4 shrink-0 opacity-50 transition-transform group-hover:translate-x-1 group-hover:opacity-100" />
    </a>
  );
}
