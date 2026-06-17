async function loadCourses() {
try {
const response = await fetch(
"https://healing-your-life.onrender.com/api/courses"
);

    const courses = await response.json();

    const container = document.getElementById("courses-container");

    if (!container) return;

    container.innerHTML = "";

    courses.forEach(course => {

        let image = "images/default.jpeg";

        if (course.title.includes("Reiki")) {
            image = "images/reiki.jpeg";
        } else if (course.title.includes("Meditation")) {
            image = "images/meditation.jpeg";
        } else if (course.title.includes("Chakra")) {
            image = "images/chakra.jpeg";
        } else if (course.title.includes("Emotional")) {
            image = "images/emotional.jpeg";
        } else if (course.title.includes("Crystal")) {
            image = "images/crystal.jpeg";
        }

        container.innerHTML += `
            <div class="course-card">
                <img src="${image}" class="course-img">

                <h3>${course.title}</h3>

                <p>${course.description}</p>

                <h4>₹${course.price}</h4>

                <button onclick="payNow(${course.price}, '${course.title.replace(/'/g, "\\'")}')">
                    Buy Now 💳
                </button>

                <button onclick="addToCart(${course.id}, '${course.title.replace(/'/g, "\\'")}', ${course.price})">
                    Add To Cart
                </button>
            </div>
        `;
    });

} catch (error) {
    console.log("LOAD COURSES ERROR:", error);
}

}

if (document.getElementById("courses-container")) {
loadCourses();
}

// =====================
// ADD TO CART
// =====================

async function addToCart(id, title, price) {


const user = localStorage.getItem("user");

if (!user) {
    alert("Please Login First");
    window.location.href = "login.html";
    return;
}

try {

    const response = await fetch(
        "https://healing-your-life.onrender.com/api/cart/add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_email: user,
                course_id: id,
                course_title: title,
                price: price
            })
        }
    );

    const data = await response.json();

    if (data.success) {

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({
            id,
            title,
            price
        });

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert(title + " added to cart!");
    } else {
        alert("Database insert failed");
    }

} catch (error) {
    console.log("CART ERROR:", error);
    alert("Cart Error");
}

}

// =====================
// PAYMENT
// =====================

async function payNow(amount, title) {

const user = localStorage.getItem("user");

if (!user) {
    alert("Please Login First");
    window.location.href = "login.html";
    return;
}

try {

    const response = await fetch(
        "https://healing-your-life.onrender.com/api/payment/create-order",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount })
        }
    );

    const order = await response.json();

    const options = {
        key: "rzp_test_xxxxxxxx",
        amount: order.amount,
        currency: order.currency,
        name: "Healing Your Life",
        description: title,
        order_id: order.id,

        handler: function (response) {

            alert("Payment Successful 🎉");

            localStorage.setItem(
                "lastPayment",
                JSON.stringify(response)
            );
        },

        theme: {
            color: "#3399cc"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();

} catch (error) {
    console.log("PAYMENT ERROR:", error);
}

}

// =====================
// LOGIN
// =====================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch(
            "https://healing-your-life.onrender.com/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        if (data.success) {

            localStorage.setItem(
                "user",
                email
            );

            window.location.href = "index.html";
        }

    } catch (error) {
        console.log(error);
    }
});

}

// =====================
// REGISTER
// =====================

const registerForm =
document.getElementById("registerForm");

if (registerForm) {


registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("regEmail").value;

    const password =
        document.getElementById("regPassword").value;

    try {

        const response = await fetch(
            "https://healing-your-life.onrender.com/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        if (data.success) {
            window.location.href = "login.html";
        }

    } catch (error) {
        console.log(error);
    }
});

}

// =====================
// LOGOUT
// =====================

function logout() {


localStorage.removeItem("user");

alert("Logged Out");

window.location.href = "login.html";

 <script src="./script.js"></script>

}
