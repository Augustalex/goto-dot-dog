import { prisma } from "@/app/db/client";
import { auth } from "@clerk/nextjs";
import Comment from "./Comment";

export default async function CommentPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be signed in to add a comment");
  }

  const place = await prisma.place.findFirstOrThrow({
    where: {
      id,
    },
  });
  const existingComment = await prisma.visit.findFirst({
    where: {
      authorId: userId,
      placeId: id,
    },
  });

  return <Comment place={place} existingComment={existingComment} />;
}
