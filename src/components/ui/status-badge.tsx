import {
  tournamentStatusLabel,
  tournamentStatusVariant,
  registrationStatusLabel,
  registrationStatusVariant,
} from "@/lib/labels";
import type { TournamentStatus, RegistrationStatus } from "@/lib/types";
import { Badge } from "./badge";

export function TournamentStatusBadge({ status }: { status: TournamentStatus }) {
  return (
    <Badge variant={tournamentStatusVariant[status]} dot>
      {tournamentStatusLabel[status]}
    </Badge>
  );
}

export function RegistrationStatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <Badge variant={registrationStatusVariant[status]} dot>
      {registrationStatusLabel[status]}
    </Badge>
  );
}
