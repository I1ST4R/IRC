export interface Certificate{
  valid: boolean
  code: string | null
  amount: number | null
}

export interface CertificateState {
  certificate: Certificate
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}