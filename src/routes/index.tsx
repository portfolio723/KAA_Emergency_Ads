import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  Phone,
  MapPin,
  Check,
  Star,
  ArrowRight,
  Clock,
  ShieldCheck,
  HeartHandshake,
  Menu,
  X,
  MessageCircle,
  CalendarDays,
  Stethoscope,
  ChevronDown,
} from "lucide-react";
import logoImg from "@/assets/KH-scaled-1-2048x588.png.webp";
import ke1Img from "@/assets/ke1.png";
import ke2Img from "@/assets/ke2.png";
import ke3Img from "@/assets/ke3.png";
import ke4Img from "@/assets/ke4.png";
import ke5Img from "@/assets/ke5.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Emergency Dentist Mountain Ash & Rhymney | KAA Dentals" },
      {
        name: "description",
        content:
          "In pain? KAA Dentals offers £50 emergency dental appointments in Mountain Ash and Rhymney for toothache, broken teeth, swelling and abscesses.",
      },
      {
        property: "og:title",
        content: "Emergency Dentist Mountain Ash & Rhymney | KAA Dentals",
      },
      {
        property: "og:description",
        content:
          "Same-day emergency dental appointments when available. £50 emergency assessment including X-rays if needed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmergencyPage,
});

const PHONE = "01443 473 555";
const TEL = `tel:${PHONE.replace(/\s/g, "")}`;
const WHATSAPP = `https://wa.me/44${PHONE.replace(/\s/g, "").replace(/^0/, "")}`;
const WHATSAPP_ICON = "https://img.icons8.com/?size=100&id=7OeRNqg6S7Vf&format=png&color=000000";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "The process", href: "#process" },
  { label: "Problems", href: "#problems" },
  { label: "Questions", href: "#faq" },
  { label: "Practices", href: "#practices" },
];

const problems = [
  {
    title: "Toothache",
    body: "Severe or ongoing tooth pain?",
    cta: "Toothache treatment",
    image: ke1Img,
  },
  {
    title: "Broken or chipped tooth",
    body: "Broken, cracked or chipped your tooth?",
    cta: "Broken tooth treatment",
    image: ke2Img,
  },
  {
    title: "Swelling or dental abscess",
    body: "Swelling, infection or a painful lump?",
    cta: "Dental abscess treatment",
    image: ke3Img,
  },
  {
    title: "Lost filling or crown",
    body: "Lost or damaged a filling or crown?",
    cta: "Lost filling treatment",
    image: ke4Img,
  },
  {
    title: "Tooth extraction",
    body: "A painful or badly damaged tooth that may need removing?",
    cta: "Tooth extraction",
    image: ke5Img,
  },
  {
    title: "Not sure what's wrong?",
    body: "That's fine. Call us and we'll advise you on what to do next.",
    cta: `Call ${PHONE}`,
  },
];

const faqs = [
  {
    q: "Can I get an emergency appointment today?",
    a: "We offer same-day emergency appointments when available. Call us or complete the booking form and we'll help you find the next available appointment.",
  },
  {
    q: "How much is an emergency appointment?",
    a: "Our emergency appointment is £50. This covers your emergency examination and X-rays if needed. Any further treatment will be explained and priced before we proceed.",
  },
  {
    q: "What dental problems can you treat?",
    a: "We can help with toothache, broken or chipped teeth, dental abscesses, swelling, lost fillings or crowns, and other urgent dental problems.",
  },
  {
    q: "What if I'm nervous about the dentist?",
    a: "That's completely understandable. Let us know when you book and we'll take extra time to explain what's happening and answer your questions.",
  },
  {
    q: "Can I be seen if I'm not a regular patient?",
    a: "Yes. You can contact us to request an emergency appointment even if you're a new patient.",
  },
];

const areas = [
  "Mountain Ash",
  "Aberdare",
  "Abercynon",
  "Pontypridd",
  "Tonypandy",
  "Treorchy",
  "Ystrad Mynach",
  "Blackwood",
  "Merthyr Tydfil",
  "Bargoed",
  "Tredegar",
  "Rhymney",
  "Ebbw Vale",
  "Abertillery",
  "New Tredegar",
];

const CTA_BASE =
  "inline-flex items-center justify-center gap-2 rounded-cta px-7 py-3.5 text-sm font-medium transition-all";

function CallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={TEL}
      className={`${CTA_BASE} bg-gold text-primary shadow-[var(--shadow-soft)] hover:-translate-y-0.5 ${className}`}
    >
      <Phone className="h-4 w-4" /> Call us now
    </a>
  );
}

function BookButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#request"
      className={`${CTA_BASE} bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] ${className}`}
    >
      Book an appointment
    </a>
  );
}

function Badge({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium tracking-[0.12em] uppercase ${
        light
          ? "border-gold/40 bg-primary-foreground/5 text-gold-soft"
          : "border-gold/40 bg-gold/10 text-primary"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

function SectionHeading({
  badge,
  title,
  light = false,
  className = "",
}: {
  badge: string;
  title: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Badge light={light}>{badge}</Badge>
      <h2 className="mt-4 max-w-3xl text-3xl leading-tight md:text-4xl">{title}</h2>
    </div>
  );
}

/* Desktop pill nav with sliding active indicator */
function PillNav({ active }: { active: string }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLAnchorElement>(`a[data-href="${active}"]`);
    if (!el) return;
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, [active]);

  return (
    <nav
      ref={listRef}
      aria-label="Page sections"
      className="relative hidden items-center rounded-full border border-border bg-card/90 p-1 shadow-[var(--shadow-soft)] backdrop-blur md:flex"
    >
      <span
        aria-hidden
        className="absolute top-1 bottom-1 rounded-full bg-secondary transition-[left,width,opacity] duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
        style={{ left: indicator.left, width: indicator.width, opacity: indicator.ready ? 1 : 0 }}
      />
      {navItems.map((n) => (
        <a
          key={n.href}
          href={n.href}
          data-href={n.href}
          className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            active === n.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {n.label}
        </a>
      ))}
    </nav>
  );
}

/* 4 stack side-by-side blocks (as per brand guidelines and attached design layout) */
function PillarsSection() {
  return (
    <section className="border-y border-border bg-card shadow-xs">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {/* Block 1: Approach */}
          <div className="flex items-center gap-4 px-6 py-6 lg:py-8">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/60 bg-gold/10 text-gold">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                APPROACH
              </p>
              <p className="mt-0.5 font-display text-base font-medium text-foreground md:text-lg">
                Clear, considered care
              </p>
            </div>
          </div>

          {/* Block 2: First Step */}
          <div className="flex items-center gap-4 px-6 py-6 lg:py-8">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/60 bg-gold/10 text-gold">
              <Stethoscope className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                FIRST STEP
              </p>
              <p className="mt-0.5 font-display text-base font-medium text-foreground md:text-lg">
                Emergency assessment
              </p>
            </div>
          </div>

          {/* Block 3: Experience */}
          <div className="flex items-center gap-4 px-6 py-6 lg:py-8">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/60 bg-gold/10 text-gold">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                EXPERIENCE
              </p>
              <p className="mt-0.5 font-display text-base font-medium text-foreground md:text-lg">
                Calm and straightforward
              </p>
            </div>
          </div>

          {/* Block 4: Ready to Talk? */}
          <a
            href="#request"
            className="group flex items-center justify-between px-6 py-6 transition-colors hover:bg-secondary/40 lg:py-8"
          >
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                READY TO TALK?
              </p>
              <p className="mt-0.5 font-display text-base font-medium text-foreground transition-colors group-hover:text-gold md:text-lg">
                Start your request
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-gold transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

function EmergencyPage() {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [active, setActive] = useState(navItems[0].href);

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = navItems[0].href;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= marker) current = `#${id}`;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    toast.success("Appointment request received", {
      description: "Our team will contact you promptly about the next available emergency slot.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20 font-medium text-foreground md:pb-0">
      <Toaster />

      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 md:grid-cols-[1fr_auto_1fr]">
          <img
            src={logoImg}
            alt="KAA Dentals — smile with confidence"
            className="h-9 w-auto object-contain md:h-10"
          />
          <PillNav active={active} />
          <div className="flex items-center justify-end gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-cta bg-whatsapp px-4 py-2 text-sm font-medium text-whatsapp-foreground shadow-sm transition hover:opacity-90 sm:inline-flex"
            >
              WhatsApp
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-cta border border-border bg-card md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`grid overflow-hidden border-border bg-card transition-[grid-template-rows,border-width] duration-300 ease-out md:hidden ${
            menuOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
          }`}
        >
          <nav aria-label="Mobile sections" className="min-h-0">
            <ul className="px-5 py-3">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                      active === n.href ? "bg-secondary text-primary" : "text-foreground"
                    }`}
                  >
                    {n.label}
                    <ArrowRight className="h-4 w-4 text-gold" />
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-border pt-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-whatsapp/15 px-3 py-2 text-sm font-medium text-primary"
                >
                  <img
                    src={WHATSAPP_ICON}
                    alt="WhatsApp"
                    className="h-4 w-4"
                    referrerPolicy="no-referrer"
                  />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="surface-navy">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.15fr_1fr] md:py-24">
          <div>
            <Badge light>Emergency Dentist</Badge>
            <h1 className="mt-5 text-4xl leading-[1.05] md:text-6xl">
              In pain? <span className="text-gradient-gold">Call us today.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed opacity-90 md:text-lg">
              Need urgent dental care? We can help with toothache, broken teeth, swelling, dental
              abscesses and other dental emergencies.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={`${CTA_BASE} bg-gold text-primary shadow-[var(--shadow-soft)] hover:-translate-y-0.5 active:scale-[0.99]`}
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call us now</span>
                    <ChevronDown className="h-4 w-4 opacity-80" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-72 rounded-2xl border border-border bg-card p-2 text-card-foreground shadow-xl"
                >
                  <div className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                    Call our practices directly:
                  </div>
                  <DropdownMenuItem asChild>
                    <a
                      href="tel:01443474441"
                      className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary focus:bg-secondary"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-gold" />
                        <span className="font-semibold text-primary">Mountain Ash</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-bold tracking-tight text-foreground">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-gold" />
                        <span>01443 474 441</span>
                      </span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="tel:01685840700"
                      className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary focus:bg-secondary"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-gold" />
                        <span className="font-semibold text-primary">Rhymney</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-bold tracking-tight text-foreground">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-gold" />
                        <span>01685 840 700</span>
                      </span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-2xl border border-gold/30 bg-card p-7 text-card-foreground shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium leading-snug text-muted-foreground">
                For emergency appointments,
                <br />
                you can also book online.
              </p>
              <p className="font-display text-5xl text-primary shrink-0">£50</p>
            </div>
            <a
              href="#request"
              className={`${CTA_BASE} mt-5 w-full bg-primary text-primary-foreground hover:-translate-y-0.5`}
            >
              Book an appointment
            </a>

            {/* Two locations with each phone number as CTA without borders */}
            <div className="mt-6 border-t border-border/70 pt-5">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                Call our practices directly:
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href="tel:01443474441"
                  className="group flex items-center justify-between py-1.5 text-sm font-medium text-foreground transition-colors hover:text-gold"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-gold transition-transform group-hover:scale-110" />
                    <span className="font-semibold text-primary">Mountain Ash</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-bold tracking-tight text-foreground transition-colors group-hover:text-gold">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-gold transition-transform group-hover:scale-110" />
                    <span>01443 474 441</span>
                  </span>
                </a>
                <a
                  href="tel:01685840700"
                  className="group flex items-center justify-between py-1.5 text-sm font-medium text-foreground transition-colors hover:text-gold"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-gold transition-transform group-hover:scale-110" />
                    <span className="font-semibold text-primary">Rhymney</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-bold tracking-tight text-foreground transition-colors group-hover:text-gold">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-gold transition-transform group-hover:scale-110" />
                    <span>01685 840 700</span>
                  </span>
                </a>
              </div>

              {/* Timings under locations */}
              <div className="mt-3.5 border-t border-border/60 pt-3">
                <div className="flex items-center justify-between py-1.5 text-sm font-medium text-foreground">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gold shrink-0" />
                    <span className="font-semibold text-primary">Monday to Saturday</span>
                  </span>
                  <span className="font-bold tracking-tight text-foreground">9AM – 5PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <PillarsSection />

      {/* One problem, one appointment */}
      <section id="overview" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:py-24">
        <SectionHeading
          badge="Overview"
          title="One problem, one appointment — focused on getting you out of pain."
        />
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
            <p>
              When you're in dental pain, you need to know what's wrong and what to do next. Our
              emergency appointments are designed to assess the problem, take X-rays if needed and
              give you clear treatment options.
            </p>
            <p className="text-foreground">
              From toothache and broken teeth to swelling and abscesses, we're here to help.
            </p>
            <div className="rounded-xl border border-border bg-secondary/60 p-5">
              <h3 className="text-lg text-foreground">
                No routine waiting list for emergency appointments
              </h3>
              <p className="mt-2 text-sm">
                If you need urgent dental care, you don't have to wait for a routine check-up
                appointment. We keep your emergency appointment simple, clear and focused on getting
                you the help you need.
              </p>
            </div>
          </div>

          <figure className="flex flex-col justify-center rounded-2xl border border-gold/40 bg-card p-7 shadow-[var(--shadow-soft)]">
            <div className="flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 font-display text-lg leading-relaxed">
              "I had an emergency and was able to get an appointment quickly. The dentist explained
              everything clearly and made me feel at ease. The whole experience was very smooth."
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              KAA Dentals patient
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="surface-navy scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            {/* Left side: Badge, header, description, and details */}
            <div className="lg:sticky lg:top-24">
              <Badge light>Book online</Badge>
              <h2 className="mt-4 max-w-3xl text-3xl leading-tight text-white md:text-4xl">
                Request an emergency appointment
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
                Tell us what's wrong and we'll contact you promptly about the next available
                appointment.
              </p>

              <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-soft">
                  What to expect:
                </h3>
                <ul className="space-y-3 text-sm text-white/90">
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>
                      <strong>Same-day priority:</strong> Dedicated slots reserved daily for acute
                      pain and urgent dental needs.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>
                      <strong>Transparent £50 fee:</strong> Comprehensive diagnosis, pain relief
                      guidance, and X-rays if needed.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>
                      <strong>Two practice locations:</strong> Mountain Ash (CF45 3HB) &amp; Rhymney
                      (NP22 5PW).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Need to speak with us directly?
                </p>
                <div className="mt-2.5 flex flex-col gap-2 sm:flex-row sm:gap-4">
                  <a
                    href="tel:01443474441"
                    className="inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-gold"
                  >
                    <Phone className="h-4 w-4 text-gold" /> Mountain Ash:{" "}
                    <span className="font-bold">01443 474 441</span>
                  </a>
                  <a
                    href="tel:01685840700"
                    className="inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-gold"
                  >
                    <Phone className="h-4 w-4 text-gold" /> Rhymney:{" "}
                    <span className="font-bold">01685 840 700</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right side: Form card with white background and refined typographic hierarchy */}
            <div className="rounded-3xl border border-gold/30 bg-card p-6 text-card-foreground shadow-[var(--shadow-soft)] sm:p-9 md:p-10">
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Row 1: Name and Phone Number */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="form-name"
                      className="block text-sm font-semibold text-foreground"
                    >
                      Name
                    </label>
                    <input
                      id="form-name"
                      required
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="mt-1.5 w-full rounded-full border border-border bg-secondary/40 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="form-phone"
                      className="block text-sm font-semibold text-foreground"
                    >
                      Phone Number
                    </label>
                    <input
                      id="form-phone"
                      required
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="mt-1.5 w-full rounded-full border border-border bg-secondary/40 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
                    />
                  </div>
                </div>

                {/* Row 2: Email and New or existing patient? */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="form-email"
                      className="block text-sm font-semibold text-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="form-email"
                      required
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="mt-1.5 w-full rounded-full border border-border bg-secondary/40 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="form-patient"
                      className="block text-sm font-semibold text-foreground"
                    >
                      New or existing patient?
                    </label>
                    <div className="relative mt-1.5">
                      <select
                        id="form-patient"
                        name="patientType"
                        defaultValue="Existing patient"
                        className="w-full appearance-none rounded-full border border-border bg-secondary/40 px-5 py-3 pr-10 text-sm text-foreground outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
                      >
                        <option value="Existing patient">Existing patient</option>
                        <option value="New patient">New patient</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Location */}
                <div>
                  <label
                    htmlFor="form-location"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Location
                  </label>
                  <div className="relative mt-1.5">
                    <select
                      id="form-location"
                      name="location"
                      defaultValue="Mountain Ash (CF45 3HB)"
                      className="w-full appearance-none rounded-full border border-border bg-secondary/40 px-5 py-3 pr-10 text-sm text-foreground outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
                    >
                      <option value="Mountain Ash (CF45 3HB)">Mountain Ash (CF45 3HB)</option>
                      <option value="Rhymney (NP22 5PW)">Rhymney (NP22 5PW)</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                {/* Row 4: Describe your dental concern */}
                <div>
                  <label
                    htmlFor="form-concern"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Describe your dental concern
                  </label>
                  <textarea
                    id="form-concern"
                    required
                    name="concern"
                    rows={3}
                    placeholder="Describe your dental concern"
                    className="mt-1.5 w-full resize-y rounded-2xl border border-border bg-secondary/40 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
                  />
                </div>

                {/* Row 5: Consent checkbox */}
                <div className="pt-1">
                  <label className="flex cursor-pointer items-center gap-3 select-none">
                    <input
                      type="checkbox"
                      required
                      name="consent"
                      className="h-4 w-4 rounded border-border accent-primary focus:ring-gold"
                    />
                    <span className="text-sm font-medium text-foreground/90">
                      I consent to being contacted by KAA dentals
                    </span>
                  </label>
                </div>

                {/* Row 6: Details Privacy Policy notice */}
                <div className="pt-1">
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground">
                    DETAILS CAN BE FOUND IN OUR{" "}
                    <button
                      type="button"
                      onClick={() => setPrivacyOpen(true)}
                      className="font-bold text-primary underline decoration-gold/60 underline-offset-2 hover:text-gold"
                    >
                      PRIVACY POLICY.
                    </button>
                  </p>
                </div>

                {/* Row 7: Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-primary py-4 text-center text-base font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.99]"
                  >
                    {sent ? "Request Sent Successfully" : "Request an Emergency Appointment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>KAA Dentals Privacy Policy</DialogTitle>
            <DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Your personal details (name, telephone number, email, and dental symptoms) are
              collected strictly to arrange and coordinate your emergency appointment at our
              Mountain Ash or Rhymney practices. In compliance with UK GDPR and NHS confidentiality
              standards, your data is never shared or sold to third parties.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* What happens */}
      <section id="process" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:py-24">
        <SectionHeading badge="The process" title="What happens at your emergency appointment?" />
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Your <span className="text-foreground">£50 emergency appointment</span> is an assessment
          of your dental problem.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6">
            <div>
              <ShieldCheck className="h-6 w-6 text-gold" />
              <h3 className="mt-3 text-lg">We'll:</h3>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {[
                "Examine the problem",
                "Check what's causing your pain",
                "Take an X-ray if needed",
                "Explain your treatment options",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6">
            <div>
              <HeartHandshake className="h-6 w-6 text-gold" />
              <h3 className="mt-3 text-lg">If you need treatment</h3>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              We'll explain what needs to be done and the cost{" "}
              <span className="text-foreground">before treatment starts.</span>
            </p>
          </div>

          <div className="rounded-2xl border border-gold/40 bg-secondary/60 p-6">
            <Clock className="h-6 w-6 text-gold" />
            <h3 className="mt-3 text-lg">Common treatment prices</h3>
            <dl className="mt-3 space-y-2 text-sm">
              {[
                ["Filling", "£100"],
                ["Tooth extraction", "£100"],
                ["Root canal", "£200"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-1.5">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-display text-primary">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs italic text-muted-foreground">
              Prices are starting prices and may vary depending on the treatment required.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <BookButton />
        </div>
      </section>

      {/* Problems */}
      <section id="problems" className="scroll-mt-24 border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading badge="Problems we treat" title="What's bothering you?" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p, idx) => {
              const hasImage = idx < 5; // except the 6th card

              if (!hasImage) {
                return (
                  <div
                    key={p.title}
                    className="group flex flex-col justify-between rounded-2xl border border-gold/40 bg-card p-6 transition-all hover:border-gold hover:shadow-md"
                  >
                    <div>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/40 bg-gold/10 text-primary">
                        <Phone className="h-5 w-5 text-gold" />
                      </div>
                      <h3 className="text-lg font-medium text-foreground">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                    </div>
                    <a
                      href={TEL}
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-cta bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.99]"
                    >
                      <Phone className="h-4 w-4 text-gold" />
                      {p.cta}
                    </a>
                  </div>
                );
              }

              return (
                <div
                  key={p.title}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-gold hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/70 bg-secondary transition-colors group-hover:border-gold/50">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="text-lg font-medium text-foreground">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.body}</p>
                  <a
                    href="#request"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary"
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          {/* Left side: Badge and header */}
          <div className="lg:sticky lg:top-24">
            <Badge>Questions</Badge>
            <h2 className="mt-4 max-w-3xl text-3xl leading-tight text-foreground md:text-4xl">
              The things people actually ask.
            </h2>
          </div>

          {/* Right side: Accordion */}
          <div className="w-full">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="surface-navy">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <SectionHeading
            light
            badge="Local area"
            title="Emergency Dentist for patients across the local area."
          />
          <p className="mt-3 max-w-2xl opacity-90">
            With practices in <span className="text-gold-soft">Mountain Ash and Rhymney</span>, KAA
            Dentals provides emergency dental care for patients from nearby towns and communities.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {areas.map((a) => (
              <li
                key={a}
                className="rounded-full border border-gold/40 px-4 py-1.5 text-sm opacity-90"
              >
                Dentist near {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Practices */}
      <section id="practices" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:py-24">
        <SectionHeading badge="Practices" title="Find your nearest KAA practice" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            { name: "Mountain Ash", area: "Mountain Ash, Rhondda Cynon Taf" },
            { name: "Rhymney", area: "Rhymney, Caerphilly" },
          ].map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-xl">{p.name}</h3>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {p.area}
              </p>
              <a
                href={`https://www.google.com/maps/search/KAA+Dentals+${p.name}`}
                target="_blank"
                rel="noreferrer"
                className={`${CTA_BASE} mt-5 border border-gold/60 px-6 py-3 hover:bg-gold/15`}
              >
                Get directions
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <img src={logoImg} alt="KAA Dentals" className="h-9 w-auto object-contain" />
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-cta bg-whatsapp px-5 py-3.5 text-sm font-medium text-whatsapp-foreground shadow-sm transition hover:opacity-90"
            >
              <img
                src={WHATSAPP_ICON}
                alt="WhatsApp"
                className="h-4 w-4 brightness-0 invert"
                referrerPolicy="no-referrer"
              />
              WhatsApp
            </a>
            <CallButton />
          </div>
        </div>
      </footer>

      {/* Mobile sticky action bar */}
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <a
          href={TEL}
          className="flex items-center justify-center gap-2 bg-gold py-4 text-sm font-medium text-primary"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-whatsapp py-4 text-sm font-medium text-whatsapp-foreground"
        >
          <img
            src={WHATSAPP_ICON}
            alt="WhatsApp"
            className="h-4 w-4 brightness-0 invert"
            referrerPolicy="no-referrer"
          />
          WhatsApp
        </a>
        <a
          href="#request"
          className="flex items-center justify-center gap-2 bg-navy-deep py-4 text-sm font-medium text-primary-foreground"
        >
          <CalendarDays className="h-4 w-4" /> Book
        </a>
      </nav>
    </div>
  );
}
