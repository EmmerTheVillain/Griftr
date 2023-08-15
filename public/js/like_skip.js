const likeBtn = document.getElementById('like');
const skipBtn = document.getElementById('skip');

const likeForm = async (event) => {
    event.preventDefault();

    const reciever_element = document.getElementById('user_id');
    const reciever_id = reciever_element.textContent;

    const response = await fetch('/api/match', {
        method: 'POST',
        body: JSON.stringify({ reciever_id }),
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