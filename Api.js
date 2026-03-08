export async function Search({ query }) {
    const baseUrl = 'https://api.artic.edu/api/v1/artworks/search'; // from website

    const params = [];

    // filter by query text (title or keyword)
  if (query) params.push(`q=${encodeURIComponent(query)}`);


  const url = `https://api.artic.edu/api/v1/artworks/search?${params.join('&')}&limit=100&fields=id,title,artist_title,image_id,date_start,style_title`;

  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

export function getImageUrl(imageId) {
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`; // from website
  }