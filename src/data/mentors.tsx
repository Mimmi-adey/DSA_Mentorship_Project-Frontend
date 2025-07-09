export interface Mentor {
  name: string
  field: string
  img: string
}

export const featuredMentors: Mentor[] = [
  {
    name: 'Dr. Jane Doe',
    field: 'AI Researcher',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Mr. John Smith',
    field: 'Fullstack Developer',
    img: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Prof. Grace Lin',
    field: 'Biotech Expert',
    img: 'https://randomuser.me/api/portraits/women/46.jpg',
  },
]