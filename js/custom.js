
    
$('.career_list > ul > li > a').click(function(e) {
    e.preventDefault();
    
    let id = e.currentTarget.id;
    let container = $('.career_description');
    let scrollTo = $('section#'+id+'');
    let divHeight = $('section#'+id+'');

    // Calculating new position of scrollbar
    let position = scrollTo.offset().top - container.offset().top  + container.scrollTop();

        $('.career_description').css({height:divHeight.height()});
        $('.career_list>ul>li>a').removeClass('selected');
        $('#'+id+'').addClass('selected');

        // Setting the value of scrollbar
        container.scrollTop(position);

        localStorage.setItem('career_id', id);
});

$(window).on('resize', function(e){

    let id = $('.career_list > ul > li > a.selected').attr('id');

        $("#"+id+"").click();
});

$(window).on('load', function(){

    if (localStorage.career_id != null) { 
        $('#'+localStorage.getItem('career_id')+'').addClass('selected');
    } else { 
        $('.career_list > ul > li > a#proweaver').addClass('selected');
        localStorage.setItem('career_id','proweaver');
    }
    
});