// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


'use strict'

var fs = require('fs');
var similarity = require('similarity');

// функции

function parseCsv(contents, splitter) {
    var lines = contents.toString().split('\n');
    var keys = lines[0].split(splitter);
    var array = lines.map(function(line) {
        return line.split(splitter);
    })

    return array;
}

function intersectionProducts(product, oldPrice) {
    oldPrice.forEach(function (oldProduct) {
        if (product[2] === oldProduct[2]) {
            oldProduct[4] = product[4];
            array.push(oldProduct);
        }
    })
}

function resetPrices(price) {
    return price.map(function(product) {
        var newProduct = product;
        newProduct[productKeys.indexOf('description')] += 'Нет в наличии';

        return newProduct;
    })
}

function newProduct(price) {
    return price.map(function(product) {
        product[keys.indexOf('name/code')] += ' НОВИНКА';
        var newProduct = [];
        productKeys.forEach(function(key, index) {
            if (keys.indexOf(key) > -1) {
                newProduct[index] = product[keys.indexOf(key)];
            } else {
                newProduct[index] = '';
            }
        })

        return newProduct;
    })
}

function isEmptyLine(array) {
    return array[0] === '';
}

function isCategory(array) {
    return array[0] !== '' && array[2] === '';
}

function writeToFile(fname, result) {
    fs.open(fname, "w+", '0644', function(err, file_handle) {
        if (!err) {
            fs.write(file_handle, result, null, 'utf8', function(err, written) {
                if (!err) {
                    console.log("Текст успешно записан в файл");
                } else {
                    console.log("Произошла ошибка при записи");
                }
            });
        } else {
            console.log("Произошла ошибка при открытии");
        }
    });
}

function size(string) {
    if (string === '') {
        return '';
    }
    if (!parseInt(string)) {
        return ' ' + string;
    }
    var size = string.split('-').map(elem => parseInt(elem, 10)).join('-');
    return ' ' + size + ' см';
}

// основная программа

var keys = ['category', 'name/code', 'description', 'price'];

var goldenFish = fs.readFileSync('goldenFish.csv', 'utf8').split('\n');
var category;
var fishes = goldenFish
    .map(function(string) {
        return string.slice(0, string.length - 1).split(';');
    })
    .map(function(array) {
        if (isEmptyLine(array)) {
            return undefined;
        }
        if (isCategory(array)) {
            category = array[0];
            return undefined;
        }

        return [category].concat(array);
    })
    .filter(elem => elem !== undefined)
    .map(function(fish) {
        var newFish = fish;
        newFish[keys.indexOf('name/code')] += size(fish[keys.indexOf('description')]);
        fish[keys.indexOf('description')] = '';

        return newFish;
    });

var volnixCsv = fs.readFileSync('volnix-csv.csv', 'utf8').split('\n');
var volnix = volnixCsv
    .map(function(string) {
        return string.slice(0, string.length - 1).split(';');
    })
    .map(function(array) {
        if (array[1] === '') {
            category = array[0];
            return undefined;
        }
        return [category].concat(array);
    })
    .filter(elem => elem !== undefined);

console.log(fishes[45]);

var newPrice = volnix.concat(fishes);

var oldFile = 'vygruzka_iz_progi_v_csv.csv';
var oldPrice = fs.readFileSync(oldFile, 'utf8');
var oldInLines = parseCsv(oldPrice, ';');
var newInLines = newPrice;

var array = [];
var productKeys = oldInLines.shift();

console.log(similarity('"Растение-арка ""Тритон"" 23см Q2323/7998"', 'Растение-арка Тритон 23см Q2323/7998'));

newInLines.forEach(function(newProduct, i) {
    oldInLines.forEach(function(oldProduct, j) {
        var sim = similarity(oldProduct[productKeys.indexOf('name/code')], newProduct[keys.indexOf('name/code')]);
        if (sim > 0.9) {
            oldProduct[productKeys.indexOf('price')] = newProduct[keys.indexOf('price')];
            oldProduct[productKeys.indexOf('name/code')] = newProduct[keys.indexOf('name/code')];
            array.push(oldProduct);
            delete newInLines[i];
            delete oldInLines[j];
        } else {
            if (sim > 0.7) {
                newProduct[keys.indexOf('description')] = 'Возможно есть похожее';
            }
        }
    })
})

newInLines = newInLines.filter(elem => elem !== undefined);
oldInLines = oldInLines.filter(elem => elem !== undefined);

var resultPrice = array.concat(resetPrices(oldInLines), newProduct(newInLines));

resultPrice = resultPrice.map(function(product) {
    return product.join(';');
})
resultPrice = resultPrice.join('\n');

writeToFile('result.csv', resultPrice);
