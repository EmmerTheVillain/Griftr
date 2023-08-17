const editForm = async (event) => {
    event.preventDefault();

    const first = document.querySelector('input[name="user-first"]').value;
    const last = document.querySelector('input[name="user-last"]').value;
    const user_type = document.querySelector('select[name="user-type"]').value;
    const bio = document.querySelector('textarea[name="user-bio"]').value;
    const email = document.querySelector('input[name="user-email"]').value;
    const avatarFileInput = document.querySelector('#avatar-file');
    const avatarFile = avatarFileInput.files[0];
    const username = document.querySelector('input[name="username"]').value;
    const id = document.getElementById('user_id').textContent;

    const formData = new FormData();
    formData.append('avatar', avatarFile);
    formData.append('first', first);
    formData.append('last', last);
    formData.append('user_type', user_type);
    formData.append('bio', bio);
    formData.append('email', email);
    formData.append('username', username);

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: formData,
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

document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("back-btn");
    if (backButton) {
        backButton.addEventListener("click", function () {
            window.location.href = "/";
        });
    }
});
