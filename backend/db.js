const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://rohitkarmakar2203:mtv4Ug3Z6tERh3E9@cluster0.02brjvt.mongodb.net/slicemate?retryWrites=true&w=majority"

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected");
        mongoose.connection.db.collection("food_items").find({}).toArray(async function (err, data) {
            const foodCategory = await mongoose.connection.db.collection("foodCategory");
            foodCategory.find({}).toArray(function (err, catData) {
                if (err) {
                    console.error(err);
                } else {
                    global.food_items = data;
                    global.foodCategory = catData;
                }
            })
      
        });
    } catch (error) {
        console.log("---", error);
    }
}

module.exports = mongoDB;
