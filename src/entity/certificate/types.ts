export interface Certificate{
  id: string | null
  valid: boolean
  code: string | null
  amount: number | null
}

export interface CertificateState {
  certificate: Certificate
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}