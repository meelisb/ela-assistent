import { useState } from "react";
import { Book } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Source {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  url: string;
  topics: string[];
  note: string | null;
  highlight: boolean;
}

const sources: Source[] = [
  {
    id: "ela-vormi",
    category: "ELA ametlikud dokumendid",
    title: "Kirjalike tööde vormistamise juhend",
    subtitle: "Eesti Lennuakadeemia, veebruar 2026",
    url: "https://media.voog.com/0000/0044/7474/files/Kirjalike_toode_vormistamise_juhend_09.02.2026.pdf",
    topics: ["Lehekülje formaat ja kirjastiil", "APA viitamisstiil", "IEEE viitamisstiil", "Tabelid ja joonised", "Tehisaru viitamine", "Lõputöö struktuur"],
    note: "Peamine kohustuslik dokument kõigi ELA üliõpilaste jaoks.",
    highlight: false,
  },
  {
    id: "ela-uurimis",
    category: "ELA ametlikud dokumendid",
    title: "Uurimistöö koostamise abimaterjal",
    subtitle: "Ganina, Tootsi, Vilimas — Eesti Lennuakadeemia",
    url: "https://sites.google.com/eava.ee/uurimist-koostamise-abimaterja/uurimist%C3%B6%C3%B6-koostamine",
    topics: ["10-sammuline uurimisprotsess", "Uurimisprobleem ja eesmärk", "Uurimisküsimused ja hüpoteesid", "Teoreetilise ülevaate koostamine", "Metoodika valik", "Sissejuhatus ja kokkuvõte"],
    note: "Samm-sammuline juhend lõputöö protsessi läbimiseks.",
    highlight: false,
  },
  {
    id: "ela-eetika",
    category: "ELA ametlikud dokumendid",
    title: "Akadeemiline eetika uurimistöös",
    subtitle: "Eesti Lennuakadeemia",
    url: "https://sites.google.com/eava.ee/uurimist-koostamise-abimaterja/akadeemiline-eetika",
    topics: ["Plagiaat ja selle liigid", "Plagiaadituvastussüsteem", "Teavitatud nõusolek", "Andmekaitse uuringutes", "Viitamiskohustus"],
    note: null,
    highlight: false,
  },
  {
    id: "ela-juhendaja",
    category: "ELA ametlikud dokumendid",
    title: "Koostöö juhendaja ja konsultandiga",
    subtitle: "Eesti Lennuakadeemia",
    url: "https://sites.google.com/eava.ee/uurimist-koostamise-abimaterja/koost%C3%B6%C3%B6-juhendaja-ja-konsultandiga",
    topics: ["Mida juhendaja teeb", "Mida juhendaja ei tee", "Üliõpilase iseseisvus", "Tähtaegade pidamine"],
    note: null,
    highlight: false,
  },
  {
    id: "ela-ti",
    category: "ELA ametlikud dokumendid",
    title: "Tehisaru kasutamine õppetöös",
    subtitle: "Eesti Lennuakadeemia",
    url: "https://lennuakadeemia.ee/oppimine/digiope/tehisaru-kasutamine",
    topics: ["Lubatav ja keelatud kasutus", "Tehisarule viitamine APA ja IEEE järgi", "Kriitiline hindamine", "Privaatsus ja isikuandmed"],
    note: null,
    highlight: false,
  },
  {
    id: "tu-teadustekst",
    category: "Tartu Ülikooli materjalid",
    title: "Akadeemiliste tekstide kirjutamine",
    subtitle: "Miilman jt — Tartu Ülikool",
    url: "https://www.teadustekst.ut.ee",
    topics: ["Protsessikeskne kirjutamine", "Kavandamine ja ideekaardistamine", "Mustandi kirjutamine", "Tagasiside andmine ja saamine", "Teksti viimistlemine", "Allikatega töötamine", "Sissejuhatuse kirjutamine", "Kokkuvõtte kirjutamine"],
    note: "Põhjalik eestikeelne õpik kirjutamisprotsessist. Väga soovitatav.",
    highlight: true,
  },
  {
    id: "tu-samm",
    category: "Tartu Ülikooli materjalid",
    title: "Sotsiaalse analüüsi meetodite õpibaas (SAMM)",
    subtitle: "Tartu Ülikool",
    url: "https://samm.ut.ee",
    topics: ["Kvalitatiivne vs kvantitatiivne uurimine", "Valimi moodustamine", "Valiidsus ja reliaablus", "Intervjuu ja küsitlus", "Vaatlus ja juhtumiuuring", "Andmeanalüüs"],
    note: "Sobib eelkõige sotsiaalteaduslike uuringute jaoks.",
    highlight: false,
  },
  {
    id: "vihalem",
    category: "Lisaressurss",
    title: "Tähelepanekuid lõputööde eksimustest",
    subtitle: "Ann Vihalem — TalTech",
    url: "https://haldus.taltech.ee/sites/default/files/2019-09/Loputoo_vead%20%281%29.pdf",
    topics: ["Hiline startimine", "Referaadi pakkumine analüüsi asemel", "Oma arvamuse puudumine", "Teooria ja praktika mitteseostamine", "Kehv kokkuvõte", "Kaitsekõne vead"],
    note: "Praktiliste nõuannete kogumik sagedasemate vigade vältimiseks.",
    highlight: true,
  },
];

const categoryOrder = [
  "ELA ametlikud dokumendid",
  "Tartu Ülikooli materjalid",
  "Lisaressurss",
];

const categoryColors: Record<string, {
  accent: string;
  badge: string;
  badgeText: string;
  headerBorder: string;
  border: string;
}> = {
  "ELA ametlikud dokumendid": {
    accent: "#93c5fd",
    badge: "#dbeafe",
    badgeText: "#1e40af",
    headerBorder: "#60a5fa",
    border: "#bfdbfe",
  },
  "Tartu Ülikooli materjalid": {
    accent: "#86efac",
    badge: "#dcfce7",
    badgeText: "#15803d",
    headerBorder: "#4ade80",
    border: "#bbf7d0",
  },
  "Lisaressurss": {
    accent: "#fcd34d",
    badge: "#fef3c7",
    badgeText: "#92400e",
    headerBorder: "#fbbf24",
    border: "#fde68a",
  },
};

function SourceCard({ source }: { source: Source }) {
  const [open, setOpen] = useState(false);
  const colors = categoryColors[source.category];

  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid " + (open ? colors.border : "#e5e7eb"),
      borderRadius: 8,
      marginBottom: 8,
      overflow: "hidden",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: "12px 14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <span style={{
          marginTop: 3,
          color: colors.accent,
          fontSize: 9,
          flexShrink: 0,
          display: "inline-block",
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.2s",
        }}>
          {"\u25B6"}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: "#111827", lineHeight: 1.4 }}>
              {source.title}
            </span>
            {source.highlight && (
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                background: colors.badge,
                color: colors.badgeText,
                padding: "1px 6px",
                borderRadius: 3,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}>
                Soovitatav
              </span>
            )}
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
            {source.subtitle}
          </div>
        </div>
      </button>

      {open && (
        <div style={{ padding: "0 14px 14px 36px" }}>
          {source.note && (
            <p style={{
              fontSize: 12,
              color: "#4b5563",
              marginBottom: 10,
              lineHeight: 1.6,
              fontStyle: "italic",
              marginTop: 0,
            }}>
              {source.note}
            </p>
          )}
          <div style={{ marginBottom: 12 }}>
            <div style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#9ca3af",
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>
              Kaetud teemad
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {source.topics.map((t) => (
                <span key={t} style={{
                  fontSize: 11,
                  background: colors.badge,
                  color: colors.badgeText,
                  padding: "3px 8px",
                  borderRadius: 12,
                  fontWeight: 500,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              fontWeight: 600,
              color: colors.accent,
              textDecoration: "none",
              padding: "6px 12px",
              border: "1.5px solid " + colors.accent,
              borderRadius: 6,
            }}
          >
            Ava allikas
          </a>
        </div>
      )}
    </div>
  );
}

export function SourcesSidebar() {
  const [search, setSearch] = useState("");

  const filtered = sources.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(search.toLowerCase()) ||
    s.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const grouped = categoryOrder.reduce<Record<string, Source[]>>((acc, cat) => {
    const items = filtered.filter((s) => s.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Book className="w-5 h-5 flex-shrink-0" />
          <span className="font-semibold group-data-[collapsible=icon]:hidden">
            Allikad ja juhendid
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 group-data-[collapsible=icon]:hidden">
          Vestlusroboti teadmistebaas. Klõpsa allikal, et näha teemasid ja avada originaaldokument.
        </p>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-3 pb-2 group-data-[collapsible=icon]:hidden">
          <Input
            type="text"
            placeholder="Otsi teemat (nt APA, metoodika, plagiaat)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 text-xs"
          />
        </div>
        <ScrollArea className="flex-1 group-data-[collapsible=icon]:hidden">
          <div className="px-3 pb-3">
            {Object.entries(grouped).map(([cat, items]) => {
              const colors = categoryColors[cat];
              return (
                <div key={cat} style={{ marginBottom: 20 }}>
                  <div style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: colors.accent,
                    marginBottom: 8,
                    paddingBottom: 5,
                    borderBottom: "2px solid " + colors.headerBorder,
                  }}>
                    {cat}
                  </div>
                  {items.map((s) => (
                    <SourceCard key={s.id} source={s} />
                  ))}
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div style={{
                textAlign: "center",
                padding: "32px 0",
                color: "#9ca3af",
                fontSize: 13,
              }}>
                Ühtegi allikat ei leitud.
              </div>
            )}

            <div style={{
              marginTop: 8,
              padding: "10px 12px",
              background: "#f3f4f6",
              borderRadius: 7,
              fontSize: 11,
              color: "#6b7280",
              lineHeight: 1.6,
            }}>
              Küsi julgelt vestlusrobotilt — ta viitab samadele materjalidele ja annab näiteid.
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
