$(function () {
  //  A target to recolor: a background or a text
  //  allows only "choose-bg-color" or "choose-text-color" (it's button's ids)
  let currentTarget = "choose-bg-color";

  function setColor() {
    let red = $("#red").slider("value");
    let green = $("#green").slider("value");
    let blue = $("#blue").slider("value");
    let color = `rgb(${red},${green},${blue})`;
    const swatch = $("#swatch");

    if (currentTarget === "choose-bg-color") {
      swatch.css("background-color", color);
    } else if (currentTarget === "choose-text-color") {
      swatch.css("color", color);
    } else {
      alert("Sorry, something goes wrong (>_<)");
    }
  }

  function processButton() {
    const swatch = $("#swatch");
    if (! $(this).hasClass("ui-state-active")) {
      $(".ui-state-active").removeClass("ui-state-active");
      $(this).addClass("ui-state-active");
      currentTarget = $(this).attr("id");
      if (currentTarget === "choose-bg-color") {
        setHandlers(swatch.css("background-color"));
      } else if (currentTarget === "choose-text-color") {
        setHandlers(swatch.css("color"));
      }
    }
  }

  function setHandlers(rgb) {
    let rgbArray = rgbToNumbers(rgb);
    $("#red").slider("value", rgbArray[0]);
    $("#green").slider("value", rgbArray[1]);
    $("#blue").slider("value", rgbArray[2]);
  }

  function rgbToNumbers(rgb) {
    let rgbStringArray = rgb.slice(4, -1).split(",");
    let rgbNumsArray = [];
    $.each(rgbStringArray, (index, value) => rgbNumsArray.push(parseInt(value, 10)));
    return rgbNumsArray;
  }

  $("#red, #green, #blue").slider({
    orientation: "horizontal",
    range: "min",
    max: 255,
    slide: setColor,
    change: setColor
  });

  $("#choose-bg-color").on("click", processButton);
  $("#choose-text-color").on("click", processButton);

  //  initial values
  $("#red").slider("value", 197);
  $("#green").slider("value", 0);
  $("#blue").slider("value", 62);
});