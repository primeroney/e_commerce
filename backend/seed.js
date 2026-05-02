const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: 'Apple iPhone 15 Pro Max',
    description: 'The latest iPhone with A17 Pro chip, titanium design, and 48MP camera system. Features USB-C, Action Button, and ProMotion display.',
    price: 134900,
    originalPrice: 159900,
    category: 'Electronics',
    brand: 'Apple',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500'],
    stock: 50,
    rating: 4.8,
    numReviews: 124,
    featured: true,
    tags: ['smartphone', 'apple', 'iphone', '5g']
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Galaxy AI-powered smartphone with S Pen, 200MP camera, and titanium frame. The ultimate Android experience.',
    price: 129999,
    originalPrice: 149999,
    category: 'Electronics',
    brand: 'Samsung',
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'],
    stock: 35,
    rating: 4.7,
    numReviews: 89,
    featured: true,
    tags: ['smartphone', 'samsung', 'android', '5g']
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancelling wireless headphones with Auto NC Optimizer, crystal clear hands-free calling, and Alexa voice control.',
    price: 24990,
    originalPrice: 34990,
    category: 'Electronics',
    brand: 'Sony',
    images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500'],
    stock: 80,
    rating: 4.9,
    numReviews: 203,
    featured: true,
    tags: ['headphones', 'wireless', 'noise-cancelling', 'sony']
  },
  {
    name: 'MacBook Air M3',
    description: '13-inch MacBook Air with M3 chip, 8GB RAM, 256GB SSD. Incredibly thin, light and powerful with all-day battery life.',
    price: 114900,
    originalPrice: 124900,
    category: 'Electronics',
    brand: 'Apple',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
    stock: 25,
    rating: 4.9,
    numReviews: 67,
    featured: true,
    tags: ['laptop', 'apple', 'macbook', 'm3']
  },
  {
    name: "Men's Premium Cotton T-Shirt",
    description: 'Ultra-soft 100% organic cotton t-shirt. Regular fit with crew neck. Available in multiple colors and sizes.',
    price: 799,
    originalPrice: 1299,
    category: 'Clothing',
    brand: 'UrbanThreads',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
    stock: 200,
    rating: 4.3,
    numReviews: 456,
    tags: ['tshirt', 'men', 'cotton', 'casual']
  },
  {
    name: "Women's Floral Kurta",
    description: 'Beautiful floral printed cotton kurta. Perfect for festive occasions and daily wear. Comes with matching dupatta.',
    price: 1499,
    originalPrice: 2499,
    category: 'Clothing',
    brand: 'FabIndia',
    images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500'],
    stock: 150,
    rating: 4.5,
    numReviews: 312,
    featured: false,
    tags: ['kurta', 'women', 'ethnic', 'cotton']
  },
  {
    name: 'The Alchemist',
    description: 'Paulo Coelho\'s masterpiece. A fable about following your dream, read by more than 65 million people worldwide in over 150 countries.',
    price: 299,
    originalPrice: 399,
    category: 'Books',
    brand: 'HarperCollins',
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'],
    stock: 500,
    rating: 4.7,
    numReviews: 1240,
    tags: ['fiction', 'bestseller', 'paulo-coelho', 'novel']
  },
  {
    name: 'Atomic Habits',
    description: 'James Clear reveals practical strategies for forming good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable results.',
    price: 399,
    originalPrice: 599,
    category: 'Books',
    brand: 'Penguin',
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'],
    stock: 300,
    rating: 4.8,
    numReviews: 890,
    featured: true,
    tags: ['self-help', 'habits', 'productivity', 'bestseller']
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip, eco-friendly yoga mat. 6mm thick with alignment lines. Perfect for yoga, pilates and exercise.',
    price: 1299,
    originalPrice: 1999,
    category: 'Sports',
    brand: 'YogaBliss',
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'],
    stock: 120,
    rating: 4.4,
    numReviews: 234,
    tags: ['yoga', 'fitness', 'exercise', 'mat']
  },
  {
    name: 'Nike Air Max 270',
    description: 'Inspired by two icons of big Air: the Air Max 180 and the Air Max 93. Large Air Max cushioning unit for all-day comfort.',
    price: 8995,
    originalPrice: 12995,
    category: 'Clothing',
    brand: 'Nike',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    stock: 75,
    rating: 4.6,
    numReviews: 567,
    featured: true,
    tags: ['shoes', 'nike', 'sneakers', 'running']
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: 'Multi-use pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker and warmer in one appliance.',
    price: 7499,
    originalPrice: 9999,
    category: 'Home & Garden',
    brand: 'Instant Pot',
    images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=500'],
    stock: 60,
    rating: 4.7,
    numReviews: 445,
    featured: true,
    tags: ['kitchen', 'cooker', 'appliance', 'cooking']
  },
  {
    name: 'Boat Airdopes 141',
    description: 'True wireless earbuds with BEAST Mode, 42H playtime, ENx technology for crystal clear calls, and IPX4 water resistance.',
    price: 1299,
    originalPrice: 2990,
    category: 'Electronics',
    brand: 'boAt',
    images: ['https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500'],
    stock: 300,
    rating: 4.2,
    numReviews: 1567,
    tags: ['earbuds', 'wireless', 'boat', 'tws']
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    await Product.deleteMany({});
    await User.deleteMany({});

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@shopify.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create regular user
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'john123',
      role: 'user'
    });

    await Product.insertMany(products);

    console.log('✅ Database seeded!');
    console.log('👤 Admin: admin@shopify.com / admin123');
    console.log('👤 User: john@example.com / john123');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
