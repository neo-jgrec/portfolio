import React, { useState } from "react";
import { vhsFilter } from "@components";

export default function Home() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className="fixed object-cover w-full h-full top-0 left-0 z-0"
        style={{ filter: vhsFilter }}
      >
        <source src="main_video.mp4" type="video/mp4" />
      </video>
    </>
  );
}
