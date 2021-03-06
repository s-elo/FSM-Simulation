function changeColor (color) {
    // console.log(color);
    $('body').css('background-color', color);
    $('.myContainer').css('background-color', color);
    $('#dataTableContainer').css('background-color', color);
    $('#dataTable').css('background-color', color);
    $('#svgContainer').css('background-color', color);
    $('#paraSetting').css('background-color', color);

    $('#quickAccess').css('background-color', color);
    $('#quickAccess p').css('background-color', color);
    $('.codePart').css('background-color', color);
    $('.simulPart').css('background-color', color);

    $('.codeContainer').css('background-color', color);
    $('.codeArea').css('background-color', color);
    $('.codeArea .content').css('background-color', color);
    $('.codeArea .VHDL').css('background-color', color);
    $('.codeArea .Verilog').css('background-color', color);
}

let currentColor = '#e6e6e6';

let storage = window.localStorage;
if (storage.getItem('curColor')) {
    currentColor = storage.getItem('curColor');
}
else {
    storage.setItem('curColor', currentColor);
}

changeColor(currentColor);

let color1 = '#e6e6e6';
let color2 = 'white';
let color3 = '#B2DBA1';
let color4 = '#FFEFD5';

$('.Theme').click(() => {
    if (currentColor === color1) {
        changeColor(color2);
        currentColor = color2;
    }
    else if (currentColor === color2) {
        changeColor(color3);
        currentColor = color3;
    }
    else if (currentColor === color3) {
        changeColor(color4);
        currentColor = color4;
    }
    else if (currentColor === color4) {
        changeColor(color1);
        currentColor = color1;
    }

    storage.setItem('curColor', currentColor);
});
