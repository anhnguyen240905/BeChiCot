import { useRouter } from "next/router";
import Head from "next/head";

export default function CertificatePage() {
  const router = useRouter();
  const { id } = router.query;

  // URL ảnh certificate trên Cloudinary
  // Giả sử id = tên file trên Cloudinary hoặc có thể map từ db
  const imageUrl = `https://res.cloudinary.com/dxrfxl6v7/image/upload/v123456/${id}.png`;

  const vercelLink = "https://be-chi-cot.vercel.app";

  return (
    <>
      <Head>
        <title>First Date cùng Be Chí Cốt</title>
        <meta property="og:title" content="First Date cùng Be Chí Cốt" />
        <meta
          property="og:description"
          content={`First date cùng cốt tại: ${vercelLink}
#BeChíCốt #CốtChìuBạnChill #NgàyNhịpNhàngBớtLoToang #FirstdatecungCot #marketingonair #MOA2025_Activation #be`}
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={vercelLink} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Hiển thị ảnh lên page (cho SEO + fallback) */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <img src={imageUrl} alt="Certificate" style={{ maxWidth: "90%" }} />
      </div>
    </>
  );
}
