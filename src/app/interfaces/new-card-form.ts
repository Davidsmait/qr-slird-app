export interface NewCardForm {
  image: string
  email?: string
  location?: string
  number?: number | string | null
  templateId?: string | number
  whatsapp?: string
}
