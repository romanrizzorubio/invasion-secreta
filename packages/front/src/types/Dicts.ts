export const PhaseDict = {
  INIT: 0,
  TABLES: 1,
  SUPER: 2,
  SUPER_DEFEATED: 3,
  SUPER_WINER: 4,
  SPIDER_WOMAN_LEAVES: 5,
  SHIP_FALL: 6,
  SHIP_OPEN: 7,
  ENEMY: 8,
  OSBORN_REVEAL: 9,
  VERANKE_LOSE: 10,
  VERANKE_WIN: 11,
} as const;
export type Phase = (typeof PhaseDict)[keyof typeof PhaseDict];

export const PanelTypeDict = {
  SUPER: 0,
  SUPER_PLAN: 1,
  SUPER_DEFEATED: 2,
  SUPER_WINER: 3,
  SPIDER_WOMAN_LEAVES: 4,
  VERANKE: 5,
  SHIP_FALL: 6,
  SHIP_OPEN: 7,
  ENEMY: 8,
  QUEEN: 9,
  EXPOSED: 10,
  OSBORN: 11,
  UATU: 12,
  ARON: 13,
} as const;
export type PanelType = (typeof PanelTypeDict)[keyof typeof PanelTypeDict];

export const StatusBarDict = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
} as const;
export type StatusBar = (typeof StatusBarDict)[keyof typeof StatusBarDict];

export const SizeDict = {
  S: 0,
  M: 1,
  L: 2,
} as const;
export type Size = (typeof SizeDict)[keyof typeof SizeDict];
