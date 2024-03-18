"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { prisma } from "../../../db/client";

export async function addComment({
  placeId,
  score,
  comment,
}: {
  placeId: string;
  score: number;
  comment: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be signed in to add a comment");
  }
  const user = await currentUser();

  if (typeof placeId !== "string" || !placeId) {
    throw new Error("Invalid place ID");
  }

  if (typeof score !== "number" || score < 0 || score > 5) {
    throw new Error("Invalid score");
  }

  if (typeof comment !== "string" || comment.length > 500) {
    throw new Error("Comment is too long");
  }

  let displayName = user?.username ?? null;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  if (firstName && lastName) {
    displayName = `${firstName} ${lastName}`;
  } else if (firstName) {
    displayName = firstName;
  }

  const primaryEmailId = user?.primaryEmailAddressId;
  const email =
    user?.emailAddresses.find((email) => email.id === primaryEmailId)
      ?.emailAddress ||
    user?.emailAddresses[0]?.emailAddress ||
    null;

  await prisma.visit.create({
    data: {
      score,
      comment,
      authorId: userId,
      authorDisplayName: displayName,
      authorProfileUrl: user?.imageUrl || null,
      authorEmail: email,
      placeId,
    },
  });
}
