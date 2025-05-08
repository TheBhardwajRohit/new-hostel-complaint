document.addEventListener('DOMContentLoaded', () => {
    const complaintForm = document.getElementById('complaintForm');
    const complaintsList = document.getElementById('complaints-list');
    
    // Handle complaint submission
    if (complaintForm) {
        complaintForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(complaintForm);
            
            try {
                const response = await fetch('/api/student/complaints', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    window.location.href = '/student-dashboard.html';
                } else {
                    const data = await response.json();
                    alert(data.error || 'Failed to submit complaint');
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('Failed to submit complaint');
            }
        });
    }

    // Load complaints list
    if (complaintsList) {
        loadComplaints();
    }

    // Handle complaint resolution
    const resolveForm = document.getElementById('resolveForm');
    if (resolveForm) {
        resolveForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const complaintId = new URLSearchParams(window.location.search).get('id');
            const formData = new FormData(resolveForm);
            
            try {
                const response = await fetch(`/api/staff/complaints/${complaintId}/resolve`, {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    window.location.href = '/staff-dashboard.html';
                } else {
                    const data = await response.json();
                    alert(data.error || 'Failed to resolve complaint');
                }
            } catch (error) {
                console.error('Resolution error:', error);
                alert('Failed to resolve complaint');
            }
        });
    }
});

async function loadComplaints() {
    try {
        // Decide API endpoint based on current page
        const isStaff = window.location.pathname.includes('staff-dashboard');
        const endpoint = isStaff ? '/api/staff/complaints' : '/api/student/complaints';

        const response = await fetch(endpoint);
        const complaints = await response.json();

        const complaintsList = document.getElementById('complaints-list');
        complaintsList.innerHTML = complaints.map(complaint => `
            <div class="complaint-card">
                <h3>${complaint.category}</h3>
                <p>${complaint.description}</p>
                <p>Status: ${complaint.status}</p>
                ${complaint.photoPath ? `<img src="${complaint.photoPath}" alt="Complaint photo">` : ''}
                ${complaint.proofPhotoPath ? `<img src="${complaint.proofPhotoPath}" alt="Proof photo">` : ''}
                ${complaint.raisedBy ? `<p>Raised by: ${complaint.raisedBy.name}</p>` : ''}
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load complaints:', error);
        alert('Failed to load complaints');
    }
}
