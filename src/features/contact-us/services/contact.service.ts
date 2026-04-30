import type { ContactFormData } from '../types'

// Ready for Supabase:
// const { error } = await supabase.from('contact_messages').insert([data])
// if (error) throw error
export async function submitContactForm(data: ContactFormData): Promise<void> {
  await new Promise((res) => setTimeout(res, 900))
  console.log('Contact form submission:', data)
}
