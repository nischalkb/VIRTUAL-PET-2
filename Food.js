class Food {
    constructor() {
        this.image = loadImage("Milk.png");
    }
    
    getFoodStock() {
        var foodStockRef = database.ref('Food');
        foodStockRef.on("value", (data)=>{
        foodCount = data.val();
        });
    }

    updateFoodStock(foodStockToUpdate) {
        database.ref('/').update({
            Food: foodStockToUpdate
        });
    }

    getFedTime() {
        fedTime = database.ref('LastFed');
        fedTime.on("value", (data)=>{
            LastFed = data.val();
        });
    }

    updateFedTime() {
        database.ref('/').update({
            LastFed: hour()
        });
    }

    async start(){
        var foodRef = await database.ref('food').once("value");
        if(foodRef.exists()) {
            foodCount = foodRef.val();
        }

        var LastFed = await database.ref('LastFed').once("value");
        if(LastFed.exists()) {
            fedTime = LastFed.val();
        }

      }

    display() {
        textSize(15);
        fill("white");
        stroke(1);
        if(fedTime >= 12) {
            text("Last Feed: " + fedTime % 12 + " PM", 30, 50);
        } else if(fedTime === 0){
            text("Last Feed: 12 AM", 30, 50);
        } else {
            text("Last Feed: " + fedTime + " AM", 30, 50);
        }

        var x = 80, y = 100;
        imageMode(CENTER);
        if(foodCount != 0) {
            for(var i = 0; i < foodCount; i++) {
                if(i % 10 === 0) {
                    x = 80;
                    y = y + 50;
                }
                image(milkImg, x, y, 50, 50);
                x = x + 30;
            }
        }
    }

}