import type { SectionId } from "./types";

export interface SectionDef {
  id: SectionId;
  name: string;
  shortName: string;
  description: string;
  leadQuestion: string;
  examples: string;
}

export const SECTIONS: SectionDef[] = [
  {
    id: 1,
    name: "Visual and Layout",
    shortName: "Visual",
    description:
      "Currency display, iconography, text direction (RTL/LTR), typography conventions, color associations, visual trust signals.",
    leadQuestion:
      "When you look at a product built for this market, what visual choices immediately tell you whether the team actually knows the market?",
    examples:
      "e.g., currency formatting, color meanings, icon conventions, layout direction",
  },
  {
    id: 2,
    name: "Trust and Identity",
    shortName: "Trust",
    description:
      "How do users decide whether to trust a product, a seller, or a platform? What identity documents or signals matter?",
    leadQuestion:
      "How do users in this market decide whether to trust a product or a seller? What's the local equivalent of 'showing your business license'?",
    examples:
      "e.g., trust badges, verification flows, identity documents, social proof patterns",
  },
  {
    id: 3,
    name: "Payments and Commerce",
    shortName: "Payments",
    description:
      "Local payment methods, pricing display conventions, installment expectations, digital wallets, cash-on-delivery norms.",
    leadQuestion:
      "What payment methods are absolute table stakes in this market? Not 'nice to have' — if you don't support these, users will bounce.",
    examples:
      "e.g., local payment rails, installment culture, cash vs digital, pricing display",
  },
  {
    id: 4,
    name: "Communication Patterns",
    shortName: "Comms",
    description:
      "Primary messaging platforms, customer support expectations, tone and formality norms, platform leakage dynamics.",
    leadQuestion:
      "What's the dominant communication channel in this market? Not email — what do people actually use?",
    examples:
      "e.g., WhatsApp, LINE, WeChat, SMS norms, support expectations, formality level",
  },
  {
    id: 5,
    name: "Forms and Data Collection",
    shortName: "Forms",
    description:
      "Name formats, address conventions, phone number formats, national ID numbers, data entry expectations.",
    leadQuestion:
      "What breaks when you use a standard Western form in this market? Think name formats, addresses, phone numbers, national IDs.",
    examples:
      "e.g., name ordering, address structure, national IDs, phone formats",
  },
  {
    id: 6,
    name: "Connectivity and Performance",
    shortName: "Connectivity",
    description:
      "Device landscape, network conditions, data cost sensitivity, offline patterns.",
    leadQuestion:
      "What devices and network conditions are you designing for in this market?",
    examples:
      "e.g., dominant device types, network speeds, data costs, offline-first patterns",
  },
  {
    id: 7,
    name: "Legal and Compliance",
    shortName: "Legal",
    description:
      "Data protection laws, consumer protection rules, content regulations, accessibility requirements.",
    leadQuestion:
      "What legal or compliance requirements catch foreign companies off guard in this market?",
    examples:
      "e.g., data residency, consumer protection, content rules, tax requirements",
  },
  {
    id: 8,
    name: "Social and Cultural UX",
    shortName: "Social",
    description:
      "Social dynamics, cultural calendar, gender/class/race considerations, community patterns, sharing behavior.",
    leadQuestion:
      "What social or cultural dynamics affect how users interact with products in this market?",
    examples:
      "e.g., cultural holidays, social hierarchies, sharing patterns, taboos",
  },
];

export const DOMAIN_TO_SECTIONS: Record<string, SectionId[]> = {
  "Payments and commerce": [3],
  "UX and visual design": [1, 8],
  "Legal and compliance": [7],
  "Trust and identity": [2],
  "Forms and data collection": [5],
  "Communication patterns": [4],
  "Connectivity and performance": [6],
  "Social and cultural dynamics": [8],
};
