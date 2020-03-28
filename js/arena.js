$('.submit, .submit-container').on('click', function(){
  $('.submit-container').slideToggle('fast');
});


var channel = 'https://api.are.na/v2/channels/shadows-82qonzlwqzg';
var writing = 'https://api.are.na/v2/channels/shadows-writing';

//Clear Cache
$.ajax({
  cache: false
});
$.ajaxSetup({ cache: false });

// LOAD MORE CONTENT - PAGE + PER
var page = 1,
    per = 20,
    totalrecord = 0;

$(document).on('click', '.loadmoreImage', function(){
  if (page * per < totalrecord) {
    page++;
    getImages();
    console.log('Current Page: ', page);
  }
});


var postPage = 1,
    postPer = 8,
    totalrecordPost = 0;

$(document).on('click', '.loadmorePosts', function(){
  if (postPage * postPer < totalrecordPost) {
    postPage++;
    getWriting();
    console.log('Current Page: ', postPage);
  }
});

getTitle();
getDescription();
getImages();
getWriting();

function getTitle() {
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
      successmessage = 'Get Title: ';

        var title = data.title;
        console.log('SITE TITLE: ', title);
        $('.header-title').append('<a href="index.html"><h1>'+title+'</h1></a>')
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}
function getDescription() {
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
      successmessage = 'Get Description: ';

        var description = data.metadata.description;
        console.log('SITE DESCRIPTION: ', description);
        document.getElementById('description').innerHTML = description;
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}
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

        $('#'+contentID).prepend('<div class="image-content"> <p class="image-tag acumin-body">â€¢ '+imageTitle+'</p> <p class="image-description acumin-body">'+imageDescription+'</p> </div>');
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
      $('.button-images').prepend('<button class="loadmore loadmoreImage" type="button" name="button">LOAD MORE IMAGES</button>');

    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}

function getWriting() {
  $.ajax({
    url: writing,
    type: 'GET',
    cahce: false,
    dataType: 'json',
    data: {
      page: postPage,
      per: postPer
    },
    success: function(data){
      successmessage = 'Get Data';
      totalrecordPost = data.length;
      $('.button-posts').empty();
      $('.button-posts').prepend('<button class="loadmore loadmorePosts" type="button" name="button">LOAD MORE POSTS</button>');
      for (var i = 0; i < data.contents.length; i++) {
        var contentID = data.contents[i].id;

        var postTitle = data.contents[i].title;
        var postDescription = data.contents[i].description;
        var postContent = data.contents[i].content_html;

        $('.posts').append('<li class="text-block" id="'+contentID+'"></li>')

        $('#'+contentID).append('<p class="post-list"><p class="post-title acumin-body">'+postTitle+'</p> <p class="post-description acumin-body">'+postDescription+'</p> <span class="post-content acumin-body">'+postContent+'</span></p>');

        $('#'+contentID).on('click', function(){
          $(this).toggleClass('show-post');
        });

      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}
