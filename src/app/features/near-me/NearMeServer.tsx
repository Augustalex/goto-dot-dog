import { prisma } from "../../db/client";
import { NearMe } from "./NearMe";

export async function NearMeServer() {
  const placesFromPrisma = await prisma.place.findMany({
    where: {
      allowsDogs: "yes",
    },
  });
  return <NearMe places={placesFromPrisma} />;
}
