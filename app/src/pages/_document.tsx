import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="min-h-screen bg-stone-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
