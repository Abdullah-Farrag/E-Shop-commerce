const fs = require("fs");

const products = [];
const baseProducts = [
    {
        name: "Wireless Headphones",
        shortDescription: "Noise-cancelling headphones",
        fullDescription: "High quality wireless headphones with long battery life.",
        price: 99.99,
        image: "/images/products/2.jpg",
        inStock: true,
    },
    {
        name: "Smart Watch",
        shortDescription: "Fitness and notifications",
        fullDescription: "Track your steps, monitor your heart rate, and stay connected.",
        price: 149.99,
        image: "/images/products/5.jpg",
        inStock: false,
    },
    {
        name: "Laptop Pro",
        shortDescription: "Powerful performance",
        fullDescription: "High-end laptop suitable for work, gaming, and creative tasks.",
        price: 1199.99,
        image: "/images/products/4.jpg",
        inStock: true,
    },
    {
        name: "Smartphone X",
        shortDescription: "Latest smartphone model",
        fullDescription: "Experience cutting-edge technology with a brilliant camera.",
        price: 899.99,
        image: "/images/products/7.jpg",
        inStock: true,
    },
    {
        name: "Sneakers",
        shortDescription: "Stylish and comfortable",
        fullDescription: "Trendy sneakers combining design with lasting comfort.",
        price: 79.99,
        image: "/images/products/1.jpg",
        inStock: true,
    },
    {
        name: "Backpack",
        shortDescription: "Durable and spacious",
        fullDescription: "Versatile backpack for school, work, or travel.",
        price: 59.99,
        image: "/images/products/3.jpg",
        inStock: false,
    },
];

for (let i = 1; i <= 100; i++) {
    const base = baseProducts[(i - 1) % baseProducts.length];
    products.push({
        id: i,
        name: `${base.name} #${i}`,
        shortDescription: base.shortDescription,
        fullDescription: base.fullDescription,
        price: base.price + (i % 10) * 5,
        currency: "$",
        image: base.image,
        inStock: i % 3 !== 0,
    });
}

fs.writeFileSync("./src/data/products.json", JSON.stringify(products, null, 2));
console.log("✅ products.json with 100 products generated!");
