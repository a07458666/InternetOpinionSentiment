function getRandomColor() {
    var letters = '3456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

export {getRandomColor}