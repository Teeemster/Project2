
//Async form handler function used for adding a joke. It posts the joke-message, the punchline, and the category-id all in one.
async function newFormHandler(event) {
    event.preventDefault();
  
  const message = document.querySelector('input[name="joke-message"]').value;
  const punchline = document.querySelector('input[name="punchline"]').value;
  const category_id = document.querySelector('select[name="category_id"]').value;

  
  
    const response = await fetch(`/api/jokes`, {
      method: 'POST',
      body: JSON.stringify({
        message,
        punchline,
        category_id
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
  
  //Attaches the event listener for submitting to the joke
  document.querySelector('.new-joke-form').addEventListener('submit', newFormHandler);