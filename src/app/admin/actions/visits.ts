"use server";

import { prisma } from "@/app/db/client";

export async function removeVisit(id: number) {
  await prisma.visit.delete({
    where: {
      id,
    },
  });
}
