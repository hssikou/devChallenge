export async function uploadImage(file) {
    const url = 'http://localhost:8008/Upload';
    console.log('from API link', file);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
        },
        body: file
      });
      return await response.json();
    } catch (error) {
      return undefined;
    }
  }