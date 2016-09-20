$(document).ready(function() {

        $(".mobile-setting").hide();
        $(".mobile-show").show();

        //click the gear picture go to the second page
        $("#icon").click(function() {
            $('body').fadeTo('slow', 0.3, function() {
                $(this).css('background-color', '#F0F0F0');
            }).fadeTo('slow', 1);
            $(".mobile-show").fadeOut();
            $(".mobile-setting").fadeIn(3000);
        });

        //click done button back to the first page
        $("#done").click(function() {
            $('body').fadeTo('slow', 0.3, function() {
                $(this).css('background-color', '#333366');
            }).fadeTo('slow', 1);
            $(".mobile-setting").fadeOut();
            $(".mobile-show").fadeIn(3000);
        });

        //click done button will display a border
        $("#done").mousedown(function() {
            $(this).css('border', '3px solid #00FFFF');
        });

        $("#done").mouseup(function() {
            $(this).css('border', '0');
        });

        //ajax call to get the data from json file
        $.ajax({
            url: "js/json/tiles.json",
            type: "POST",
            dataType: "json",
            success: function(data) {
                $.each(data.Tiles, function(index, value) {
                    var arr = value.TileProperties.HomeURL.split('.');
                    var i;
                    for (i = 0; i < arr.length; i++);

                    if (value.TileProperties.Dimensions.Height == 1 && value.TileProperties.Dimensions.Width == 1 && arr[i - 1] != "html" && value.TileProperties.HomeTileStatus == true) {
                        $(".handle-1").append("<li id='" + value.Id + "'><img id='displayimg' src='images/icons/check.png' onclick='myFunction(this)'><span class='caption'>" + value.Caption + "</span><img class='drag-handle' src='images/icons/stack.png'><HR id='line' align=center SIZE=1></li>");
                        $("#handle").append("<li id='" + value.Id + "'><a href='"+ value.Newslink +"' style='background-image:url(" + value.TileProperties.HomeURL + ")'>" + value.Caption + "</a></li>");
                    }
                });

            },
            error: function() {
                $('body').html('<h1 class="error"><strong>Oops!</strong> Try that again in a few moments.</h1>');
            }
        });

        //mouse on handle can trag this position
        $(".handle-1").sortable({
            handle: ".drag-handle",
            update: function(event, ui) {
                var title_order = $(this).sortable('toArray'); 
                //alert(title_order[0]);
                $.each(title_order, function(index, bigvalue) {
                    $("#handle li").each(function(index, value) {
                        if ($(this).attr("id") == bigvalue) {
                            $("#handle").append("<li id=" + $(this).attr("id") + ">" + $(this).clone().html() + "</li>");
                            $(this).remove();
                        }
                    });
                });

            }
        });



    });

    //check or cancal a picture to display
    function myFunction(elmnt) {
        var arr = elmnt.src.split('/');
        var i;
        for (i = 0; i < arr.length; i++);
        //alert(arr[i-1]);
        if (arr[i - 1] == 'check.png'){
            elmnt.src = 'images/icons/empty.png';
            var fatherId=elmnt.parentNode.id;
            var nav = document.getElementById("handle");
            //var links = nav.getElementById(fatherId);
            var li = nav.getElementsByTagName("li");
            for (var i = 0; i < li.length; i++) {
                 if(li[i].id==fatherId)
                  li[i].style.display="none";
            }
           // nav.getElementsByTagName(fatherId).style.display="none";
        }
        else{
            elmnt.src = 'images/icons/check.png';
            var fatherId=elmnt.parentNode.id;
            var nav = document.getElementById("handle");
            //var links = nav.getElementById(fatherId);
            var li = nav.getElementsByTagName("li");
            for (var i = 0; i < li.length; i++) {
                 if(li[i].id==fatherId)
                  li[i].style.display="inline";
            }
        }
    }