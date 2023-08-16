const createUser = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-newUser').value.trim();
  const password = document.querySelector('#password-newUser').value.trim();
  const confirmPassword = document.querySelector('#password-confirm').value.trim();
  const first = document.querySelector('#firstName-newUser').value.trim();
  const last = document.querySelector('#lastName-newUser').value.trim();
  const username = document.querySelector('#username-newUser').value.trim();
  const bio = document.querySelector('#user-bio').value
  const user_type = document.querySelector('#user-type').value; // User Type selection
  const avatar = document.querySelector('#user-avatar').value; // Avatar selection

  // Check if passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  if (email && password && first && last && username) {
    const response = await fetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
        first,
        last,
        user_type,
        bio,
        avatar,

      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/'); // Redirect to homepage after creating user
    } else {
      alert('Failed to create user');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', createUser);
