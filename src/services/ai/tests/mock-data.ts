import { Category } from "../ai.service.model";
import { IMG_0405, IMG_0406, IMG_0410, IMG_0411, IMG_0413, IMG_0416, IMG_0418 } from "./images.const";

export const token ="eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyOjQ5OjQzOjI1Ojc4OjNmOmY1OjRiOjlmOjk4OjA3OmZiOjAzOjQ3OjM2OjAxIiwidHlwIjoiSldUIn0.eyJhdWQiOlsiZHJuLWFwaS10cyJdLCJhenAiOiJlNmVmYTFjMDYzMGY0MjM5OTNlNDBjZTk3ZjhkZDQxMiIsImV4cCI6MTcyNzAwNDUwNCwiZ3R5IjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJpYXQiOjE3MjY5MTgxMDQsImlzcyI6Imh0dHBzOi8vYXV0aC5kaXNjcmVzY3VlbmV0d29yay5jb20iLCJqdGkiOiI3YTcyYzRkMi05NjY0LTQwMzgtYWM0ZC1mMjM4YTE0Y2VkZDUiLCJzY29wZSI6IiIsInNjcCI6W10sInYiOiIyIn0.MH4WKWSLgrQaqbHIMjrCjrmKz69cTKThCXu8TSb3kKHAd33K922C8rvQuV7eUcFHCbflA43oqx_bEqVUUwKUPojuTTfIhOTLFMFkAZoRvE6Gs0BPx8diNjHJbpLR-fSe0JwoSFbxjhVhcJK0x6QDGojX80Mz5X_skRKW_p0Y3vrXiPitYdGDrw-N6L4pSAJ8GljuECI5HOazLI4C9OZR5qb_uuzjznFHcn2FNkpOf_HdzHbVtO37lsVPqaOJEB74h_4f-pU-eXzX48POOGtsLoS2xVERXdNlI4jXGlZDB8oPnzSpUp0txBbymnQQ9U5JEA9Q_k7gjo3SdWpeKhMBQA";


export const mockData = [
  {
    label: 'Test Case  IMG_0405.jpg',
    image: IMG_0405,
   expectedResults: [
    {
      word: 'MVP Disc Sports',
      category: Category.BRAND
    }
  ]
  }, 
  {
    label: 'Test Case  IMG_0406.jpg',
    image:IMG_0406,
   expectedResults: [
    {
      word: 'Volt',
      category: Category.Disc
    },
    {
      word: '609-955-4266',
      category: Category.PHONE_NUMBER
    },
    {
      word: /^[\d\W]+$/,
      category: Category.PHONE_NUMBER
    }
  ]
  },
  {
    label: 'Test Case  IMG_0418.jpg',
    image:IMG_0418,
   expectedResults: [
    {
      word: '609-455-4266',
      category: Category.PHONE_NUMBER
    },
    {
      word: /^[\d\W]+$/,
      category: Category.PHONE_NUMBER
    }
  ]
  }, 
  {
    label: 'Test Case  IMG_0413.jpg',
    image:IMG_0413,
   expectedResults: [
    {
      word: '609-955-4266',
      category: Category.PHONE_NUMBER
    },
    {
      word: /^[\d\W]+$/,
      category: Category.PHONE_NUMBER
    }
  ]
  }, 
  {
    label: 'Test Case  IMG_0411.jpg',
    image:IMG_0411,
   expectedResults: [
    {
      word: '609-955-4266',
      category: Category.PHONE_NUMBER
    },
    {
      word: /^[\d\W]+$/,
      category: Category.PHONE_NUMBER
    }
  ]
  }, 
  {
    label: 'Test Case  IMG_0410.jpg',
    image:IMG_0410,
   expectedResults: [
    {
      word: 'Relay',
      category: Category.Disc
    },
    {
      word: 'MVP Disc Sports',
      category: Category.BRAND
    }
  ]
  },
  {
    label: 'Test Case  IMG_0416.jpg',
    image:IMG_0416,
   expectedResults: [
    {
      word: 'MVP Disc Sports',
      category: Category.BRAND
    }
  ]
  }
]