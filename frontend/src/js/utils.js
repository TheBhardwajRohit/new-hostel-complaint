// Utility functions for fetch requests and session handling
async function fetchWithAuth(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (response.status === 401) {
            window.location.href = '/login';
            return;
        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

function checkSession() {
    if (!document.cookie.includes('connect.sid')) {
        window.location.href = '/login';
    }
}

// Format date utility
function formatDate(date) {
    return new Date(date).toLocaleString();
}

// Export utilities
window.utils = {
    fetchWithAuth,
    checkSession,
    formatDate
};