export async function fetchUrl(apiUrl: string) {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (e) {
    console.error();
    return;
  }
}
