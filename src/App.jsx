import React, { useEffect, useState } from 'react'

export default function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/api/members')
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div>
      <h1>Members</h1>
      {data.map(m => <div key={m.id}>{m.name}</div>)}
    </div>
  )
}
