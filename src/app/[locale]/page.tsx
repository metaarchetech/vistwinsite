import { Hero } from "@/components/sections/Hero";
import { OneLiner } from "@/components/sections/OneLiner";
import { Capabilities } from "@/components/sections/Capabilities";
import { Position } from "@/components/sections/Position";
import { Architecture } from "@/components/sections/Architecture";
import { Surface } from "@/components/sections/Surface";
import { Standards } from "@/components/sections/Standards";
import { Industries } from "@/components/sections/Industries";
import { CTA } from "@/components/sections/CTA";

// Section order — narrative arc:
//
//   Tier 1 — opening, high-altitude, no ontology jargon yet
//   Hero            → who/what; platform-altitude tagline
//   OneLiner        → the thesis, abstract on purpose
//   Capabilities    → three operating layers
//
//   Tier 2 — proof we've already shipped this; broaden beyond architecture
//   Surface         → real screenshots from the live extension suite
//
//   Tier 3 — concrete middle: where we sit, what we're built on
//   Position        → vs the rest of the market
//   Standards       → technical alignment (EEWH / LEED / IFC / ISO / ASHRAE)
//
//   Tier 4 — climax, the Palantir-style "ontology in space" payoff,
//            deliberately system-general — not architecture-tied
//   Architecture    → DATA · LOGIC · SYSTEM — the three-step closing in space
//
//   Tier 5 — loop the abstract payoff back to concrete deployment surfaces,
//            then ask for action
//   Industries      → reasonable points of intervention
//                     (building mgmt / safety / smart factory / spatial AI)
//   CTA             → talk to us
//
// Why Industries lands AFTER Architecture: the climax is intentionally
// philosophical / system-general. Putting Industries right after it grounds
// the abstraction in concrete verticals before the CTA — "and here is
// where that idea actually plugs in." The reader's last beat is a list of
// places they could imagine hiring us into.
//
// Work (the roadmap) was removed from the homepage because (a) it restated
// Architecture's DATA / LOGIC / SYSTEM / SPATIAL labels with phase tags
// (visual repetition), and (b) the future-dated ETAs undercut Surface's
// "already running" signal right before the climax.
//
// /cases page was deleted — the homepage's nine-section narrative is the
// canonical surface. Header nav anchors instead point at the major sections
// (capabilities / surface / architecture / contact). The Work component file
// is left in place but no longer rendered anywhere.
export default function HomePage() {
  return (
    <>
      <Hero />
      <OneLiner />
      <Capabilities />
      <Surface />
      <Position />
      <Standards />
      <Architecture />
      <Industries />
      <CTA />
    </>
  );
}
