interface Redirect {
  id: string,
  name: string,
  url: string
}

const redirects: Array<Redirect> = [
  {
    id: 'email',
    name: 'email',
    url: 'mailto:ping@giuliopime.dev'
  },
  {
    id: 'github',
    name: 'github',
    url: 'https://github.com/Giuliopime'
  },
  {
    id: 'medium',
    name: 'medium',
    url: 'https://medium.com/@giuliopime'
  },
  {
    id: 'instagram',
    name: 'instagram',
    url: 'https://www.instagram.com/giuliopimenoff'
  },
  {
    id: 'threads',
    name: 'threads',
    url: 'https://www.threads.com/@giuliopimenoff'
  },
  {
    id: 'twitter',
    name: 'twitter',
    url: 'https://x.com/giuliopime'
  }
]

export default redirects