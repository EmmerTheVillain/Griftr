const fetchUserInfo = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    console.log('fetching id:', userId);
    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      console.error('Failed to fetch user data');
      return null;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

const fetchConfirmedMatches = async (userId) => {
  try {
    const response = await fetch(`/api/match/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('fetching matches with id:', userId);
    if (response.ok) {
      const { matchedUserIds } = await response.json();
      console.log('matchedUserIds:', matchedUserIds);
      return matchedUserIds;
    } else {
      console.error('Failed to fetch confirmed matches');
      return [];
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

const fetchMatchesAndRender = async () => {
    try {
      const matchContainer = document.querySelector('.match-container');
      matchContainer.innerHTML = ''; // Clear previous content
  
      // Adjust this part to get the user ID from wherever it's stored in your HTML
      const userId = matchContainer.getAttribute('data-user-id');
  
      const matchedUserIds = await fetchConfirmedMatches(userId);
  
      const matchesWithUserInfo = await Promise.all(
        matchedUserIds.map(async matchedUserId => {
          const userData = await fetchUserInfo(matchedUserId);
          if (userData) {
            return {
              userId: matchedUserId,
              userData,
            };
          } else {
            return null;
          }
        })
      );
  
      matchesWithUserInfo.forEach(matchData => {
        if (matchData) {
          const matchElement = document.createElement('div');
          matchElement.classList.add('match');
  
          const userData = matchData.userData;
          const matchContent = `
          <div class="row justify-content-center">
            <div class= "card col-6 p-4">
              <h3 class = "p-2">${userData.username}</h3>
              <p class = "p-2">${userData.first} ${userData.last}</p>
              <img src="${userData.avatar}" class = "p-2" alt="matched user profile picture">
              <p class = "p-2">Bio: ${userData.bio}</p>
              
            </div>
          </div>
          `;
  
          matchElement.innerHTML = matchContent;
          matchContainer.appendChild(matchElement);
        }
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  document.addEventListener('DOMContentLoaded', fetchMatchesAndRender);
  