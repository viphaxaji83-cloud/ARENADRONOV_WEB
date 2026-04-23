export type UserRole = "guest" | "participant" | "admin";

export type TournamentStatus =
  | "draft"
  | "published"
  | "registration_open"
  | "registration_closed"
  | "ongoing"
  | "finished"
  | "cancelled";

export type TournamentFormat = "time_trial" | "elimination" | "round_robin" | "mixed";
export type Discipline = "freestyle_race" | "multi_class" | "class_5inch" | "cinewhoop" | "tinywhoop";

export type RegistrationStatus = "pending" | "approved" | "rejected" | "waitlist" | "cancelled";

export type HeatStatus = "scheduled" | "running" | "finished" | "cancelled";

export type NewsStatus = "draft" | "published";

export type NotificationType =
  | "registration_approved"
  | "registration_rejected"
  | "tournament_upcoming"
  | "result_published"
  | "news_digest";

export interface Pilot {
  id: string;
  handle: string;
  displayName: string;
  avatarUrl: string;
  country: string;
  countryCode: string;
  city: string;
  teamName?: string;
  bio: string;
  classPrefs: Discipline[];
  socials: {
    youtube?: string;
    instagram?: string;
    telegram?: string;
  };
  joinedAt: string;
}

export interface Tournament {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  coverUrl: string;
  description: string;
  rules: string;
  format: TournamentFormat;
  discipline: Discipline;
  location: string;
  startsAt: string;
  endsAt: string;
  registrationOpensAt: string;
  registrationClosesAt: string;
  maxParticipants: number;
  seatsTaken: number;
  status: TournamentStatus;
  seasonId: string;
  organizerName: string;
  prizePool?: string;
  entryFee?: string;
}

export interface Heat {
  id: string;
  tournamentId: string;
  round: number;
  label: string;
  scheduledAt: string;
  status: HeatStatus;
  pilotIds: string[];
}

export interface ResultEntry {
  id: string;
  tournamentId: string;
  pilotId: string;
  placement: number;
  bestLapMs: number | null;
  totalTimeMs: number | null;
  points: number;
  dnf: boolean;
  dns: boolean;
}

export interface RankingEntry {
  pilotId: string;
  rank: number;
  previousRank: number | null;
  points: number;
  tournamentsPlayed: number;
  wins: number;
  podiums: number;
  trend: number;
}

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string;
  body: string;
  tags: string[];
  status: NewsStatus;
  publishedAt: string;
  authorName: string;
  relatedTournamentId?: string;
}

export interface RegistrationEntry {
  id: string;
  tournamentId: string;
  pilotId: string;
  status: RegistrationStatus;
  submittedAt: string;
  decidedAt?: string;
  notes?: string;
  waitlistPosition?: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  link?: string;
  readAt: string | null;
  createdAt: string;
}

export interface Season {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
}
