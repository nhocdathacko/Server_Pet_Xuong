const receiptService = require('./service');
const date = require('../../utils/date');
const async = require('hbs/lib/async');
const detailreceiptController = require('../detiledrececeipt/controller');


// lấy thông tin lịch sử giao dịch
exports.getReceipts = async () => {
    let data = await receiptService.getReceipts();
    data = data.map((item, index) => {
        item = {
            _id: item._id,
            userid: item.UserId,
            date: item.date,
            summoney: item.SumMoney,
            isbill: item.IsBill,
            index: index + 1
        }

        return item;

    })
    return data;
}

exports.getReceiptsByUser = async (UserId) => {
    let data = await receiptService.getRegetReceiptsByUserceipts(UserId);
    data = data.map((item, index) => {
        item = {
            _id: item._id,
            userid: item.UserId,
            date: item.date + "",
            summoney: item.SumMoney,
            isbill: item.IsBill,
            index: index + 1
        }

        return item;

    })
    return data;
}
// lấy thông tin lịch sử giao dịch
exports.getReceiptDate = async (_date1, _date2) => {

    let data = await receiptService.getReceiptByDate(_date1, _date2);
    let SumM = 0;
    let SumP = 0;
    for (let i = 0; i < data.length; i++) {
        let data2 = await detailreceiptController.getDeReceiptByReceiptId(data[i]._id);
        data2 = data2.map((item, index) => {
            SumP += item.quantity;
            return SumP;
        })
    }
    console.log(SumP)
    data = data.map((item, index) => {
        SumM = SumM + item.SumMoney;
        item = {
            _id: item._id,
            userid: item.UserId,
            date: item.date,
            summoney: item.SumMoney,
            isbill: item.IsBill,
            index: index + 1
        }
        return item;
    });
    return { SumM: SumM, SumP: SumP };
}
exports.getReceiptWeek = async (_date1) => {
    _date1.setDate(_date1.getDate() - _date1.getDay() - 1);
    let _date2 = new Date;
    _date2.setDate(_date1.getDate() + 1);

    var arrWeek = [];

    for (let i = 0; i < 7; i++) {
        _date1.setDate(_date1.getDate() + 1);
        _date2.setDate(_date2.getDate() + 1);
        const _d1 = _date1;
        const _d2 = _date2;
        // console.log("day1: "+ _d1);
        // console.log("day2: "+ _d2);

        let onDay = await receiptService.getReceiptByDate(_d1, _d2);
        let SumM = 0;
        let Day = getDayOfWeek(_d1);

        if (onDay == null) {
            SumM = 0;
            // console.log("Sum1: " + SumM);
        } else {
            onDay = onDay.map((item, index) => {
                SumM = item.SumMoney;
                // console.log("Sum2: " + SumM);
            });
        }
        
        // let ob = { Day: Day, SumM: SumM };
        // arrWeek.push(ob);
        arrWeek.push(SumM);

    }
    return arrWeek;
}

exports.getReceiptMonth = async (_date1, _date2) =>{

    _date1.setDate(1);
    _date1.setMonth(0);

    _date2.setDate(1);
    _date2.setMonth(1);


    var arrMonth = [];
    let Sum = 0;

    for (let i = 0; i < 12; i++) {

        let month =  await receiptService.getReceiptByDate(_date1, _date2);

        if (month == null) {
            Sum = 0;
        }else {
            month = month.map((item, index) => {
                Sum = (item.SumMoney / 1000);
            })
        }
        arrMonth.push(Sum);

        _date1.setDate(1);
        _date1.setMonth(_date1.getMonth() + 1);
        
        _date2.setDate(1);
        _date2.setMonth(_date2.getMonth() + 1);
        
    }
    return arrMonth;

}

function getDayOfMonth(month) {
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 10 || month == 12) {
        return 0;
    } else if (month == 2) {
        return 1;
    } else {
        return -1;
    }
}

function getDayOfWeek(date) {
    var current_day = date.getDay();

    // Biến lưu tên của thứ
    var day_name = '';

    let b = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    
    // Lấy tên thứ của ngày hiện tại
    switch (current_day) {
        case 0:
            day_name = "Chủ nhật";
            break;
        case 1:
            day_name = "Thứ hai";
            break;
        case 2:
            day_name = "Thứ ba";
            break;
        case 3:
            day_name = "Thứ tư";
            break;
        case 4:
            day_name = "Thứ năm";
            break;
        case 5:
            day_name = "Thứ sau";
            break;
        case 6:
            day_name = "Thứ bảy";
    }
    console.log(day_name + ">>>" + current_day);
    return day_name;
}


// lấy thông tin giỏ hàng nếu không có giỏ hàng thì sẽ tạo giỏi hàng mới
exports.getReceiptById = async (id) => {
    let receipt = await receiptService.getReceiptsCart(id);
    if (!receipt) {
        await this.insert(id);
        receipt = await receiptService.getReceiptsCart(id);
    }
    console.log("<>>2<><>" + receipt + "><><><><>");
    return receipt;
}


exports.getReceiptsForOneProduct = async (selectedId) => {
    let receipts = await receiptService.getReceipts();
    receipts = receipts.map(item => {
        item = {
            _id: item._id,
            quantity: item.quantity,
            price: item.price,
            selected: item._id.toString() == selectedId.toString()
        }
        return item;
    })
    return receipts;
}

// lấy thông tin giỏ hàng theo user
exports.getReceiptsCart = async (id) => {
    let item = await receiptService.getReceiptsCart(id);
    console.log(item);
    if (item) {
        item = {
            _id: item._id,
            userid: item.UserId,
            date: item.date,
            summoney: item.SumMoney,
            isbill: item.IsBill
        }
    };
    return item;
}
exports.insert = async (UserId) => {
    let date = new Date();
    let IsBill = false;
    let SumMoney = 0;
    let body = { UserId, date, SumMoney, IsBill }
    const data = await receiptService.insert(body);
    return data;
}

exports.delete = async (id) => {
    await receiptService.delete(id);
}

exports.update = async (id, receipt) => {
    return await receiptService.update(id, receipt);
}