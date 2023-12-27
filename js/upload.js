function foto(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
    
      var img = e.target.result.split(',')[1];
    
      window.localStorage.setItem("foto", img);
      window.localStorage.setItem("foto-src", e.target.result);
      $(".img-view").html(`<div class="input-group-text" style="background-image:url(${e.target.result}); background-repeat:no-repeat; background-size: cover; background-position: center center;"></div>`);
      console.log('upload')
      $(".img-view").css("margin-right", "10px");
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#uploadFoto").change(function() {
  foto(this);
});
