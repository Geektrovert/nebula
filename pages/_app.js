import Head from 'next/head'

import '../styles/base.css'

function MyApp({ Component, pageProps }) {
  const og = pageProps.data?.og
  const title = pageProps.data?.title

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta property="og:title" content={title || `Nebula`} />
        <meta property="og:site_name" content="Nebula" />
        <meta property="og:description" content={og ? og.description : `A modern next.js blog theme`} />
        <meta property="og:image" content={og ? og.image : `https://telmo.im/og/default.png`} />

        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

        <title>{title || `Nebula`}</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
