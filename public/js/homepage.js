const likeBtn = document.getElementById('like');
const skipBtn = document.getElementById('skip');

const likeForm = async (event) => {
    event.preventDefault();

    const receiver_element = document.getElementById('user_id');
    const receiver_id = receiver_element.textContent;

    const response = await fetch('/api/match', {
        method: 'POST',
        body: JSON.stringify({ receiver_id }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        const response = await fetch(`/api/match/${receiver_id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              },
        });
        if (response.ok) {
            const { matchedUserIds } = await response.json();
            for (let i in matchedUserIds) {
                if (i === receiver_id) {
                    alert("Congratulations my friend, you have a match.");
                    document.location.reload();
                } else {
                    document.location.reload();
                }
            }
        } else {
            document.location.reload();
        }
    } else {
        alert('Failed to like. You may have already sent a like to this user.')
    }
}

const skipForm = () => {
    document.location.reload();
}

likeBtn.addEventListener("click", likeForm);


skipBtn.addEventListener("click", skipForm);


document.addEventListener("DOMContentLoaded", function () {
    const matchButton = document.getElementById("match-button");
    if (matchButton) {
      matchButton.addEventListener("click", function () {
        window.location.href = "/match";
      });
    }
  });

