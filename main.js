let makeURL = (per, page) => `https://api.are.na/v2/channels/poetics-of-space-gvdouhcpye0?per=${per}&page=${page}`;

fetch(makeURL(1, 1), { cache: "no-store" })
  .then((res) => res.json())
  .then((json) => count = json.length)
  .then((count) => {
    let per = 100;
    let pages = Math.ceil(count/per);

    let fetches = [];
    for (let page = 1; page <= pages; page++) {
      fetches.push(fetch(makeURL(per, page), { cache: "no-store" }).then((res) => res.json()).then((json) => json.contents))
    }

    Promise.all(fetches)
      .then((contents) => {
        contents.forEach((content) => {
          content.forEach((c) => {
            if (c.class === 'Image') {
              let div = document.createElement('div');
              div.className = 'entry';

              // Create an image element wrapped in an anchor element to open the lightbox
              let a = document.createElement('a');
              let img = document.createElement('img');
              img.src = c.image.display.url;
              a.href = c.image.original.url;
              a.onclick = function(event) {
                event.preventDefault();
                openLightbox(event);
              };
              a.appendChild(img);
              div.appendChild(a);

              document.getElementById('entries').insertBefore(div, document.getElementById('entries').childNodes[0]);
            }
          });
        });

        // Hide the loading message after the images have loaded
        document.getElementById('loading-message').style.display = 'none';
      });
  });

function openLightbox(event) {
  event.preventDefault();
  let imgUrl = event.target.getAttribute('src');
  document.getElementById('lightbox-img').setAttribute('src', imgUrl);
  document.getElementById('lightbox').classList.remove('hidden');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
}
