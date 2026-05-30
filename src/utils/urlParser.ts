export async function fetchUrlText(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Gagal mengambil konten dari URL (Status: ${response.status})`);
    }
    
    const html = await response.text();
    
    // Pembersihan dasar untuk mengekstrak teks dari HTML
    const withoutScripts = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
    const withoutStyles = withoutScripts.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
    const textOnly = withoutStyles.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
    return textOnly;
  } catch (error: any) {
    throw new Error(`Error saat mengambil data dari tautan: ${error.message}`);
  }
}
