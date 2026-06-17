async function addToCart(id, title, price) {

    console.log("ADD TO CART CLICKED");

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
        console.log("CART RESPONSE:", data);
        console.log(data);

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
        }
        else {
            alert("Database insert failed");
        }

    } catch (error) {

        console.log("CART ERROR:", error);
        alert("Cart Error");
    }
}