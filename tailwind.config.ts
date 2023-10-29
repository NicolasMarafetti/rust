import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('/img/background.webp')",
        'scrap': "url('https://static.wikia.nocookie.net/play-rust/images/0/03/Scrap_icon.png/revision/latest?cb=20170721095804')"
      },
    },
  },
  plugins: [],
}
export default config
