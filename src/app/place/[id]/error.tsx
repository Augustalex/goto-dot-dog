"use client";

import Image from "next/image";

export default function Error() {
  return (
    <center>
      <Image src="/sad_goto.png" width="512" height="512" alt="Sad Goto" />
      <h1 style={{ marginBottom: "24px", fontSize: "42px" }}>
        {"Can't find what you are looking for"}
      </h1>
    </center>
  );
}
