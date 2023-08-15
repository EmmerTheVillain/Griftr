const editForm = async (event) => {
    event.preventDefault();

    const first = document.querySelector('input[name="user-first"]').value;
    const last = document.querySelector('input[name="user-last"]').value;
    const user_type = document.querySelector('select[name="user-type"]').value;
    const bio = document.querySelector('textarea[name="user-bio"]').value;
    const email = document.querySelector('input[name="user-email"]').value;
    const avatar = document.querySelector('select[name="user-avatar"]').value;
    const username = document.querySelector('input[name="username"]').value;
    const id = document.getElementById('user_id').textContent;

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            first,
            last,
            user_type,
            bio,
            email,
            avatar,
            username
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to update');
    }
}

document
    .querySelector(".edit-profile-form")
    .addEventListener('submit', editForm);