import { eq, desc } from "drizzle-orm";
import { db } from "../db/connection.js";
import { recordings } from "../db/schema/recordings.js";

const getAll = async () => {
  return db.select().from(recordings).orderBy(desc(recordings.createdAt));
};

const create = async ({
  radioName,
  streamUrl,
  fileName,
}: {
  radioName: string;
  streamUrl: string;
  fileName: string;
}) => {
  return db.insert(recordings).values({
    radioName,
    streamUrl,
    fileName,
  });
};

const updateById = async (
  id: number,
  {
    status,
    duration,
    size,
  }: {
    status: "pending" | "processing" | "completed" | "failed";
    duration?: number;
    size?: number;
  }
) => {
  return db
    .update(recordings)
    .set({
      status,
      duration,
      size,
    })
    .where(eq(recordings.id, id));
};

export const recordingsService = {
  getAll,
  create,
  updateById,
};
