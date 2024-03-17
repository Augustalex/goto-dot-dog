import { prisma } from "@/app/db/client";
import Rate from "./Rate";

export default async function RatePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const place = await prisma.place.findFirstOrThrow({
    where: {
      id: id,
    },
  });

  return <Rate place={place} />;
}
