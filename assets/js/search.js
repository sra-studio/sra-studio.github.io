const searchBoxes =
  document.querySelectorAll('.searchBox');

searchBoxes.forEach(searchBox => {

  searchBox.addEventListener('keydown', (e) => {

    if(e.key === 'Enter') {

      e.preventDefault();

      const query =
        searchBox.value.trim();

      if(query.length > 0){

        window.location.href =
          `/search/?q=${encodeURIComponent(query)}#searchForm`;
      }
    }
  });

});