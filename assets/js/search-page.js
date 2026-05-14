const params =
  new URLSearchParams(window.location.search);

const query = params.get('q');

document.querySelector('h3').innerText =
  `Search Results for "${query}"`;

fetch('/assets/data/search.json')
  .then(res => res.json())
  .then(data => {

    const fuse = new Fuse(data, {
      keys: [
        'title',
        'title_p',
        'description',
        'category'
      ],
      threshold: 0.3
    });

    const results = fuse.search(query);

    const container =
      document.getElementById('results');

    if(results.length === 0){
      container.innerHTML =
        '<p>No results found.</p>';
      return;
    }

    container.innerHTML =
      results.map(result => `
        <hr />

        <header>
            <a href="${result.item.url}"><h5>${result.item.title}</h5></a>
            <p>${result.item.title_p}</p>
        </header>

        <p>
            ${result.item.description}
        </p>

      `).join('');
  });