import Image from 'next/image'
'use client';

import { observer } from 'mobx-react-lite'
import CounterStore from '@/store'

function Home() {
  const val = CounterStore.count
  return (
    <main className="">
      <h2>Main</h2>
      <button onClick={CounterStore.increment}>+</button>
      <h6>{val}</h6>
      <button onClick={CounterStore.decrement}>-</button>
    </main>
  )
}

export default observer(Home)