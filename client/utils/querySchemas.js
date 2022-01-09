// function findOneUser(user) {
//     return {
//         status: true,
//         message: "success",
//         toSend: {
//             "find": { "name": user.name }
//         }
//     }
// }
function updateItemQuantity(item, quantity = 1) {
    if (item.quantityInStock > 0) {
        const newQuantity = item.quantityInStock - quantity;
        return {
            status: true,
            message: "success",
            toSend: {
                "filter": { "productName": item.productName },
                "update": { "quantityInStock": newQuantity }
            }
        }
    }
    return { 
        status: false,
        message: "Not enough stock in inventory."
    }
}

function updateUserBalance(user, purchaseCost) {
    if (user.account > purchaseCost) {
        const newBalance = user.account - purchaseCost;
        return {
            status: true,
            message: "Thank you for your purchase",
            toSend: {
                "filter": { "name": user.name },
                "update": { "account": newBalance }
            }
        }
    }
    return { 
        status: false,
        message: "Not money in your account."
    }
}

function recordTransaction(user, item) {
    let txnCount;
    user.transactions && user.transactions.length > 0 ? txnCount = user.transactions.length + 1: txnCount = 1;
    return {
        status: true,
        message: "Thank you for your purchase",
        toSend: {
            "filter": { "name": user.name },
            "update":{ 
                "$push":{
                    "transactions": 
                        {
                        "id": txnCount,
                        "item": {
                            "name": item.productName,
                            "price": item.price,
                            "quantityPurchased": 1 // for now
                        },
                        "totalPrice": item.price // for now
                    } 
                }
            }
        }
    }
}

module.exports = { updateItemQuantity, updateUserBalance, recordTransaction }
