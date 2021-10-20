export async function uploadImage(file) {
    const url = 'http://192.168.0.149:8008/api/upload';
    console.log('from API link', file);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(file)
      });
      return await response.json();
    } catch (error) {
      return undefined;
    }
  }