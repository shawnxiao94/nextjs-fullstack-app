"use client";

import Title from "@/components/Title";

export default function Home() {
  return (
    <div className="root">
      <div className="home">
        <Title />
        <h2 className="description">{process.env.NEXT_PUBLIC_DESCRIPTION}</h2>
        {/* <Down /> */}
      </div>
      <div className="bottom">
        {/* <Article />
        <Profile /> */}
      </div>
    </div>
  );
}
