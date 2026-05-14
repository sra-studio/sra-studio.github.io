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
        'description',
        'category',
        'hashtag',
        'tag'
      ],
      threshold: 0.3
    });

    const results = fuse.search(query);

    const container = document.getElementById('results');
    const none = document.getElementById('none');

    if(results.length === 0){
      none.innerHTML =`
        <h5>No results found.</h5>`;
      return;
    }

    container.innerHTML =
      results.map(result => `
        <article><a href="${result.item.url}" class="link">
            <span class="image">
                <img src="${result.item.img}" alt="" />
            </span>
            <header class="major">
                <h3>${result.item.title}</h3>
                <p>${result.item.description}</p>
                <a class="icon fa-solid fa-hashtag"></a>${result.item.hashtag}<br />
                <a class="icon fa-solid fa-tag"></a>${result.item.tag}
            </header>
        </a></article>

      `).join('');
  });