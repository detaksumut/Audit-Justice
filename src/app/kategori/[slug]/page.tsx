import KategoriClient from "@/components/KategoriClient";

export function generateStaticParams() {
  return [
    { slug: 'pidana' },
    { slug: 'perdata' },
    { slug: 'agama' },
    { slug: 'kepolisian' },
    { slug: 'kejaksaan' }
  ];
}

export default async function KategoriPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <KategoriClient slug={resolvedParams.slug} />;
}
