import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />

}

export default MyApp
