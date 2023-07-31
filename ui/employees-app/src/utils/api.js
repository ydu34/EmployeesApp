const BASE_URL = "http://localhost:5015/api/"

async function fetchJSON(url, options) { 
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    return response.json();
}

// GET request 
export function get(endpoint) {
    return fetchJSON(`${BASE_URL}${endpoint}`, {
        method: 'GET', 
        headers: { 
            'Content-Type': 'application/json',
        },
    });
}

// POST request 
export function post(endpoint, data) {
    return fetchJSON(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

// POST image request 
export function postImage(endpoint, data) {
    return fetchJSON(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        body: data,
    });
}

// PUT request 
export function put(endpoint, data) {
    return fetchJSON(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
    });
}

// DELETE request 
export function del(endpoint) {
    return fetchJSON(`${BASE_URL}${endpoint}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json', 
        }
    })
}