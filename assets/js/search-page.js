const params =  new URLSearchParams(window.location.search);

const query = params.get('q');

fetch('/assets/data/search.json')
    .then(res => res.json())
    .then(data => {

        const container = document.getElementById('results');


        // 沒有搜尋詞
        if(!query){
            document.querySelector('h3').innerText = ``;
            container.innerHTML =
                data.map(item => `
                    <article><a href="${item.url}" class="link">
                        <span class="image">
                            <img src="${item.img}" alt="" />
                        </span>
                        <header class="major">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <a class="icon fa-solid fa-hashtag"></a>${item.hashtag}<br />
                            <a class="icon fa-solid fa-tag"></a>${item.tag}
                        </header>
                    </a></article>

                `).join('');

            return;
        }

        // 有搜尋詞
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

        const none = document.getElementById('none');

        document.querySelector('h3').innerText = `Search Results for "${query}"`;

        if(results.length === 0){
            none.innerHTML =`
                <h5>
                    No exact matches.<br />
                    Explore all content below.
                </h5>
                `;
            
            container.innerHTML =
                data.map(item => `
                    <article><a href="${item.url}" class="link">
                        <span class="image">
                            <img src="${item.img}" alt="" />
                        </span>
                        <header class="major">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <a class="icon fa-solid fa-hashtag"></a>${item.hashtag}<br />
                            <a class="icon fa-solid fa-tag"></a>${item.tag}
                        </header>
                    </a></article>

                `).join('');

            return;
        } else {
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
        }
});