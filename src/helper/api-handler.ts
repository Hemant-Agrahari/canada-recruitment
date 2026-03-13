export interface FetchOptions extends RequestInit {
    url: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;
export const fetcher = async ({ url, ...options }: FetchOptions): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}${url}`, options);
        
        // Check if the response is okay (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response?.status}`);
        }
        

        // Assuming the response is in JSON format
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Rethrow the error for further handling
    }
};