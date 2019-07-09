const printReceipt = require('../printReceipt');

//测试子函数getGoodsInfoByBarcodes
it ("should return right goodsInfo array when invoke getGoodsInfoByBarcodes given ['0001', '0003', '0005', '0003']", () => {
    //given
    let barcodes = ['0001', '0003', '0005', '0003'];

    //when
    let goodsInfo = printReceipt.getGoodsInfoByBarcodes(barcodes);
    let result = [
        {"id": "0001", "name" : "Coca Cola", "price": 3, "count":1},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5, "count":2},
        {"id": "0005", "name" : "Dr Pepper", "price": 7,"count":1},
    ];

    //then
    expect(goodsInfo).toStrictEqual(result);
});

//测试子函数getSumPrice
it ("should return 20 when invoke getSumPrice given the goodsInfo below", () => {
    //given
    let goodsInfo = [
        {"id": "0001", "name" : "Coca Cola", "price": 3, "count":1},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5, "count":2},
        {"id": "0005", "name" : "Dr Pepper", "price": 7,"count":1},
    ];

    //when
    let sumPrice = printReceipt.getSumPrice(goodsInfo);
    let result = 20;

    //then
    expect(sumPrice).toBe(result);
});

//测试子函数getReceipt
it ("should return the correct receipt when invoke getReceipt given the goodsInfo and sumPrice as below", () => {
    //given
    let goodsInfo = [
        {"id": "0001", "name" : "Coca Cola", "price": 3, "count":1},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5, "count":2},
        {"id": "0005", "name" : "Dr Pepper", "price": 7,"count":1},
    ];
    let sumPrice = 20;

    //when
    let receipt = printReceipt.getReceipt(goodsInfo, sumPrice);
    let result = '';
    result += 'Receipts\n';
    result += '------------------------------------------------------------\n';
    result += 'Coca Cola\t3\t1\n';
    result += 'Pepsi-Cola\t5\t2\n';
    result += 'Dr Pepper\t7\t1\n';
    result += '------------------------------------------------------------\n';
    result += 'Price: 20;\n';
    
    //then
    expect(receipt).toBe(result);
});

//测试主函数printReceipt
it ("should return right receipt when invoke printReceipt given ['0001', '0003', '0005', '0003']", () => {
    //given
    let barcodes = ['0001', '0003', '0005', '0003'];

    //when
    let goodsInfo = printReceipt(barcodes);
    let result = '';
    result += 'Receipts\n';
    result += '------------------------------------------------------------\n';
    result += 'Coca Cola\t3\t1\n';
    result += 'Pepsi-Cola\t5\t2\n';
    result += 'Dr Pepper\t7\t1\n';
    result += '------------------------------------------------------------\n';
    result += 'Price: 20;\n';

    //then
    expect(goodsInfo).toStrictEqual(result);
});

it ("should return [ERROR]: when invoke printReceipt given ['0001', '0003', '10086', '0003']", () => {
    //given
    let barcodes = ['0001', '0003', '10086', '0003'];

    //when
    let goodsInfo = printReceipt(barcodes);
    let result = "[ERROR]:";

    //then
    expect(goodsInfo).toStrictEqual(result);
});