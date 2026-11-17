export type GalleryCategory = 'hackatones' | 'ponencias' | 'talleres' | 'comunidad'

export type GalleryShape = 'landscape' | 'portrait' | 'square' | 'tall'

export interface GalleryPhoto {
  src: string
  alt: string
  event: string
  year: number | null
  category: GalleryCategory
  shape?: GalleryShape
}

export const galleryCategories: Array<{ key: GalleryCategory, label: string }> = [
  { key: 'hackatones', label: 'Hackatones' },
  { key: 'ponencias', label: 'Ponencias' },
  { key: 'talleres', label: 'Talleres' },
  { key: 'comunidad', label: 'Comunidad' },
]

export const galleryPhotos: GalleryPhoto[] = [
  { src: '/images/galeria/foto-01.jpg', alt: '', event: '', year: null, category: 'hackatones' },
  { src: '/images/galeria/foto-02.jpg', alt: '', event: '', year: null, category: 'ponencias' },
  { src: '/images/galeria/foto-03.jpg', alt: '', event: '', year: null, category: 'talleres' },
  { src: '/images/galeria/foto-04.jpg', alt: '', event: '', year: null, category: 'comunidad' },
  { src: '/images/galeria/foto-05.jpg', alt: '', event: '', year: null, category: 'hackatones' },
  { src: '/images/galeria/foto-06.jpg', alt: '', event: '', year: null, category: 'ponencias' },
  { src: '/images/galeria/foto-07.jpg', alt: '', event: '', year: null, category: 'talleres' },
  { src: '/images/galeria/foto-08.jpg', alt: '', event: '', year: null, category: 'comunidad' },
  { src: '/images/galeria/foto-09.jpg', alt: '', event: '', year: null, category: 'hackatones' },
  { src: '/images/galeria/foto-10.jpg', alt: '', event: '', year: null, category: 'ponencias' },
  { src: '/images/galeria/foto-11.jpg', alt: '', event: '', year: null, category: 'talleres' },
  { src: '/images/galeria/foto-12.jpg', alt: '', event: '', year: null, category: 'comunidad' },
]
