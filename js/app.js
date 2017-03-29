/* ===================================================
 * template specific javascript funtions
 * ================================================ */
$(document).ready(function(){
    //Init jQuery Masonry layout
    init_masonry();

    window.setTimeout(function() {

        $(window).trigger('resize');
    
    }, 1000);

    $('#lnk-download-resume').click(download_resume);
});


function init_masonry(){
    
    var $container = $('#portfolio');
    var gutter = 12;
    var min_width = 215;

    $container.imagesLoaded( function(){
        
        $container.masonry({

            itemSelector: '.portfolio-item',
            gutterWidth: gutter,
            isAnimated: true,
            columnWidth: function( containerWidth ) {

                var num_of_boxes = (containerWidth/min_width | 0);

                var box_width = (((containerWidth - (num_of_boxes-1)*gutter)/num_of_boxes) | 0) ;

                if (containerWidth < min_width) {
                    box_width = containerWidth;
                }

                $('.portfolio-item').width(box_width);

                return box_width;
            }
        });
    });
}


/* google maps */
var myLatlng = new google.maps.LatLng(37.1411,-80.4078);

var mapInitOpts = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: myLatlng,
    zoom: 12
};

var map = new google.maps.Map(document.getElementById("my-location"), mapInitOpts);

var marker = new google.maps.Marker({
    position: myLatlng, 
    map: map, 
    title: "My Office" 
});

$(window).on('resize', function (e){
    
    center_map();

});

function center_map(){
    
    window.setTimeout(function() {
        map.panTo(marker.getPosition()); 
        }, 500);

};


/* tooltip */
$('.my-tooltip').tooltip()

function download_resume (event) {

    $('#my-location').css("display", "none");
    $('#my-location-header').css('display', 'none');
    html2canvas(document.getElementById('main-container'), {
        onrendered: function(canvas) {
            var data = canvas.toDataURL('image/jpeg');
            //data = atob(data);

            //window.location = canvas.toDataURL('image/jpeg');

            var pdf = new jsPDF();
            pdf.addImage(data, 'JPEG', 0, 0, 0, 225);

            pdf.save('Jason Herald - Resume.pdf');
            $('#my-location-header').css('display', 'block');
            $('#my-location').css("display", "block");
        },
        allowTaint: true,
        taintTest: false
    });

    event.preventDefault();
}