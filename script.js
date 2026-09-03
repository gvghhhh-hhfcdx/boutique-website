/* =========================================================
   ELA BOUTIQUE - SCRIPT.JS
   Common JavaScript for the complete website
   ========================================================= */


/* =========================================================
   1. PRODUCT DATA
   ========================================================= */

const products = {
    dress1: {
        id: "dress1",
        name: "Ivory Embroidered Kurta",
        price: 1499,
        image: "image/dress1.jpg",
        category: "Ethnic Wear"
    },

    dress2: {
        id: "dress2",
        name: "Elegant Floral Dress",
        price: 1799,
        image: "image/dress2.jpg",
        category: "Party Wear"
    },

    dress3: {
        id: "dress3",
        name: "Royal Ethnic Anarkali",
        price: 2199,
        image: "image/dress3.jpg",
        category: "Anarkali"
    },

    dress4: {
        id: "dress4",
        name: "Classic Designer Kurta",
        price: 1699,
        image: "image/dress4.jpg",
        category: "Designer Wear"
    },

    dress5: {
        id: "dress5",
        name: "Festive Embroidered Dress",
        price: 2299,
        image: "image/dress5.jpg",
        category: "Festive Wear"
    },

    dress6: {
        id: "dress6",
        name: "Elegant Contemporary Dress",
        price: 1899,
        image: "image/dress6.jpg",
        category: "Contemporary"
    },

    dress7: {
        id: "dress7",
        name: "Graceful Traditional Wear",
        price: 2099,
        image: "image/dress7.jpg",
        category: "Traditional Wear"
    },

    dress8: {
        id: "dress8",
        name: "Indo-Western Sharara",
        price: 2399,
        image: "image/dress8.jpg",
        category: "Indo-Western"
    }
};


/* =========================================================
   2. GET CART FROM LOCAL STORAGE
   ========================================================= */

function getCart() {

    const savedCart = localStorage.getItem("elaCart");

    if (savedCart) {
        try {
            return JSON.parse(savedCart);
        } catch (error) {
            console.error("Unable to read cart:", error);
            return [];
        }
    }

    return [];
}


/* =========================================================
   3. SAVE CART
   ========================================================= */

function saveCart(cart) {

    localStorage.setItem(
        "elaCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   4. ADD PRODUCT TO CART
   ========================================================= */

function addToCart(productId) {

    const product = products[productId];

    if (!product) {
        return;
    }

    const cart = getCart();

    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            category: product.category,

            quantity: 1

        });

    }


    saveCart(cart);

    updateCartCount();

    showMessage(
        product.name + " added to cart!"
    );

}


/* =========================================================
   5. REMOVE PRODUCT
   ========================================================= */

function removeFromCart(productId) {

    let cart = getCart();

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart(cart);

    displayCart();

    updateCartCount();

}


/* =========================================================
   6. CHANGE QUANTITY
   ========================================================= */

function changeQuantity(productId, change) {

    const cart = getCart();

    const item = cart.find(
        product => product.id === productId
    );


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart(cart);

    displayCart();

    updateCartCount();

}


/* =========================================================
   7. CALCULATE CART TOTAL
   ========================================================= */

function calculateSubtotal(cart) {

    return cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );

}


/* =========================================================
   8. FORMAT PRICE
   ========================================================= */

function formatPrice(amount) {

    return "₹" + amount.toLocaleString("en-IN");

}


/* =========================================================
   9. UPDATE CART COUNT
   ========================================================= */

function updateCartCount() {

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    const cartLinks =
        document.querySelectorAll(
            'a[href="cart.html"]'
        );


    cartLinks.forEach(link => {

        if (
            !link.querySelector(".cart-count")
        ) {

            const count =
                document.createElement("span");

            count.className =
                "cart-count";

            link.appendChild(count);

        }


        const count =
            link.querySelector(".cart-count");

        count.textContent =
            totalItems;

    });

}


/* =========================================================
   10. DISPLAY CART
   ========================================================= */

function displayCart() {

    const cartContainer =
        document.querySelector(".cart-items");

    if (!cartContainer) {
        return;
    }


    const cart = getCart();


    /* Empty Cart */

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛍️
                </div>

                <h2>
                    Your Cart Is Empty
                </h2>

                <p>
                    You haven't added any dresses yet.
                    Explore our collection and find something beautiful.
                </p>

                <a href="dress.html"
                   class="shop-button">

                    Explore Collection

                </a>

            </div>

        `;


        updateOrderSummary();

        return;

    }


    cartContainer.innerHTML = `

        <div class="cart-heading">

            <h2>
                Your Items
            </h2>

            <span>
                ${cart.reduce(
                    (sum, item) =>
                        sum + item.quantity,
                    0
                )} Items
            </span>

        </div>

    `;


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-product-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-product-details">

                <span class="dress-category">
                    ${item.category}
                </span>

                <h3>
                    ${item.name}
                </h3>

                <strong class="cart-price">
                    ${formatPrice(item.price)}
                </strong>

            </div>


            <div class="quantity-box">

                <label>
                    Quantity
                </label>

                <div class="quantity-controls">

                    <button
                        type="button"
                        onclick="changeQuantity('${item.id}', -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        onclick="changeQuantity('${item.id}', 1)">
                        +
                    </button>

                </div>

            </div>


            <div class="cart-total">

                <strong>
                    ${formatPrice(
                        item.price * item.quantity
                    )}
                </strong>

                <button
                    type="button"
                    class="remove-button"
                    onclick="removeFromCart('${item.id}')">

                    Remove

                </button>

            </div>

        `;


        cartContainer.appendChild(cartItem);

    });


    const continueShopping =
        document.createElement("div");

    continueShopping.className =
        "continue-shopping";

    continueShopping.innerHTML = `

        <a href="dress.html"
           class="outline-button">

            ← Continue Shopping

        </a>

    `;

    cartContainer.appendChild(
        continueShopping
    );


    updateOrderSummary();

}


/* =========================================================
   11. UPDATE ORDER SUMMARY
   ========================================================= */

function updateOrderSummary() {

    const cart = getCart();

    const subtotal =
        calculateSubtotal(cart);

    const delivery =
        subtotal > 0 ? 100 : 0;

    const discount =
        subtotal > 0 ? 100 : 0;

    const total =
        subtotal + delivery - discount;


    /* Cart page */

    const summary =
        document.querySelector(
            ".order-summary"
        );


    if (summary) {

        const rows =
            summary.querySelectorAll(
                ".summary-row"
            );


        if (rows.length >= 3) {

            rows[0].children[1].textContent =
                formatPrice(subtotal);

            rows[1].children[1].textContent =
                formatPrice(delivery);

            rows[2].children[1].textContent =
                "− " + formatPrice(discount);

        }


        const totalElement =
            summary.querySelector(
                ".summary-total strong"
            );


        if (totalElement) {

            totalElement.textContent =
                formatPrice(total);

        }

    }


    /* Payment page */

    const paymentSummary =
        document.querySelector(
            ".payment-summary"
        );


    if (paymentSummary) {

        const rows =
            paymentSummary.querySelectorAll(
                ".payment-summary-row"
            );


        if (rows.length >= 3) {

            rows[0].children[1].textContent =
                formatPrice(subtotal);

            rows[1].children[1].textContent =
                formatPrice(delivery);

            rows[2].children[1].textContent =
                "− " + formatPrice(discount);

        }


        const totalElement =
            paymentSummary.querySelector(
                ".payment-total strong"
            );


        if (totalElement) {

            totalElement.textContent =
                formatPrice(total);

        }

    }

}


/* =========================================================
   12. SHOW MESSAGE
   ========================================================= */

function showMessage(message) {

    const oldMessage =
        document.querySelector(
            ".cart-message"
        );


    if (oldMessage) {
        oldMessage.remove();
    }


    const messageBox =
        document.createElement("div");

    messageBox.className =
        "cart-message";


    messageBox.textContent =
        message;


    document.body.appendChild(
        messageBox
    );


    setTimeout(() => {

        messageBox.classList.add(
            "show"
        );

    }, 50);


    setTimeout(() => {

        messageBox.classList.remove(
            "show"
        );

        setTimeout(() => {

            messageBox.remove();

        }, 300);

    }, 2500);

}


/* =========================================================
   13. ADD TO CART BUTTONS
   ========================================================= */

function setupAddToCartButtons() {

    const buttons =
        document.querySelectorAll(
            ".add-to-cart"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    this.dataset.product;

                addToCart(productId);

            }
        );

    });

}


/* =========================================================
   14. CONTACT FORM
   ========================================================= */

function setupContactForm() {

    const form =
        document.querySelector(
            ".contact-form"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                );


            if (name && name.value.trim()) {

                showMessage(
                    "Thank you, " +
                    name.value.trim() +
                    "! Your message has been received."
                );

            } else {

                showMessage(
                    "Thank you! Your message has been received."
                );

            }


            form.reset();

        }
    );

}


/* =========================================================
   15. PAYMENT FORM
   ========================================================= */

function setupPaymentForm() {

    const form =
        document.querySelector(
            ".payment-form form"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const cart =
                getCart();


            if (cart.length === 0) {

                showMessage(
                    "Your cart is empty. Please add a dress first."
                );

                return;

            }


            const name =
                document.getElementById(
                    "fullname"
                );


            const customerName =
                name
                    ? name.value.trim()
                    : "Customer";


            showMessage(
                "Thank you, " +
                customerName +
                "! Your order has been placed successfully."
            );


            /* Clear cart after order */

            localStorage.removeItem(
                "elaCart"
            );


            updateCartCount();

        }
    );

}


/* =========================================================
   16. PAYMENT METHOD DISPLAY
   ========================================================= */

function setupPaymentMethods() {

    const paymentOptions =
        document.querySelectorAll(
            'input[name="payment"]'
        );


    const paymentBoxes =
        document.querySelectorAll(
            ".payment-box"
        );


    if (
        paymentOptions.length === 0
    ) {
        return;
    }


    function updatePaymentDisplay() {

        paymentBoxes.forEach(
            box => {
                box.style.display =
                    "none";
            }
        );


        const selected =
            document.querySelector(
                'input[name="payment"]:checked'
            );


        if (!selected) {
            return;
        }


        if (
            selected.value === "upi"
        ) {

            const upiBox =
                document.querySelector(
                    ".payment-box:first-of-type"
                );

            if (upiBox) {
                upiBox.style.display =
                    "block";
            }

        }


        if (
            selected.value === "card"
        ) {

            const boxes =
                document.querySelectorAll(
                    ".payment-box"
                );

            if (boxes[1]) {
                boxes[1].style.display =
                    "block";
            }

        }

    }


    paymentOptions.forEach(
        option => {

            option.addEventListener(
                "change",
                updatePaymentDisplay
            );

        }
    );


    updatePaymentDisplay();

}


/* =========================================================
   17. INITIALIZE WEBSITE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        setupAddToCartButtons();

        displayCart();

        setupContactForm();

        setupPaymentForm();

        setupPaymentMethods();

    }
);