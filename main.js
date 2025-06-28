// Provided server mock function
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

// Main implementation
document.addEventListener('DOMContentLoaded', () => {
  const hearts = document.querySelectorAll('.like-glyph');
  const errorModal = document.getElementById('modal');
  
  // Add click event listeners to all hearts
  hearts.forEach(heart => {
    heart.addEventListener('click', handleLikeClick);
  });
  
  function handleLikeClick(event) {
    const heart = event.target;
    
    if (heart.classList.contains('activated-heart')) {
      // If heart is already liked, unlike it immediately
      heart.classList.remove('activated-heart');
      heart.textContent = '♡';
    } else {
      // If heart is not liked, make server call
      mimicServerCall()
        .then(() => {
          // On success, make heart full
          heart.classList.add('activated-heart');
          heart.textContent = '♥';
        })
        .catch(error => {
          // On failure, show error modal
          errorModal.classList.remove('hidden');
          document.getElementById('modal-message').textContent = error;
          
          // Hide modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add('hidden');
          }, 3000);
        });
    }
  }
});