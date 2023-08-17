const createUser = async () => {
  const email = document.querySelector('#email-newUser').value;
  const password = document.querySelector('#password-newUser').value;
  const first = document.querySelector('#firstName-newUser').value;
  const last = document.querySelector('#lastName-newUser').value;
  const username = document.querySelector('#username-newUser').value;
  const bio = document.querySelector('#user-bio').value;
  const user_type = document.querySelector('#user-type').value;

  const avatarFileInput = document.querySelector('#avatar-file');
  const avatarFile = avatarFileInput.files[0];

  if (email && password && first && last && username && bio && avatarFile) {
    const formData = new FormData();

    formData.append('avatar', avatarFile);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('first', first);
    formData.append('last', last);
    formData.append('username', username);
    formData.append('user_type', user_type);
    formData.append('bio', bio);

    try {
      const response = await fetch('/api/users/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', (event) => {
  event.preventDefault();
  createUser();
});
