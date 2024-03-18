import { prisma } from "../db/client";
import AdminClient from "./AdminClient";

export default async function AdminHome() {
  const visits = await prisma.visit.findMany();

  return <AdminClient visits={visits} />;
}
