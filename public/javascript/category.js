//Async function for selecting a category
async function categoryFormHandler(event) {
    event.preventDefault();
  
    const category_text = document.querySelector('textarea[name="category-body"]').value.trim();
  
    const joke_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (category_text) {
        const response = await fetch('/api/categories', {
          method: 'POST',
          body: JSON.stringify({
            joke_id,
            category_text
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
  }
  
  document.querySelector('.category-form').addEventListener('submit', categoryFormHandler);