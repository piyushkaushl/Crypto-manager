const cryptocurrencies = [
    { name: "Bitcoin", price: 10000 },
    { name: "Ethereum", price: 3000 },
    { name: "Litecoin", price: 250 },
    { name: "Ripple", price: 500 },
    { name: "Crypto1", price: 2000 },
    { name: "Cardano", price: 1500 },
    { name: "CryptoB", price: 50000 },
    { name: "Polkadot", price: 800 },
    { name: "Stellar", price: 300 },
    { name: "Chainlink", price: 2200 },
    { name: "Uniswap", price: 1000 },
    { name: "Dogecoin", price: 0.5 },
    { name: "Solana", price: 1300 },
    { name: "Monero", price: 400 },
    { name: "Tezos", price: 350 },
    { name: "Cosmos", price: 900 },
    { name: "Aave", price: 500 },
    { name: "Maker", price: 2500 },
    { name: "Compound", price: 750 },
    { name: "Yearn", price: 9000 },
    // Add more cryptocurrencies as needed
];
// Initialize user's holdings and wishlist
let holdings = [];
let wishlist = [];
// Initialize balance
let balance = 100000;
// Function to open tabs
function openTab(tabName) {
    const tabs = document.getElementsByClassName("tabcontent");
    for (let tab of tabs) {
        tab.style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}
// Function to display cryptocurrencies on homepage
function displayCryptocurrencies() {
    const homepage = document.getElementById("homepage");
    homepage.innerHTML = "";
    cryptocurrencies.forEach(crypto => {
        const cryptoElement = document.createElement("div");
        cryptoElement.classList.add("crypto-box"); // Add class for styling
        cryptoElement.innerHTML = `
            <div>
                <span>${crypto.name} - $${crypto.price}</span>
            </div>
            <div>
                <button class="haha" onclick="addToWishlist('${crypto.name}', ${crypto.price})">Add to Wishlist</button>
                <button class="haha" onclick="purchaseCrypto('${crypto.name}', ${crypto.price})">Purchase</button>
            </div>
        `;
        homepage.appendChild(cryptoElement);
    });
}
// Function to add cryptocurrency to wishlist
function addToWishlist(cryptoName, price) {
    if (!wishlist.some(crypto => crypto.name === cryptoName)) {
        wishlist.push({ name: cryptoName, price: price });
        displayWishlist();
        alert(`${cryptoName} added to wishlist. Price: $${price}. Balance: $${balance.toFixed(2)}`);
    } else {
        alert(`${cryptoName} is already in your wishlist.`);
    }
}
// Function to remove cryptocurrency from wishlist
function removeFromWishlist(cryptoName) {
    const index = wishlist.findIndex(crypto => crypto.name === cryptoName);
    if (index !== -1) {
        wishlist.splice(index, 1);
        displayWishlist();
        alert(`${cryptoName} removed from wishlist. Balance: $${balance.toFixed(2)}`);
    } else {
        alert(`${cryptoName} is not in your wishlist.`);
    }
}
// Function to display wishlist
// Function to display wishlist
function displayWishlist() {
    const wishlistTab = document.getElementById("wishlist");
    wishlistTab.innerHTML = "<h4>Wishlist</h4>";
    if (wishlist.length === 0) {
        wishlistTab.innerHTML = "<h4>Wishlist</h4> <p>No contents in wishlist</p>";
    } else {
        wishlist.forEach(crypto => {
            const cryptoElement = document.createElement("div");
            cryptoElement.classList.add("crypto-box"); // Add class for styling
            cryptoElement.innerHTML = `
                <div>
                    <span>${crypto.name} - Price: $${crypto.price}</span>
                </div>
                <div>
                    <button class="haha" onclick="buyFromWishlist('${crypto.name}', ${crypto.price})">Purchase</button>
                    <button class="haha" onclick="removeFromWishlist('${crypto.name}')">Remove</button>
                </div>
            `;
            wishlistTab.appendChild(cryptoElement);
        });
    }
}
// Function to purchase cryptocurrency
function purchaseCrypto(cryptoName, price) {
    const crypto = cryptocurrencies.find(crypto => crypto.name === cryptoName);
    if (crypto) {
        const quantity = prompt(`How many ${cryptoName} do you want to buy? Current price: ${price}. Your balance: $${balance}`);
        if (quantity && !isNaN(quantity) && quantity > 0) {
            const totalPrice = price * quantity;
            if (totalPrice <= balance) {
                const targetDictionary = holdings.find(
                    dict => dict.name === cryptoName
                  ) || { name: cryptoName };
                targetDictionary.quantity += parseFloat(quantity);
                if (!holdings.includes(targetDictionary)) {
                    holdings.push({name:cryptoName,quantity:parseFloat(quantity),pricing:parseFloat(price)});
                  }
                updateHoldings();
                balance -= totalPrice;
                updateBalanceDisplay(); // Update balance display
                alert(`Purchased ${quantity} units of  ${cryptoName}. Remaining balance: $${balance.toFixed(2)}`);
            } else {
                alert("Insufficient balance.");
            }
        } else {
            alert("Invalid quantity entered. Please enter a valid number.");
        }
    }
}
// Function to buy cryptocurrency from wishlist
function buyFromWishlist(cryptoName, price) {
    const index = wishlist.findIndex(crypto => crypto.name === cryptoName);
    if (index !== -1) {
        const crypto = wishlist[index];
        const quantity = prompt(`Enter quantity to buy ${cryptoName} from wishlist:`);
        if (quantity && !isNaN(quantity) && quantity > 0) {
            const totalPrice = price * quantity;
            if (totalPrice <= balance) {
                holdings.push({ name: cryptoName, quantity: parseFloat(quantity),pricing:parseFloat(price) });
                updateHoldings();
                balance -= totalPrice;
                updateBalanceDisplay(); // Update balance display
                wishlist.splice(index, 1);
                displayWishlist();
                alert(`You purchased ${quantity} ${cryptoName}(s) from wishlist. Remaining balance: $${balance.toFixed(2)}`);
            } else {
                alert("Insufficient balance.");
            }
        } else {
            alert("Invalid quantity entered. Please enter a valid number.");
        }
    } else {
        alert(`${cryptoName} is not in your wishlist.`);
    }
}
function updateHoldings() {
    const holdingsTab = document.getElementById("holdings");
    holdingsTab.innerHTML = "<h4>Holdings</h4>";
    if (holdings.length === 0) {
        holdingsTab.innerHTML = "<h4>Holdings</h4> <p>No contents in holdings</p>";
    } else {
        holdings.forEach(crypto => {
            const cryptoData = cryptocurrencies.find(c => c.name === crypto.name);
            const totalValue = crypto.quantity * cryptoData.price;
            const cryptoElement = document.createElement("div");
            cryptoElement.classList.add("crypto-box"); // Add class for styling
            cryptoElement.innerHTML = `
                <div>
                    <p>${crypto.name}</p>
                    <p>Quantity: ${crypto.quantity}</p>
                    <p>Purchase Prise: $${crypto.pricing}</p>
                    <p>Current Price: $${(crypto.pricing - Math.random()*400).toFixed(2)}</p>
                    <p style="color:red">Profile/Loss: $ ${(((((crypto.pricing - Math.random()*400)-crypto.pricing)))).toFixed(2)}
                </div>
                <div>
                    <button class="haha" onclick="sellCrypto('${crypto.name}')">Sell</button>
                </div>
            `;
            const totalDisplay = document.createElement('p');
            totalDisplay.textContent = `Purchase Price: ${totalValue.toFixed(2)}`;
            holdingsTab.appendChild(cryptoElement);
            holdingsTab.appendChild(totalDisplay);
        });
    }
}
// Function to sell cryptocurrency
function sellCrypto(cryptoName) {
    const cryptoIndex = holdings.findIndex(crypto => crypto.name === cryptoName);
    if (cryptoIndex !== -1) {
        const crypto = holdings[cryptoIndex];
        const cryptoData = cryptocurrencies.find(crypto => crypto.name === cryptoName);
        const quantity = prompt(`Enter quantity to sell ${cryptoName}:`);
        if (quantity === null) {
            return; // User cancelled the prompt
        }
        if (!isNaN(quantity) && quantity > 0 && quantity <= crypto.quantity) {
            const totalPrice = cryptoData.price * quantity;
            balance += totalPrice; // Update balance
            holdings[cryptoIndex].quantity -= parseFloat(quantity);
            if (crypto.quantity === 0) {
                holdings.splice(cryptoIndex, 1);
            }
            updateHoldings();
            updateBalanceDisplay(); // Update balance display
            alert(`You sold ${quantity} ${cryptoName}(s). Balance: $${balance.toFixed(2)}`);
        } else {
            alert("Invalid quantity entered. Please enter a valid number.");
        }
    } else {
        alert(`${cryptoName} is not in your holdings.`);
    }
}
// Function to update balance display
function updateBalanceDisplay() {
    const balanceElement = document.getElementById("balance");
    balanceElement.textContent = `$${balance.toFixed(2)}`;
}
// Initialize the homepage, wishlist, and holdings
displayCryptocurrencies();
displayWishlist();
openTab("homepage");
updateBalanceDisplay(); // Update balance display initially
// Simulate
