async function newFormHandler(event) {
    event.preventDefault();
  
    const message = document.querySelector('input[name="joke-message"]').value;
    const punchline = document.querySelector('input[name="punchline"]').value;
  
    const response = await fetch(`/api/jokes`, {
      method: 'POST',
      body: JSON.stringify({
        message,
        punchline
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-joke-form').addEventListener('submit', newFormHandler);