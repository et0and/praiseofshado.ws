$('.submit, .submit-container').on('click', function(){
  $('.submit-container').slideToggle('fast');
});

var channel = 'https://api.are.na/v2/channels/poetics-of-space-gvdouhcpye0';

//Clear Cache
$.ajax({
  cache: false
});
$.ajaxSetup({ cache: false });

// LOAD MORE CONTENT - PAGE + PER
var page = 1,
    per = 30,
    totalrecord = 0;

$(document).on('click', '.loadmoreImage', function(){
  if (page * per < totalrecord) {
    page++;
    getImages();
    console.log('Current Page: ', page);
  }
});

//getTitle();
//getDescription();
getImages();

function getImages() {
  $.ajax({
    url: channel,
    type: 'GET',
    cahce: false,
    dataType: 'json',
    data: {
      page: page,
      per: per
    },
    success: function(data){
      successmessage = 'Get Data';
      totalrecord = data.length;

      for (var i = 0; i < data.contents.length; i++) {
        var contentID = data.contents[i].id;
        var imageLink = data.contents[i].image.display.url;
        var imageTitle = data.contents[i].title;
        var imageDescription = data.contents[i].description;

        $('.image-gallery').append('<div class="image-block" id="'+contentID+'"></div>')

        $('#'+contentID).prepend('<img class="image" src="'+imageLink+'" alt="">');

        $('#'+contentID).on('click', function(){
          $('.lightBox').toggleClass('show');
          $(this).toggleClass('large');
          $(this).siblings().toggleClass('hide');

        });
      }
      $('.button-images').remove();
      $('.image-gallery').append('<div class="button-images"></div>');
      $('.button-images').empty();
      $('.button-images').prepend('<button class="loadmore loadmoreImage" type="button" name="button">Load more images</button>');

    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}
