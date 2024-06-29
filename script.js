document.getElementById('startButton').addEventListener('click', function () {
    

    // Create game container
    var gameContainer = document.createElement('div');
    gameContainer.style.position = 'absolute';
    gameContainer.style.top = '50%';
    gameContainer.style.left = '50%';
    gameContainer.style.transform = 'translate(-50%, -50%)';
    gameContainer.style.textAlign = 'center';
    gameContainer.style.width = '50%'; // Adjust the width as needed
    gameContainer.style.height = 'auto'; // Adjust the height as needed
    gameContainer.style.border = '0px solid #000';
    gameContainer.style.overflow = 'hidden'; // Ensures content doesn't overflow
    gameContainer.style.background = '#f0f0f0'; // Background color

    // Create video element
    var video = document.createElement('video');
    video.src = 'video.mp4';
    video.autoplay = true;
    video.loop = true;
    video.muted = false; // Video starts unmuted
    video.style.width = '100%';
    video.style.height = 'auto';

    // Create audio element for background music
    var audio = document.createElement('audio');
    audio.src = 'theme.mp3';
    audio.autoplay = true;
    audio.loop = true;

    // Append video and audio to game container
    gameContainer.appendChild(video);
    gameContainer.appendChild(audio);

    // Create volume slider
    var volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = 0;
    volumeSlider.max = 1;
    volumeSlider.step = 0.01;
    volumeSlider.value = 1;
    volumeSlider.style.width = '15%';
    volumeSlider.style.position = 'absolute';
    volumeSlider.style.bottom = '6%';
    volumeSlider.style.left = '2%';

    // Volume slider event listener
    volumeSlider.addEventListener('input', function () {
        video.volume = parseFloat(volumeSlider.value);
        audio.volume = parseFloat(volumeSlider.value);
    });

    // Append volume slider to game container
    gameContainer.appendChild(volumeSlider);


    // Create spin button
    var spinButton = document.createElement('input');
    spinButton.type = 'button';
    spinButton.value = 'SPIN'; // Optionally set a value to display on the button

    // Apply styles
    spinButton.style.width = '7.5%';
    spinButton.style.height = '10%';
    spinButton.style.position = 'absolute';
    spinButton.style.bottom = '10%';
    spinButton.style.right = '5%';

    // create boarder to cover symbols when falling down
    // Create image element
    var border = document.createElement('img');
    border.src = 'border.png';
    border.classList.add('dropped-image');
    border.style.position = 'absolute';
    border.style.width = '33.9%';
    border.style.height = 'auto';
    border.style.left = '32.7%';
    border.style.top = '23.9%'; // Start above the game container
    border.style.zIndex = 1; // Start above the game container

    // Number of rows for each column
    var rows = [7, 8, 8, 8, 8, 8, 7]; // 7 columns

    var balance = document.createElement('p');
    var tempWin = document.createElement('p');
    var tempImg = document.createElement('img');

    class Finance {
        constructor(money) {
          this.money = money;
          this.CoinValue = 1;
          this.CoinFactor = 0;

          this.tempWinning = 0;
          this.symbolAmount = 0;
          
        }
        // Getter
        get area() {
          return this.money;
        }
        // receive the tempwinning
        receiveMoney() {
            console.log("money "+this.money);
            console.log("temp "+this.tempWinning);
          this.money += this.tempWinning;
          balance.textContent = `BALANCE: ${this.money.toFixed(2)}`;
          this.tempWinning = 0;
        }
        // pay according to the coin value
        payMoney(CoinFactor) {
            this.CoinFactor = CoinFactor;
            if ((this.money - CoinFactor * this.CoinValue) >= 0){
                this.money -= CoinFactor * this.CoinValue;
                balance.textContent = `BALANCE: ${this.money.toFixed(2)}`;
                return true;
            }
            else{
                return false;
            }
        }
        // increases the winning displayed onscrean
        increaseTempWinning(symbol, symbolAmount){
            console.log("tempwinfunction");
            let x = 0;
            switch(symbol){
                case 'silver':
                    x = (this.CoinFactor * this.CoinValue)*0.01*symbolAmount;
                    break;
                case 'turqouise':
                    x = (this.CoinFactor * this.CoinValue)*0.02*symbolAmount;
                    break;
                case 'orange':
                    x = (this.CoinFactor * this.CoinValue)*0.03*symbolAmount;
                    break;
                case 'ruby':
                    x = (this.CoinFactor * this.CoinValue)*0.04*symbolAmount;
                    break; 
                case 'emerald':
                    x = (this.CoinFactor * this.CoinValue)*0.05*symbolAmount;
                    break;
                case 'sapphire':
                    x = (this.CoinFactor * this.CoinValue)*0.06*symbolAmount;
                    break;
                case 'gold':
                    x = (this.CoinFactor * this.CoinValue)*0.09*symbolAmount;
                    break;
                case 'amethyst':
                    x = (this.CoinFactor * this.CoinValue)*0.15*symbolAmount;
                    break;

            }
            tempWin.textContent = 'WIN\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'+symbolAmount+'\u00A0\u00A0X\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'+x.toFixed(2);

            tempImg.src = './symbols/' + String(symbol) + '.png';
            
            console.log("image "+symbol);
            tempWin.style.visibility = 'visible';
            tempImg.style.visibility = 'visible';
            this.tempWinning +=x;
        }

            
    }
        
    // intialize an object of the class finance, this will act as the players wallet
    const finance = new Finance(100.00);
    

    //balance
    balance.textContent = `BALANCE: ${finance.money}`;
    // Apply styles
    balance.style.position = 'absolute';
    balance.style.width = 'auto';
    balance.style.height = 'auto';
    balance.style.position = 'absolute';
    balance.style.bottom = '-3%';
    balance.style.left = '2.5%';
    balance.style.right = 'auto';
    balance.style.color = 'white';
    balance.style.textShadow = '0 0 0.2vw black';  // Add a black outline with 5px blur radius
    balance.style.fontSize = '1.3vw';
    gameContainer.appendChild(balance);

    //temp wins
    tempWin.textContent = 'WIN\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'+finance.symbolAmount+'\u00A0\u00A0X\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'+finance.tempWinning;
    // Apply styles
    tempWin.style.position = 'absolute';
    tempWin.style.width = 'auto';
    tempWin.style.height = 'auto';
    tempWin.style.position = 'absolute';
    tempWin.style.bottom = '-1.5%';
    tempWin.style.left = '30%';
    tempWin.style.right = '31%';
    tempWin.style.color = 'gold';
    tempWin.style.textShadow = '0 0 0.2vw black';  // Add a black outline with 5px blur radius
    tempWin.style.fontSize = '1vw';
    tempWin.style.visibility = 'hidden';
    
    gameContainer.appendChild(tempWin);

    //temp image
    tempImg.classList.add('dropped-image');
    tempImg.style.position = 'absolute';
    tempImg.style.width = '2.7%';
    tempImg.style.height = 'auto';
    tempImg.style.left = '52.3%';
    tempImg.style.top = '94.5%'; // Start above the game container
    tempImg.style.zIndex = 1; // Start above the game container
    tempImg.src = './symbols/' + 'gold' + '.png';
    tempImg.style.visibility = 'hidden';
    gameContainer.appendChild(tempImg);


    // Helper function for delay
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    async function freespins(lotusAmount){
        let freespinsSpins = lotusAmount + 7;
    }

    async function newSymbols(map, rowIds){
        const keys = Array.from(map.keys());
        await delay(1000);

        // Symbols with probability
        var symbols = [
            { name: 'silver', probability: 0.17 },
            { name: 'turqouise', probability: 0.15 },
            { name: 'orange', probability: 0.14 },
            { name: 'ruby', probability: 0.13 },
            { name: 'emerald', probability: 0.12 },
            { name: 'sapphire', probability: 0.115 },
            { name: 'gold', probability: 0.095 },
            { name: 'amethyst', probability: 0.075 },
            { name: 'lotus', probability: 0.005 }
        ];
    
        

        // Width and height of each image
        var imgWidth = 4.4; // Adjust as needed
    
        // Positioning constants
        var initialX = 33; // Initial X position of the first column
        var initialY = 78.5; // Initial Y position of the first column
        var columnGap = 4.7; // Gap between columns
        var rowGap = -7; // Gap between rows
    
        // Counter to track completed animations
        var totalImages = rows.reduce((sum, numRows) => sum + numRows, 0);
        var completedAnimations = 0;
    
        let newIndexList = [0, 7, 15, 23, 31, 39, 47];
    
        // Drop images in each column
        for (var i = 0; i < rows.length; i++) {
            if (i == 1) {
                initialY += 7;
            } else if (i == 6) {
                initialY -= 7;
            }
    
            var numRows = rows[i];
            var x = initialX + i * columnGap;
            var hasCreated = false;
            for (var j = 0; j < numRows; j++) {

                var y = (j * rowGap) + initialY;

                if (j >= rowIds[i].length && j < rows[i]){
                    hasCreated = true;
                    rowIds[i].push(j + newIndexList[i]);

                    // Create image element
                    var img = document.createElement('img');
        
                    // Calculate total probability weight
                    const totalProbability = symbols.reduce((acc, symbol) => acc + symbol.probability, 0);
        
                    // Generate a random number between 0 and totalProbability
                    let randomNumber = Math.random() * totalProbability;
        
                    // Determine which symbol corresponds to the random number
                    let chosenSymbol;
                    for (let symbol of symbols) {
                        if (randomNumber < symbol.probability) {
                            chosenSymbol = symbol;
                            break;
                        }
                        randomNumber -= symbol.probability;
                    }
        
                    const randomSymbol = chosenSymbol.name;
                    const symbolValue = map.get(randomSymbol) ?? createSymbolValues();
                    symbolValue.amount += 1;
                    symbolValue.ids.push(j + newIndexList[i]);
                    map.set(randomSymbol, symbolValue);
        
                    // Now chosenSymbol is the object with the selected symbol and probability
        
                    img.src = './symbols/' + randomSymbol + '.png';
                    img.classList.add('dropped-image');


                    img.style.position = 'absolute';
                    img.style.width = imgWidth + '%';
                    img.style.height = 'auto';
                    img.style.left = x + '%';
                    img.style.top = '23.8%'; // Start above the game container
                    img.id = j + newIndexList[i];

                    // Append image to game container
                    gameContainer.appendChild(img);

                    //console.log('new id: '+ img.id);
                    // Trigger reflow (necessary for CSS transition to take effect)
                    img.offsetHeight; // eslint-disable-line no-unused-expressions
        
                    // Animate the falling effect
                    img.style.transition = 'top 1s ease'; // Animation duration and easing
                    img.style.top = y + '%'; // Move the image to its final position

                }

                
            }
            if (hasCreated == true){
                // Create audio element for column sound
                var columnAudio = document.createElement('audio');
                columnAudio.src = 'columnSound.mp3';
                columnAudio.autoplay = true;
                columnAudio.loop = false;
                gameContainer.appendChild(columnAudio);
            }
                
            // Increment animation delay for next image
            const animationDelay = map.get('lotus').amount > 1 ? 400 : 100; // Adjust the delay as needed (in milliseconds)
            await delay(animationDelay); // Wait for the delay before proceeding to the next iteration
            
        }

        await delay(1000);

    }


    async function dropDown(map, rowIds){

        const keys = Array.from(map.keys());

        let newRows = [rowIds[0].length, rowIds[1].length, rowIds[2].length, rowIds[3].length, rowIds[4].length, rowIds[5].length, rowIds[6].length, ];

        // Width and height of each image
        var imgWidth = 4.4; // Adjust as needed
    
        // Positioning constants
        var initialX = 33; // Initial X position of the first column
        var initialY = 78.5; // Initial Y position of the first column
        var columnGap = 4.7; // Gap between columns
        var rowGap = -7; // Gap between rows
    
        // Counter to track completed animations
        var totalImages = rows.reduce((sum, numRows) => sum + numRows, 0);
        var completedAnimations = 0;
    
        let newIndexList = [0, 7, 15, 23, 31, 39, 47];
        
        // create an array with as many arrays inside as they are symbols
        let tempArrayOfAllSymbolIds = []
        for ( var x = 0; x < keys.length; x++)    {

            tempArrayOfAllSymbolIds.push([]);
        };


        // Drop images in each column
        for (var i = 0; i < rows.length; i++) {
            if (i == 1) {
                initialY += 7;
            } else if (i == 6) {
                initialY -= 7;
            }
    
            var numRows = rows[i];
            var x = initialX + i * columnGap;
    
            for (var j = 0; j < numRows; j++) {

                var y = (j * rowGap) + initialY;

                if (j < rowIds[i].length){
                    const index = rowIds[i].indexOf(rowIds[i][j]);

                    img = document.getElementById(rowIds[i][j]);

                    img.style.position = 'absolute';
                    img.style.width = imgWidth + '%';
                    img.style.height = 'auto';
                    img.style.left = x + '%';
                    img.style.top = '23.8%'; // Start above the game container
                    //console.log('old id: '+ img.id);
                    //console.log('j: '+ j);
                    // update id list in map after each dropdown
                     
                    for ( var z = 0; z < keys.length; z++)    {

                        let value = map.get(keys[z]);
                        if (value.ids.includes(Number(img.id))){
                            console.log("gdsgdsgs")
                            tempArrayOfAllSymbolIds[z].push(index + newIndexList[i]);
                        }
                    }

                    img.id = index + newIndexList[i];
                    //console.log('new id: '+ img.id);
                    // Trigger reflow (necessary for CSS transition to take effect)
                    img.offsetHeight; // eslint-disable-line no-unused-expressions
        
                    // Animate the falling effect
                    img.style.transition = 'top 1s ease'; // Animation duration and easing
                    img.style.top = y + '%'; // Move the image to its final position

                }

                
            }

        }


        for (let i = 0; i < rowIds.length; i++) {
            for (let j = 0; j < rowIds[i].length; j++) {
                rowIds[i][j] = j + newIndexList[i];
            }
        }

        // update id list in map after each dropdown
        for ( var x = 0; x < keys.length; x++)    {

            let value = map.get(keys[x]);
            value.ids = tempArrayOfAllSymbolIds[x];
        }
        console.log("new");
        console.log(tempArrayOfAllSymbolIds);

        await newSymbols(map, rowIds);
        
    }

    async function checkWin(map){
        
        console.log("map:");
        console.log(map);
        const keys = Array.from(map.keys());
        //console.log(keys)
        // Put all Ids in array with 7 arrays, the 7 arrays are the rows
        let rowIds = [
            [0,1,2,3,4,5,6],
            [7,8,9,10,11,12,13,14],
            [15,16,17,18,19,20,21,22],
            [23,24,25,26,27,28,29,30],
            [31,32,33,34,35,36,37,38],
            [39,40,41,42,43,44,45,46],
            [47,48,49,50,51,52,53]
        ];

        

        var check = true;

        //console.log(rowIds);
        while (check){
            for ( i = 0; i < keys.length;)    {

                let value = map.get(keys[i]);
                
                //console.log(keys[i])
                if (value.amount >= 12){
                    
                    ////console.log(key);
                    // Remove existing images if any
                    var existingImages = document.querySelectorAll('.dropped-image');

                    var popAudio = document.createElement('audio');
                    popAudio.src = 'pop.mp3';
                    popAudio.autoplay = true;
                    popAudio.loop = false;
                    await gameContainer.appendChild(popAudio);
                    await delay(10);
                    existingImages.forEach(function (img) {
                    ////console.log(value.ids);
                    ////console.log(img.id);
                    ////console.log((value.ids.includes(img.id)));
                    if (value.ids.includes(Number(img.id)) && img != border && img != tempImg) {
                        ////console.log(key);
                        img.style.transition = '';
                        
                        img.src = 'splashEffect.gif';
                        
                        img.style.width = '8%';
                        //console.log(img.style.width+5);
                        let numberString = img.style.left.replace('%', '');
                        img.style.left = numberString - 1.7 + "%";

                        let numberTopString = img.style.top.replace('%', '');
                        img.style.top = numberTopString - 3 + "%";

                        

                        img.style.zIndex = 1;

                        
                        //img.parentNode.removeChild(img);
                        
                    }
                

                });

                finance.increaseTempWinning(keys[i], value.amount);

                await delay(700);
                existingImages.forEach(function (img) {
                    ////console.log(value.ids);
                    ////console.log(img.id);
                    ////console.log((value.ids.includes(img.id)));
                    if (value.ids.includes(Number(img.id)) && img != border && img != tempImg) {
                        ////console.log(key);
                        

                        let id = Number(img.id);
                        //console.log(id >= 7 && id < 15);
                        switch(true){

                            // row 1
                            case (id >= 0 && id < 7):
                                
                                const index1 = rowIds[0].indexOf(id);

                                if (index1 > -1) { // only set to undefined when item is found
                                    //rowIds[0][index1] = undefined;
                                    rowIds[0].splice(index1, 1);
                                }

                                break;

                            // row 2
                            case (id >= 7 && id < 15):

                                const index2 = rowIds[1].indexOf(id);

                                if (index2 > -1) { // only set to undefined when item is found
                                    //rowIds[1][index2] = undefined;
                                    rowIds[1].splice(index2, 1);
                                }

                                break;

                            // row 3
                            case (id >= 15 && id < 23):

                                const index3 = rowIds[2].indexOf(id);

                                if (index3 > -1) { // only set to undefined when item is found
                                    //rowIds[2][index3] = undefined;
                                    rowIds[2].splice(index3, 1);
                                }
                                
                                break;

                            // row 4
                            case (id >= 23 && id < 31):

                            const index4 = rowIds[3].indexOf(id);

                            if (index4 > -1) { // only set to undefined when item is found
                                //rowIds[3][index4] = undefined;
                                rowIds[3].splice(index4, 1);
                            }
                            
                                break;

                            // row 5
                            case (id >= 31 && id < 39):

                            const index5 = rowIds[4].indexOf(id);

                            if (index5 > -1) { // only set to undefined when item is found
                                //rowIds[4][index5] = undefined;
                                rowIds[4].splice(index5, 1);
                            }
                            
                                break;

                            // row 6
                            case (id >= 39 && id < 47):

                            const index6 = rowIds[5].indexOf(id);

                            if (index6 > -1) { // only set to undefined when item is found
                                //rowIds[5][index6] = undefined;
                                rowIds[5].splice(index6, 1);
                            }
                            
                                break;

                            // row 7
                            case (id >= 47 && id < 54):

                            const index7 = rowIds[6].indexOf(id);

                            if (index7 > -1) { // only set to undefined when item is found
                                //rowIds[6][index7] = undefined;
                                rowIds[6].splice(index7, 1);
                            }
                            
                                break;
                        }

                        

                        img.parentNode.removeChild(img);
                        //value.amount -= 1;
                        
                    }
                    

                });
                //console.log("new list");
                //console.log(rowIds);

                //value.ids = [];
                value.amount = 0;

                //fix order and position in UI
                await dropDown(map, rowIds);
                //await newSymbols(map, rowIds);

                

                //await newSymbols(map, rowIds);

                
                await delay(50);

                


                //break;
                }
                else{
                    i++;
                }
                
            }

            check = false;
            for ( var i = 0; i < keys.length; i++)    {

                let value = map.get(keys[i]);

                if (value.amount >= 12){
                    check = true;
                }
            }
        }

        

        return true;
    }

    // Append image to game container
    gameContainer.appendChild(border);
    const createSymbolValues = () => ({amount: 0, ids: []})

    async function spin() {
        //console.log("Button clicked");
        if(finance.payMoney(1) == false){
            return
        }
        // Disable the button
        spinButton.disabled = true;
    
        // Create audio element for spin sound
        var spinAudio = document.createElement('audio');
        spinAudio.src = 'spinSound.mp3';
        spinAudio.autoplay = true;
        spinAudio.loop = false;
        gameContainer.appendChild(spinAudio);
    
        // Remove existing images if any
        var existingImages = document.querySelectorAll('.dropped-image');
        existingImages.forEach(function (img) {
            if (img != border && img != tempImg) {
                img.parentNode.removeChild(img);
            }
        });
    
        
    
        // Symbols with probability
        var symbols = [
            { name: 'silver', probability: 0.17 },
            { name: 'turqouise', probability: 0.15 },
            { name: 'orange', probability: 0.14 },
            { name: 'ruby', probability: 0.13 },
            { name: 'emerald', probability: 0.12 },
            { name: 'sapphire', probability: 0.115 },
            { name: 'gold', probability: 0.095 },
            { name: 'amethyst', probability: 0.075 },
            { name: 'lotus', probability: 0.005 }
        ];
    
        // For evaluation
        var playerSymbols = new Map([
            ['silver', createSymbolValues()],
            ['turqouise', createSymbolValues()],
            ['orange', createSymbolValues()],
            ['ruby', createSymbolValues()],
            ['emerald', createSymbolValues()],
            ['sapphire', createSymbolValues()],
            ['gold', createSymbolValues()],
            ['amethyst', createSymbolValues()],
            ['lotus', createSymbolValues()]
        ]);
    
        // Width and height of each image
        var imgWidth = 4.4; // Adjust as needed
    
        // Positioning constants
        var initialX = 33; // Initial X position of the first column
        var initialY = 78.5; // Initial Y position of the first column
        var columnGap = 4.7; // Gap between columns
        var rowGap = -7; // Gap between rows
    
        // Counter to track completed animations
        var totalImages = rows.reduce((sum, numRows) => sum + numRows, 0);
        var completedAnimations = 0;
    
        let imageId = 0;
    
        // Drop images in each column
        for (var i = 0; i < rows.length; i++) {
            if (i == 1) {
                initialY += 7;
            } else if (i == 6) {
                initialY -= 7;
            }
    
            var numRows = rows[i];
            var x = initialX + i * columnGap;
    
            for (var j = 0; j < numRows; j++) {
                var y = (j * rowGap) + initialY;
    
                // Create image element
                var img = document.createElement('img');
    
                // Calculate total probability weight
                const totalProbability = symbols.reduce((acc, symbol) => acc + symbol.probability, 0);
    
                // Generate a random number between 0 and totalProbability
                let randomNumber = Math.random() * totalProbability;
    
                // Determine which symbol corresponds to the random number
                let chosenSymbol;
                for (let symbol of symbols) {
                    if (randomNumber < symbol.probability) {
                        chosenSymbol = symbol;
                        break;
                    }
                    randomNumber -= symbol.probability;
                }
    
                const randomSymbol = chosenSymbol.name;
                const symbolValue = playerSymbols.get(randomSymbol);
                symbolValue.amount += 1;
                symbolValue.ids.push(imageId);
                playerSymbols.set(randomSymbol, symbolValue);
    
                // Now chosenSymbol is the object with the selected symbol and probability
    
                img.src = './symbols/' + randomSymbol + '.png';
                img.classList.add('dropped-image');
                img.style.position = 'absolute';
                img.style.width = imgWidth + '%';
                img.style.height = 'auto';
                img.style.left = x + '%';
                img.style.top = '23.8%'; // Start above the game container
                img.id = imageId;
    
                // Append image to game container
                gameContainer.appendChild(img);
    
                // Trigger reflow (necessary for CSS transition to take effect)
                img.offsetHeight; // eslint-disable-line no-unused-expressions
    
                // Animate the falling effect
                img.style.transition = 'top 1s ease'; // Animation duration and easing
                img.style.top = y + '%'; // Move the image to its final position
    
                // Increment the completed animations counter
                img.addEventListener('transitionend', async function() {
                    completedAnimations++;
                    if (completedAnimations === totalImages) {
                        // Re-enable the button after all animations are complete
                        
                        await delay(300);
                        await checkWin(playerSymbols);

                        // freespins
                        if (playerSymbols.get('lotus').amount > 2){
                            await freespins(map.get('lotus').amount);
                        }

                        finance.receiveMoney();
                        tempWin.style.visibility = 'hidden';
                        tempImg.style.visibility = 'hidden';
                        //console.log(playerSymbols);
                        spinButton.disabled = false;
                    }
                });
    
                if (y == 78.5) {
                    // Create audio element for column sound
                    var columnAudio = document.createElement('audio');
                    columnAudio.src = 'columnSound.mp3';
                    columnAudio.autoplay = true;
                    columnAudio.loop = false;
                    gameContainer.appendChild(columnAudio);
                }
    
                // Increment animation delay for next image
                const animationDelay = playerSymbols.get('lotus').amount > 1 ? 200 : 50; // Adjust the delay as needed (in milliseconds)
                await delay(animationDelay); // Wait for the delay before proceeding to the next iteration
    
                imageId += 1;
            }
        }
    };
    

    // Event listener for click event
    spinButton.addEventListener('click', spin);


    // Append volume slider to game container
    gameContainer.appendChild(spinButton);

    // Append game container to body
    document.body.appendChild(gameContainer);
});
