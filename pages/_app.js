import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })
import '../styles/globals.css'

const branch = process.env.NEXT_PUBLIC_EDIT_BRANCH || "main";
const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;
    console.log('WHATTT', process.env.NODE_ENV, apiURL)

const App = ({ Component, pageProps }) => {
  return (
    <>
      <TinaEditProvider
        editMode={
          <TinaCMS
            apiURL={apiURL}
            cmsCallback={(cms) => {
              // Use the new experimental admin
              cms.flags.set('tina-admin', true)
              // Experimental branch switcher
              cms.flags.set('branch-switcher', true)
              return cms
            }}
          >
            <Component {...pageProps} />
          </TinaCMS>
        }
      >
        <Component {...pageProps} />
      </TinaEditProvider>
    </>
  )
}

export default App
