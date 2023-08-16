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
        document.location.reload();
    } else {
        alert('Failed to create post.')
    }
}

const skipForm = () => {
    document.location.reload();
}

likeBtn.addEventListener("click", likeForm);
skipBtn.addEventListener("click", skipForm);