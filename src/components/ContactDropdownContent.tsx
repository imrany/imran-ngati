import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Phone } from "lucide-react";
import GmailIcon from "./GmailIcon";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ContactDropdownContent({
  WHATSAPP_URL,
  EMAIL_URL,
  PHONE_URL,
}: {
  WHATSAPP_URL: string;
  EMAIL_URL: string;
  PHONE_URL: string;
}) {
  return (
    <DropdownMenuContent
      align="end"
      className="w-48 p-1.5 border border-border  backdrop-blur-md"
    >
      <DropdownMenuLabel className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Direct Streams
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-border/40 my-1" />

      <DropdownMenuItem asChild>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 cursor-pointer text-muted-foreground focus:text-foreground hover:bg-secondary hover:text-foreground focus:bg-secondary transition-colors"
        >
          <WhatsAppIcon className="size-4 text-emerald-500" />
          WhatsApp Chat
        </a>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <a
          href={EMAIL_URL}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 cursor-pointer text-muted-foreground focus:text-foreground hover:bg-secondary focus:bg-secondary transition-colors"
        >
          <GmailIcon className="size-4 text-rose-500" />
          Gmail Inbox
        </a>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <a
          href={PHONE_URL}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 cursor-pointer text-muted-foreground focus:text-foreground hover:bg-secondary focus:bg-secondary transition-colors"
        >
          <Phone className="size-4 text-accent" />
          Direct Call
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
