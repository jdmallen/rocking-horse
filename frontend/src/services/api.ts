import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8055'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export interface NewsItem {
  id: number
  title: string
  date: string
  excerpt: string
  image: string
  link: string
}

export interface Show {
  id: number
  title: string
  description: string
  dates: string[]
  image: string
  ticketLink: string
}

export interface Member {
  id: number
  name: string
  level: string
  company?: string
  image?: string
}

export interface GalleryItem {
  id: number
  season: string
  title: string
  images: string[]
  video?: string
}

export const apiService = {
  // News
  async getNews(page: number = 1, limit: number = 6): Promise<NewsItem[]> {
    const response = await api.get('/items/news', {
      params: {
        page,
        limit,
        sort: '-date'
      }
    })
    return response.data.data
  },

  // Shows
  async getCurrentShows(): Promise<Show[]> {
    const response = await api.get('/items/shows', {
      params: {
        filter: {
          status: {
            _eq: 'current'
          }
        }
      }
    })
    return response.data.data
  },

  // Members
  async getMembers(): Promise<Member[]> {
    const response = await api.get('/items/members', {
      params: {
        sort: 'level'
      }
    })
    return response.data.data
  },

  // Gallery
  async getGalleryItems(): Promise<GalleryItem[]> {
    const response = await api.get('/items/gallery', {
      params: {
        sort: '-season'
      }
    })
    return response.data.data
  }
}

export default apiService 
