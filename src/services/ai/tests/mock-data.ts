import { Category } from "../ai.service.model";
import { IMG_0405, IMG_0406, IMG_0410, IMG_0411, IMG_0413, IMG_0416, IMG_0418 } from "./images.const";

export const token ="eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyOjQ5OjQzOjI1Ojc4OjNmOmY1OjRiOjlmOjk4OjA3OmZiOjAzOjQ3OjM2OjAxIiwidHlwIjoiSldUIn0.eyJhdWQiOlsiZHJuLWFwaS10cyJdLCJhenAiOiJlNmVmYTFjMDYzMGY0MjM5OTNlNDBjZTk3ZjhkZDQxMiIsImV4cCI6MTcyNjg3NDAzOCwiZ3R5IjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJpYXQiOjE3MjY3ODc2MzgsImlzcyI6Imh0dHBzOi8vYXV0aC5kaXNjcmVzY3VlbmV0d29yay5jb20iLCJqdGkiOiIzMThiMDllNC02NWE4LTRmM2QtODU3Yi0yODg1MGUwMjY1NjgiLCJzY29wZSI6IiIsInNjcCI6W10sInYiOiIyIn0.XYahh11zZEMr1nyHMRuAA5F7QEQJPpW4mP-Ulqx0e89Ay5wK8XoYfGHJmlDACTUWGPU3CJjESaOfsxDlRduqeFGI_v3vaIiBXwHGPwXbzU06vjIm4wOrpDcPuRAqFrUhAiVK1apoKhc9azdK9H-2x9VgBfPymf32Izd_5-VUcIpcB9LZY_4cKMK395a6YR0rriTs8yW03I7K93l1jSG9ZSiafS_yZFPbWkjBtzU1jn8E2bDi6EU5b1Z7GjIGxY9dD71ccogWyNSWAB4jE_stnfY0xYxNU_9rr_jnvz4jzl0cvhD0hI_qXbc7oGAoXxb6Sk-YMOThLrKpfCClqULOUA";


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