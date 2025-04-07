'use client'

import { trpc } from '../trpc/react'


export default function Home() {
  const { data } = trpc.recordings.getAll.useQuery();
  console.log("data", data?.[0]?.fileName);

  return (
    <div className="">
      <h1>Hello World</h1>
    </div>
  );
}
