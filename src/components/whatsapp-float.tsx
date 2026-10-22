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
      className="bg-olive text-paper hover:bg-olive-deep fixed right-5 bottom-5 z-20 flex size-14 items-center justify-center rounded-full shadow-[0_10px_30px_-10px_rgb(31_36_26/0.6)] transition-transform hover:-translate-y-0.5"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
