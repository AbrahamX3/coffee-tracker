import { BuildingIcon } from "lucide-react";
import { api } from "~/trpc/react";

export function RoastersFilter() {
  const test =
    api.roaster.getAll.useQuery().data?.map((roaster) => ({
      value: roaster.id,
      label: roaster.name,
      icon: BuildingIcon,
    })) ?? [];

  return test;
}
