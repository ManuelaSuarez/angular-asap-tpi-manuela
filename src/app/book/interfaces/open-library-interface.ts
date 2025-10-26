export interface IOpenLibraryResponse {
  numFound: number
  start: number
  docs: {
    key: string
    title: string
    author_name?: string[]
    first_publish_year?: number
    cover_i?: number
  }[]
}

export interface IOpenLibraryWorkResponse {
  description?: string | { type: string; value: string }
  first_sentence?: string | { type: string; value: string }
}