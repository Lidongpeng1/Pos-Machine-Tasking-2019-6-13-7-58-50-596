const GoodsInfoList = require('./GoodsInfoCollection');

function printReceipt(barcodes) {
    let goodsInfo = getGoodsInfoByBarcodes(barcodes);
    if(goodsInfo == null) {
        return "[ERROR]:";
    }
    let sumPrice = getSumPrice(goodsInfo);
    let receipt = getReceipt(goodsInfo, sumPrice);
    return receipt;

}



function getGoodsInfoByBarcodes(barcodes) {
    let goodsInfo = [];
    for(let i = 0; i < barcodes.length; i++) {
        if(!isExist(goodsInfo, barcodes[i])) {
            let obj = getGoodsObj(barcodes[i]);
            if(obj == null) {
                return null;
            }
            obj.count = 1;
            goodsInfo.push(obj);
        }else {
            let index = findSameIndex(goodsInfo, barcodes[i]);
            goodsInfo[index].count++;
        }
    }
    return goodsInfo;
}

function findSameIndex(goodsInfo, barcode) {
    for(let i = 0; i < goodsInfo.length; i++) {
        if(barcode == goodsInfo[i].id) {
            return i;
        }
    }
    return -1;
}

function getGoodsObj(barcode) {
    for(let i = 0; i < GoodsInfoList.length; i++) {
        if(barcode == GoodsInfoList[i].id) {
            return GoodsInfoList[i];
        }
    }
    return null;
}

function isExist(goodsInfo, barcode) {
    if(goodsInfo.length == 0) {
        return false;
    }

    for(let i = 0; i < goodsInfo.length; i++) {
        if(barcode == goodsInfo[i].id) {
            return true;
        }
    }

    return false;
}


function getSumPrice(goodsInfo) {
    let sumPrice = 0;
    for(let i = 0; i < goodsInfo.length; i++) {
        sumPrice += goodsInfo[i].count * goodsInfo[i].price;
    }
    return sumPrice;
}

function getReceipt(goodsInfo, sumPrice) {
    let receipt = '';
    receipt += 'Receipts\n';
    receipt += '------------------------------------------------------------\n';
    for(let i = 0; i < goodsInfo.length; i++) {
        receipt += goodsInfo[i].name + '\t' + goodsInfo[i].price + '\t' + goodsInfo[i].count + '\n';
    }
    receipt += '------------------------------------------------------------\n';
    receipt += 'Price: ' + sumPrice + ';\n';

    return receipt;
}

module.exports = printReceipt;
module.exports.getGoodsInfoByBarcodes = getGoodsInfoByBarcodes;
module.exports.getSumPrice = getSumPrice;
module.exports.getReceipt = getReceipt;