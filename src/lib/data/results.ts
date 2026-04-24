import type { ResultEntry, RankingEntry, RegistrationEntry, NotificationItem } from "@/lib/types";

// Results from finished tournaments
export const results: ResultEntry[] = [
  { id: "r1", tournamentId: "t5", pilotId: "p4", placement: 1, bestLapMs: 18420, totalTimeMs: 142500, points: 100, dnf: false, dns: false },
  { id: "r2", tournamentId: "t5", pilotId: "p1", placement: 2, bestLapMs: 18600, totalTimeMs: 142680, points: 80, dnf: false, dns: false },
  { id: "r3", tournamentId: "t5", pilotId: "p3", placement: 3, bestLapMs: 18890, totalTimeMs: 144100, points: 65, dnf: false, dns: false },
  { id: "r4", tournamentId: "t5", pilotId: "p7", placement: 4, bestLapMs: 19120, totalTimeMs: 145900, points: 50, dnf: false, dns: false },
  { id: "r5", tournamentId: "t5", pilotId: "p2", placement: 5, bestLapMs: 19300, totalTimeMs: 146200, points: 40, dnf: false, dns: false },
  { id: "r6", tournamentId: "t5", pilotId: "p8", placement: 6, bestLapMs: 19450, totalTimeMs: 147800, points: 32, dnf: false, dns: false },
  { id: "r7", tournamentId: "t5", pilotId: "p5", placement: 7, bestLapMs: 19620, totalTimeMs: 148500, points: 26, dnf: false, dns: false },
  { id: "r8", tournamentId: "t5", pilotId: "p6", placement: 8, bestLapMs: 19800, totalTimeMs: 149400, points: 21, dnf: false, dns: false },
  { id: "r13", tournamentId: "t5", pilotId: "p12", placement: 9, bestLapMs: 20020, totalTimeMs: 150100, points: 18, dnf: false, dns: false },
  { id: "r14", tournamentId: "t5", pilotId: "p14", placement: 10, bestLapMs: 20140, totalTimeMs: 151220, points: 15, dnf: false, dns: false },
  { id: "r15", tournamentId: "t5", pilotId: "p15", placement: 11, bestLapMs: 20310, totalTimeMs: 152040, points: 12, dnf: false, dns: false },
  { id: "r16", tournamentId: "t5", pilotId: "p13", placement: 12, bestLapMs: 20560, totalTimeMs: 153800, points: 10, dnf: false, dns: false },
  { id: "r9", tournamentId: "t9", pilotId: "p1", placement: 1, bestLapMs: 17680, totalTimeMs: 136420, points: 90, dnf: false, dns: false },
  { id: "r10", tournamentId: "t9", pilotId: "p4", placement: 2, bestLapMs: 17810, totalTimeMs: 137150, points: 70, dnf: false, dns: false },
  { id: "r11", tournamentId: "t9", pilotId: "p8", placement: 3, bestLapMs: 17940, totalTimeMs: 138200, points: 55, dnf: false, dns: false },
  { id: "r12", tournamentId: "t9", pilotId: "p3", placement: 4, bestLapMs: 18020, totalTimeMs: 139080, points: 42, dnf: false, dns: false },
  { id: "r17", tournamentId: "t9", pilotId: "p10", placement: 5, bestLapMs: 18110, totalTimeMs: 139940, points: 34, dnf: false, dns: false },
  { id: "r18", tournamentId: "t9", pilotId: "p11", placement: 6, bestLapMs: 18240, totalTimeMs: 141100, points: 28, dnf: false, dns: false },
  { id: "r19", tournamentId: "t9", pilotId: "p16", placement: 7, bestLapMs: 18320, totalTimeMs: 142240, points: 24, dnf: false, dns: false },
  { id: "r20", tournamentId: "t9", pilotId: "p9", placement: 8, bestLapMs: 18490, totalTimeMs: 143820, points: 20, dnf: false, dns: false },
];

// Season ranking — sorted by points
export const ranking: RankingEntry[] = [
  { pilotId: "p1", rank: 1, previousRank: 1, points: 245, tournamentsPlayed: 4, wins: 2, podiums: 4, trend: 0 },
  { pilotId: "p4", rank: 2, previousRank: 4, points: 215, tournamentsPlayed: 3, wins: 2, podiums: 3, trend: 2 },
  { pilotId: "p3", rank: 3, previousRank: 2, points: 198, tournamentsPlayed: 4, wins: 1, podiums: 3, trend: -1 },
  { pilotId: "p2", rank: 4, previousRank: 3, points: 172, tournamentsPlayed: 4, wins: 0, podiums: 2, trend: -1 },
  { pilotId: "p8", rank: 5, previousRank: 6, points: 156, tournamentsPlayed: 3, wins: 0, podiums: 2, trend: 1 },
  { pilotId: "p7", rank: 6, previousRank: 8, points: 142, tournamentsPlayed: 3, wins: 0, podiums: 2, trend: 2 },
  { pilotId: "p5", rank: 7, previousRank: 5, points: 128, tournamentsPlayed: 3, wins: 0, podiums: 1, trend: -2 },
  { pilotId: "p6", rank: 8, previousRank: 7, points: 121, tournamentsPlayed: 4, wins: 0, podiums: 1, trend: -1 },
  { pilotId: "p10", rank: 9, previousRank: 11, points: 109, tournamentsPlayed: 3, wins: 0, podiums: 1, trend: 2 },
  { pilotId: "p11", rank: 10, previousRank: 9, points: 104, tournamentsPlayed: 4, wins: 0, podiums: 1, trend: -1 },
  { pilotId: "p16", rank: 11, previousRank: 14, points: 97, tournamentsPlayed: 2, wins: 0, podiums: 1, trend: 3 },
  { pilotId: "p9", rank: 12, previousRank: 10, points: 92, tournamentsPlayed: 3, wins: 0, podiums: 0, trend: -2 },
  { pilotId: "p14", rank: 13, previousRank: 15, points: 84, tournamentsPlayed: 2, wins: 0, podiums: 0, trend: 2 },
  { pilotId: "p12", rank: 14, previousRank: 12, points: 79, tournamentsPlayed: 2, wins: 0, podiums: 0, trend: -2 },
  { pilotId: "p15", rank: 15, previousRank: 16, points: 73, tournamentsPlayed: 2, wins: 0, podiums: 0, trend: 1 },
  { pilotId: "p13", rank: 16, previousRank: null, points: 58, tournamentsPlayed: 1, wins: 0, podiums: 0, trend: 0 },
];

// Registrations for current user (assume logged-in pilot is p7 / Blitz)
export const registrations: RegistrationEntry[] = [
  {
    id: "reg1",
    tournamentId: "t1",
    pilotId: "p7",
    status: "approved",
    submittedAt: "2026-03-16T11:24:00+03:00",
    decidedAt: "2026-03-17T09:10:00+03:00",
  },
  {
    id: "reg2",
    tournamentId: "t2",
    pilotId: "p7",
    status: "pending",
    submittedAt: "2026-04-04T18:50:00+03:00",
  },
  {
    id: "reg3",
    tournamentId: "t5",
    pilotId: "p7",
    status: "approved",
    submittedAt: "2026-01-04T12:30:00+03:00",
    decidedAt: "2026-01-05T10:00:00+03:00",
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "no1",
    userId: "p7",
    type: "registration_approved",
    title: "Заявка подтверждена",
    body: "Ваша заявка на Spring Cup 2026 подтверждена организатором.",
    link: "/tournaments/spring-cup-2026",
    readAt: null,
    createdAt: "2026-03-17T09:10:00+03:00",
  },
  {
    id: "no2",
    userId: "p7",
    type: "tournament_upcoming",
    title: "Турнир скоро начнётся",
    body: "Night Grand Prix стартует через 7 дней. Проверьте детали.",
    link: "/tournaments/night-grand-prix",
    readAt: null,
    createdAt: "2026-04-15T08:00:00+03:00",
  },
  {
    id: "no3",
    userId: "p7",
    type: "result_published",
    title: "Опубликованы результаты",
    body: "Winter Indoor Championship: ваше место — 4. +50 очков в сезонный рейтинг.",
    link: "/tournaments/winter-indoor-2026",
    readAt: "2026-02-09T13:20:00+03:00",
    createdAt: "2026-02-09T12:05:00+03:00",
  },
];

export function getResultsForTournament(tournamentId: string): ResultEntry[] {
  return results.filter((r) => r.tournamentId === tournamentId).sort((a, b) => a.placement - b.placement);
}

export function getResultsForPilot(pilotId: string): ResultEntry[] {
  return results.filter((r) => r.pilotId === pilotId);
}

export function getRegistrationForUser(pilotId: string, tournamentId: string) {
  return registrations.find((r) => r.pilotId === pilotId && r.tournamentId === tournamentId);
}
