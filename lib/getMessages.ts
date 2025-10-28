import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'

const validLocales = ['en', 'de']

export async function getMessages (locale: string) {
  // Validate locale first
  if (!validLocales.includes(locale)) {
    console.warn(`Invalid locale requested: ${locale}`)
    notFound()
  }

  const messagesDir = path.join(process.cwd(), 'messages', locale)
  
  if (!fs.existsSync(messagesDir)) {
    throw new Error(`Messages directory not found: ${messagesDir}`)
  }

  const messages: Record<string, any> = {}
  const files = fs.readdirSync(messagesDir)
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const key = file.replace('.json', '')
      const filePath = path.join(messagesDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      messages[key] = JSON.parse(fileContent)
    }
  }
  
  console.log(`Loaded messages for locale ${locale}`, Object.keys(messages))
  return messages
}