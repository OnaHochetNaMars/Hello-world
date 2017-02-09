'use strict'

var fs = require('fs');

// функции

// мне кажется эта функция больше не нужна
function makeObjectFromCsvString (string, keys, splitter) {
	var array = string.split(splitter);
	var object = {};
	var length = keys.length;
	for (var i = 0; i < length; i++){
		object[keys[i]] = array[i];
	}

	return object;
}

// эта функция тоже не нужна, так как я решила не использовать объекты

function makeStringfromObject (object, splitter) {
    var string = '';
    for (var key in object) {
        string = string + object[key] + splitter;
    }

    return string;
}

function parseCsv(contents, splitter) {
    var lines = contents.toString().split('\n');
    var keys = lines[0].split(splitter);
    var array = [];
    lines.forEach(function(line, i) {
        array[i] = line.split(splitter);
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
    price.forEach(function(product) {
        product[4] = 0;
    })

    return price;
}

function newProduct(price) {
    price.forEach(function(product) {
        product[2] += ' НОВИНКА';
    })

    return price;
}

// основная программа

var oldFile = 'vygruzka_iz_progi_v_csv.csv';
var newFile = 'prays_novy_tolko_ryba8.csv';
var oldPrice = fs.readFileSync(oldFile, 'utf8');
var newPrice = fs.readFileSync(newFile, 'utf8');

var oldInLines = parseCsv(oldPrice, ';');
var newInLines = parseCsv(newPrice, '\t');

var array = [];

newInLines.forEach(function(newProduct, i) {
    oldInLines.forEach(function(oldProduct, j) {
        if (oldProduct[2] === newProduct[2]) {
            oldProduct[4] = newProduct[4];
            array.push(oldProduct);
            delete newInLines[i];
            delete oldInLines[j];
        }
    })
})

for (var i = newInLines.length; i >= 0; i--) {
    if (!newInLines[i]) {
        newInLines.splice(i, 1);
    }
}

for (var i = oldInLines.length; i >= 0; i--) {
    if (!oldInLines[i]) {
        oldInLines.splice(i, 1);
    }
}

var resultPrice = array.concat(resetPrices(oldInLines), newProduct(newInLines));
resultPrice = resultPrice.map(function(product) {
    return product.join(';');
})
resultPrice = resultPrice.join('\n');

var fname = 'result.csv';
main();

function main() {
    fs.open(fname, "w+", '0644', function(err, file_handle) {
        if (!err) {
            fs.write(file_handle, resultPrice, null, 'utf8', function(err, written) {
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

// console.log(newInLines[0][2] === oldInLines[0][2]);
// console.log(findNewProductFromOldPrice(newInLines[0], oldInLines));
// console.log(newInObject[1]);
// console.log(makeStringfromObject(oldInObjects[1], ';'));
// console.log(makeObjectFromCsvString("qwerewrterewtert;asdfdsaf;dsfafds", ";", ["a", "b", "c"]));
