document.addEventListener("DOMContentLoaded", function () {
    const editProfileButton = document.getElementById("edit-profile-button");
    if (editProfileButton) {
      editProfileButton.addEventListener("click", function () {
        window.location.href = "/edit";
      });
    }
  });