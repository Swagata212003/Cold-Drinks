
var tl = gsap.timeline({scrollTrigger:{
    trigger: ".two",
    start: "0% 95%",
    end: "70% 50%",
    scrub: true,
    // markers: true,
}})

tl.to("#fanta",{
    top: "120%",
    left: "0%"
}, 'orange')
tl.to("#orange-cut",{
    top:"160%",
    left: "23%"
}, 'orange')
tl.to("#orange",{
    width: "15%",
    top:"160%",
    right: "10%"
}, 'orange')
tl.to("#leaf",{
    top:"110%",
    rotate: "130deg",
    left: "70%"
}, 'orange')
tl.to("#leaf2",{
    top:"110%",
    rotate: "130deg",
    left: "0%"
}, 'orange')


var tl2 = gsap.timeline({scrollTrigger:{
    trigger: ".three",
    start: "0% 95%",
    end: "20% 50%",
    scrub: true,
    // markers: true,
}})

tl2.from(".lemon1",{
    rotate: "-90deg",
    left: "-100%",
    top: "110%"
}, 'ca')
tl2.from("#cocacola",{
    rotate: "-90deg",
    top: "110%",
    left: "-100%",
}, 'ca')

tl2.from(".lemon2",{
    rotate: "90deg",
    left: "100%",
    top: "110%"
}, 'ca')
tl2.from("#pepsi",{
    rotate: "90deg",
    top: "110%",
    left: "100%",
}, 'ca')

tl2.to("#orange-cut",{
    width:"18%",
    left: "42%",
    top: "204%"
}, 'ca')
tl2.to("#fanta",{
    width:"35%",
    top: "210%",
    left: "33%",
}, 'ca')





document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    const menuIcon = document.querySelector(".ri-menu-fill");
    const menu = document.querySelector(".cntr-nav");

    // Shrink navbar on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    // Toggle mobile menu
    menuIcon.addEventListener("click", () => {
        menu.classList.toggle("open");
    });
});





//multicart
document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        const cartContainer = document.getElementById("cart-items");
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                cartContainer.innerHTML += `
                    <div class="cart-item">
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                        <button onclick="removeItem(${index})">Remove</button>
                    </div>
                `;
            });
        }

        document.getElementById("total-price").innerText = `$${total.toFixed(2)}`;
    }

    window.addToCart = function (name, price) {
        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };

    window.updateQuantity = function (index, quantity) {
        cart[index].quantity = parseInt(quantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };

    renderCart();
});


//stripe
document.getElementById("checkout-btn").addEventListener("click", function () {
    fetch("/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: JSON.parse(localStorage.getItem("cart")) })
    })
    .then(res => res.json())
    .then(data => {
        window.location.href = data.url;
    })
    .catch(error => console.error("Error:", error));
});








// GSAP Animations for Cards
gsap.from(".card", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1.5,
    ease: "power2.out",
  });
  
  // Hover Effect for Cards (Scale and Glow)
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.1,
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        duration: 0.3,
        ease: "power1.out"
      });
    });
  
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.3,
        ease: "power1.in"
      });
    });
  });
  
  // Button Animation on Hover
  const buttons = document.querySelectorAll('.card button');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.1,
        backgroundColor: "#d1341d",  // Darken the button on hover
        duration: 0.2,
        ease: "power1.out"
      });
    });
  
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        backgroundColor: "#e04428",  // Original color
        duration: 0.2,
        ease: "power1.in"
      });
    });
  });
  
  // Optional: Add Floating Animation to Cards for Subtle Movement
  cards.forEach((card, index) => {
    gsap.to(card, {
      y: "+=10",  // Slight floating effect
      repeat: -1,  // Infinite repeat
      yoyo: true,  // Yoyo effect to move back and forth
      duration: 2 + (index * 0.5),  // Different timing for each card for a staggered effect
      ease: "power1.inOut",
      delay: index * 0.5  // Stagger the start time of the animations
    });
  });
  