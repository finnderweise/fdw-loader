var config =
{    
    /*
        Should the background change images?
        True: it will not change backgrounds.
        False: it will change backgrounds.
    */
    staticBackground: false,
   
    /*
        Array of images you'd like to display as the background.
        Provide a path to a local image, using images via url is not recommended.
    */
    background:
    [
        "img/bg1.jpg",
        "img/bg2.jpg",
        "img/bg3.jpg",
    ],
 
    /*
        Time in milliseconds on how fast the background
        should swap images.
     */
    backgroundSpeed: 10 * 1000,
}

var lib = 
{
    rand: function(min, max)
    {
        return min + Math.floor(Math.random()*max);
    },

    fadeInOut: function(duration, elementId, min, max)
    {
        var halfDuration = duration / 2;

        setTimeout(function()  
        {
            var element = document.getElementById(elementId);
            element.style.opacity = min;

            setTimeout(function()  
            {
                element.style.opacity = max;

            }, halfDuration);  

        }, halfDuration);
    },
}

var index = lib.rand(0, config.background.length);
var background = document.getElementById("background");
var background2 = document.getElementById("background2");
NextBackground();

if(config.staticBackground == false)
{
    setInterval(NextBackground, config.backgroundSpeed)
}

function NextBackground() 
{
    index = (index + 1) % config.background.length;
    AnimationZoom(index);
}

function AnimationZoom(bgIndex)
{
    background.setAttribute("class", "zoomin")

    setTimeout(() => 
    {
        background.setAttribute("src", config.background[index]);
    }, 1900);

    setTimeout(() => 
    {
        background.setAttribute("class", "");
    }, 4500);
}
