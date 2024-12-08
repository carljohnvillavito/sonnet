import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { prompt } = await req.json()
  const uid = '08062005' // You might want to generate this dynamically

  const response = await fetch(`https://kaiz-apis.gleeze.com/api/claude-sonnet-3.5?q=${encodeURIComponent(prompt)}&uid=${uid}`)
  const data = await response.json()

  return NextResponse.json(data)
}

