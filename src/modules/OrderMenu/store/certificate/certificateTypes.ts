export interface Certificate{
  id: string | null
  valid: boolean
  code: string | null
  discount: number | null
}

export interface CertificateState {
  certificate: Certificate
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}