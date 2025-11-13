import Head from "next/head";
import { useRouter } from "next/router";

export default function SharePage() {
  const router = useRouter();
  const { img } = router.query; // nhận param ?img=...

  if (!img) return <p>Invalid share link</p>;

  return (
    <>
      <Head>
        <title>Be Chí Cốt Certificate</title>
        <meta property="og:title" content="Be Chí Cốt Certificate" />
        <meta property="og:description" content="Khoảnh khắc của bạn cùng Be Chí Cốt 💛" />
        <meta property="og:image" content={img} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://be-chi-cot.vercel.app/share?img=${img}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <img src={img} alt="Certificate" className="max-w-full max-h-screen rounded shadow" />
      </div>
    </>
  );
}
