async function upvoteClickHandler(event) {
    event.preventDefault();
  
  const id = event.target.getAttribute('data-joke-id')
  
    const response = await fetch('/api/jokes/upvote', {
      method: 'PUT',
      body: JSON.stringify({
        joke_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
    
    document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);