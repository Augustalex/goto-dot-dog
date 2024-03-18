"use client";

import type { Visit } from "@prisma/client";
import { removeVisit } from "./actions/visits";

export default function AdminClient({ visits }: { visits: Visit[] }) {
  return (
    <div>
      <h1>Admin commands</h1>

      <div>
        <h2>Comments</h2>
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="w-512px rounded-xl border-2 border-black p-3"
          >
            <div>
              <h3>Author id: {visit.id}</h3>
              <h3>Author name: {visit.authorDisplayName}</h3>
              <h3>Author email: {visit.authorEmail}</h3>
              <h3>Score: {visit.score}</h3>
              <div>
                <h4>Comment:</h4>
                <p>{visit.comment}</p>
              </div>
            </div>
            <div>
              <button
                className="btn m-2"
                onClick={async () => {
                  await removeVisit(visit.id);
                  window.location.reload();
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
