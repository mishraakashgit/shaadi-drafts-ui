import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFloat({
  message = "Hi Shaadi Drafts! I'd like to enquire about a gift.",
}: {
  message?: string;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group bg-ink text-paper fixed right-5 bottom-5 z-20 flex h-12 items-center gap-2 rounded-full px-3.5 text-sm font-semibold shadow-[0_14px_40px_-12px_rgb(22_26_17/0.55)] transition-transform hover:-translate-y-0.5 sm:pr-5 sm:pl-4"
    >
      <WhatsAppIcon className="size-5" />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
