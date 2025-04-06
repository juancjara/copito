'use client'

import { trpc } from '../trpc/react'


export default function Home() {
  const { data } = trpc.hello.getUser.useQuery();
  console.log('data', data?.id)

  return (
    <div className="">
      <h1>Hello World</h1>
    </div>
  );
}
