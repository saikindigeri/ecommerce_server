const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.resolve(__dirname, 'database.db');
let db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the SQLite database.');
        seedProducts();
    }
});

const seedProducts = () => {
  const products=  [
        {
          "id": 1,
          "name": "Wireless Bluetooth Headphones",
          "description": "Experience superior sound quality with our wireless Bluetooth headphones. Designed with advanced noise-cancelling technology, these over-ear headphones provide a comfortable fit and exceptional audio clarity. With a long-lasting battery that supports up to 30 hours of playtime, you can enjoy your favorite music, podcasts, and movies without interruptions. The built-in microphone ensures clear hands-free calls, making them perfect for both entertainment and professional use.",
          "price": 89.99,
          "stock": 150,
          "image_url": "https://images.unsplash.com/photo-1520975910876-72f8a59f3c1ehttps://m.media-amazon.com/images/I/315vj6oj-FL._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 2,
          "name": "Smartwatch",
          "description": "Our multifunctional smartwatch is the ultimate accessory for staying connected and tracking your health. Equipped with a sleek touchscreen display, it offers notifications for calls, messages, and apps right on your wrist. The built-in fitness tracker monitors your heart rate, steps, and sleep patterns, while its GPS functionality helps you navigate and map your runs. Compatible with both iOS and Android, this smartwatch seamlessly integrates into your daily routine, keeping you informed and motivated.",
          "price": 199.99,
          "stock": 100,
          "image_url": "https://m.media-amazon.com/images/I/41HLMvalT6L._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 3,
          "name": "4K Ultra HD TV",
          "description": "Transform your living room into a cinematic experience with our 55-inch 4K Ultra HD TV. Featuring stunning resolution and vivid color accuracy, this television provides breathtaking visuals and an immersive viewing experience. The smart TV functionality allows you to access popular streaming services, browse the internet, and enjoy a wide range of entertainment options. With its slim profile and elegant design, it seamlessly fits into any modern home decor, making it a centerpiece of your entertainment setup.",
          "price": 499.99,
          "stock": 30,
          "image_url": "https://res.cloudinary.com/sharp-consumer-eu/image/fetch/w_1100,f_auto,q_auto/https://s3.infra.brandquad.io/accounts-media/SHRP/DAM/origin/a3b0c3c8-6ce9-11ea-aeea-becc10303f49.jpg"
        },
        {
          "id": 4,
          "name": "Gaming Laptop",
          "description": "Take your gaming to the next level with our high-performance gaming laptop. Equipped with a powerful GPU and a fast processor, it delivers exceptional graphics and smooth gameplay for even the most demanding titles. The laptop features a high-resolution display with a fast refresh rate, ensuring that every detail is rendered with stunning clarity. With customizable RGB lighting and an advanced cooling system, this gaming laptop combines performance and style to give you the ultimate gaming experience.",
          "price": 1299.99,
          "stock": 25,
          "image_url": "https://static-ecapac.acer.com/media/catalog/product/a/n/an515-58_rgb_keyboard_nitro_5_gaming_un.qfhsi.002_1.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=500&canvas=500:500"
        },
        {
          "id": 5,
          "name": "Wireless Keyboard and Mouse Set",
          "description": "Upgrade your workspace with our ergonomic wireless keyboard and mouse set. Designed for comfort and efficiency, the keyboard features quiet, responsive keys and an adjustable tilt for optimal typing posture. The matching mouse offers precise tracking and customizable buttons to streamline your workflow. With long battery life and easy wireless connectivity, this set helps reduce cable clutter and enhances your productivity. Ideal for both home and office use, it brings a touch of modern convenience to your computer setup.",
          "price": 49.99,
          "stock": 200,
          "image_url": "https://images.unsplash.com/photo-1558314457-bda5274a7e26https://www.pebblecart.com/cdn/shop/files/Digit001PDP1.jpg?v=1706353533&width=500"
        },
        {
          "id": 6,
          "name": "Smartphone Case",
          "description": "Protect your smartphone with our durable and stylish case, designed to safeguard your device from drops, scratches, and daily wear. Made from high-quality materials, this case features shock-absorbing technology and a precise fit that ensures easy access to all buttons and ports. The sleek design adds minimal bulk while enhancing the overall look of your phone. Available in a variety of colors and patterns, it combines functionality with fashion to keep your smartphone looking new and feeling secure.",
          "price": 15.99,
          "stock": 300,
          "image_url": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTGCBrfwnnREPjKhLVPT12MkaqdLn1_cMDSYFalyvMMXbaungNZvAGMJjNEkirDImbcBkS55aoU-AgYZL92sjWOSfx1hgVkkPPPgjTAHR1y5bf8ioG3OjUVA_0B6qyp6Qn5hIPtTQ&usqp=CAc"
        },
        {
          "id": 7,
          "name": "Portable Charger",
          "description": "Never run out of power on the go with our compact portable charger. Featuring high-capacity battery cells and fast charging technology, this portable charger ensures that your devices stay powered up throughout the day. Its slim design easily fits into your pocket or bag, making it convenient to carry wherever you go. With multiple charging ports, it can charge several devices simultaneously, making it a must-have accessory for travel, work, or emergencies.",
          "price": 29.99,
          "stock": 250,
          "image_url": "https://m.media-amazon.com/images/I/81Qn0AntpJL._SX679_.jpg"
        },
        {
          "id": 8,
          "name": "Fitness Tracker",
          "description": "Stay on top of your health and fitness goals with our advanced fitness tracker. This sleek and lightweight device monitors your heart rate, tracks your steps, and provides insights into your sleep patterns. With customizable workout modes and real-time notifications, it helps you stay motivated and informed throughout your fitness journey. The waterproof design allows you to wear it while swimming or showering, and its long battery life ensures you can track your progress without frequent recharging.",
          "price": 79.99,
          "stock": 140,
          "image_url": "https://m.media-amazon.com/images/I/31h5vMziyqL._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 9,
          "name": "Bluetooth Speaker",
          "description": "Enjoy rich, immersive sound with our portable Bluetooth speaker. Engineered for superior audio performance, it features deep bass, clear mids, and crisp highs that bring your music to life. Its compact and rugged design makes it perfect for outdoor adventures, and the built-in Bluetooth connectivity allows for seamless pairing with your smartphone or tablet. The water-resistant build ensures durability in various weather conditions, making it ideal for beach trips, picnics, and more.",
          "price": 59.99,
          "stock": 180,
          "image_url": "https://m.media-amazon.com/images/I/41yQZFhJ-dL._SY300_SX300_QL70_FMwebp_.jpg"
        },
        {
          "id": 10,
          "name": "Digital Camera",
          "description": "Capture every moment in stunning detail with our high-resolution digital camera. Equipped with interchangeable lenses and advanced imaging technology, this camera delivers exceptional image quality and versatility for both amateur and professional photographers. The intuitive controls and high-definition viewfinder make it easy to frame and shoot your subject, while the built-in Wi-Fi allows for quick sharing and backup of your photos. Ideal for travel, events, and everyday photography, it is a reliable tool for capturing your memories.",
          "price": 899.99,
          "stock": 40,
          "image_url": "https://m.media-amazon.com/images/I/51RCaRoUPKL._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 11,
          "name": "Smart Home Assistant",
          "description": "Transform your home into a smart home with our voice-controlled smart assistant. This device integrates with your home automation system, allowing you to control lights, thermostats, and other smart devices using simple voice commands. The assistant also provides real-time information, such as weather updates, news, and traffic alerts, making it a valuable addition to your daily routine. Its sleek design and high-quality speaker ensure that it blends seamlessly into any room while delivering clear and accurate responses.",
          "price": 99.99,
          "stock": 220,
          "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoJejQbpK5J9wnr6HChFqti9zOalQaSpa_ZA&s"
        },
        {
          "id": 12,
          "name": "Electric Toothbrush",
          "description": "Achieve a superior clean with our advanced electric toothbrush. Featuring multiple brushing modes and a built-in timer, it helps you maintain optimal oral hygiene by ensuring that you brush for the recommended amount of time. The powerful motor delivers high-frequency brushing movements that effectively remove plaque and reduce gum inflammation. The rechargeable battery offers long-lasting performance, and the ergonomic handle ensures a comfortable grip. Ideal for families, this toothbrush comes with multiple brush heads for personalized care.",
          "price": 69.99,
          "stock": 300,
          "image_url": "https://m.media-amazon.com/images/I/41CCVg0c-XL._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 13,
          "name": "Air Purifier",
          "description": "Breathe easier httpswith our high-efficiency air purifier, designed to improve indoor air quality. Featuring a HEPA filter, it effectively captures 99.97% of airborne particles, including dust, pollen, and pet dander. The purifier also includes an activated carbon filter to reduce odors and harmful gases. With multiple fan speeds and a quiet operation, it provides powerful air cleaning without disrupting your daily activities. The smart features, including air quality sensors and a programmable timer, make it a convenient addition to any room.",
          "price": 139.99,
          "stock": 75,
           "image_url": "https://www.reliancedigital.in/medias/PHILIPS-AIR-PURIFIER-AC1217-20-SIMBA-491473020-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3w4MDgxMXxpbWFnZS9qcGVnfGltYWdlcy9oM2IvaGIzLzkwNjIxOTYwNTE5OTguanBnfDY2Yzc1OTE1ZDJhZWMzNmZlYjVjMDg3MDlmZTQ5YTczZWU0MzlmNzZmNWMyYWM3ZDUzNWJjZGY2OTVhOGJhNWY"
        },
        {
          "id": 14,
          "name": "Laptop Stand",
          "description": "Enhance your workspace ergonomics with our adjustable laptop stand. Crafted from durable materials, this stand elevates your laptop to eye level, reducing neck and back strain. The adjustable height and tilt settings allow for customizable positioning, ensuring that you maintain a comfortable and healthy posture while working. Its compact and foldable design makes it easy to transport and store, making it a practical accessory for both home and office use.",
          "price": 39.99,
          "stock": 160,
        "image_url": "https://m.media-amazon.com/images/I/51tmSHBx7PL._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 15,
          "name": "Gaming Console",
          "description": "Dive into a new world of gaming with our next-gen gaming console. Equipped with cutting-edge hardware, including a powerful GPU and fast SSD, it delivers stunning graphics and lightning-fast load times for a seamless gaming experience. The console supports a wide range of exclusive games and multimedia content, making it a versatile entertainment hub for the whole family. With online multiplayer capabilities and a user-friendly interface, it provides hours of immersive gaming and connectivity.",
          "price": 499.99,
          "stock": 60,
          "image_url": "https://m.media-amazon.com/images/I/51WqayzcHnL._SY300_SX300_QL70_FMwebp_.jpg"
        },
        {
          "id": 16,
          "name": "Smart Thermostat",
          "description": "Take control of your home's climate with our energy-saving smart thermostat. Designed to optimize your heating and cooling systems, it learns your preferences and adjusts settings accordingly to maximize comfort and efficiency. The intuitive touchscreen display and remote control features allow you to manage your home's temperature from anywhere using your smartphone. With compatibility for most HVAC systems and easy installation, this thermostat helps reduce energy costs while enhancing your home's comfort.",
          "price": 129.99,
          "stock": 90,
           "image_url": "https://m.media-amazon.com/images/I/51YWnoWYbkL._AC_UF1000,1000_QL80_.jpg"
        },
        {
          "id": 17,
          "name": "Electric Kettle",
          "description": "Boil water quickly and efficiently with our electric kettle. Featuring a rapid boiling function, it heats up water in just minutes, making it perfect for tea, coffee, and instant meals. The variable temperature control allows you to select the ideal temperature for different beverages, while the automatic shut-off function ensures safety by preventing overheating. The kettle's sleek design and ergonomic handle make it easy to use, and its cordless operation provides convenient pouring without tangled cords.",
          "price": 49.99,
          "stock": 200,
          "image_url": "https://m.media-amazon.com/images/I/31gllQBI+FL._SY300_SX300_.jpg"
        },
        {
          "id": 18,
          "name": "Pressure Cooker",
          "description": "Prepare meals quickly and efficiently with our stainless steel pressure cooker. Designed for durability and performance, it features a robust construction and multiple safety mechanisms to ensure safe operation. The pressure cooker allows you to cook a variety of dishes, from soups and stews to meats and grains, in a fraction of the time compared to traditional cooking methods. Its large capacity is perfect for family meals, and the included recipes provide inspiration for delicious and nutritious meals.",
          "price": 89.99,
          "stock": 120,
         "image_url": "https://m.media-amazon.com/images/I/4195cnxbQCL._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 19,
          "name": "Cordless Vacuum Cleaner",
          "description": "Keep your home spotless with our lightweight cordless vacuum cleaner. Featuring powerful suction and a long-lasting battery, it makes cleaning effortless and efficient. The vacuum includes a range of attachments for various surfaces, including carpets, hard floors, and upholstery. Its compact design allows for easy maneuverability and storage, while the removable dustbin simplifies disposal. Ideal for quick cleanups and regular maintenance, this vacuum cleaner is a convenient addition to your home cleaning routine.",
          "price": 199.99,
          "stock": 50,
          "image_url": "https://m.media-amazon.com/images/I/41SOJrXEc6L._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 20,
          "name": "Robot Vacuum",
          "description": "Simplify your cleaning routine with our automated robot vacuum. Equipped with advanced navigation technology, it efficiently cleans your floors while avoiding obstacles and navigating around furniture. The robot vacuum features a high-capacity dustbin and powerful suction for thorough cleaning, and it can be scheduled to clean at specific times using the mobile app. Its slim profile allows it to access hard-to-reach areas, making it a practical solution for maintaining a clean and dust-free home.",
          "price": 299.99,
          "stock": 35,
         "image_url": "https://m.media-amazon.com/images/I/41OSz7T0ptL._SX300_SY300_QL70_FMwebp_.jpg"
        },
        
    
        {
          "id": 28,
          "name": "Wall Art",
          "description": "Add a touch of elegance to your home with our collection of wall art. Featuring a range of artistic styles and themes, each piece is designed to enhance your living space and reflect your personal taste. The high-quality prints are mounted on durable canvases and come ready to hang, making them a convenient and stylish addition to any room. Whether you're looking to create a focal point in your living area or add a personal touch to your bedroom, our wall art collection offers something for every home.",
          "price": 59.99,
          "stock": 90,
        "image_url": "https://m.media-amazon.com/images/I/51Yly12VD8L._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 29,
          "name": "Bookcase",
          "description": "Organize your books and display your favorite items with our elegant bookcase. Featuring multiple shelves and a sturdy construction, it provides ample storage space for books, decor, and more. The versatile design complements various interior styles, from modern to traditional, and the high-quality finish adds a touch of sophistication to your home. Ideal for living rooms, offices, or libraries, this bookcase helps you keep your space tidy and stylish.",
          "price": 119.99,
          "stock": 70,
          "image_url": "https://m.media-amazon.com/images/I/41Qu8cl-wvL._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 30,
          "name": "Dining Table Set",
          "description": "Upgrade your dining experience with our stylish dining table set. Featuring a spacious table and matching chairs, it provides a comfortable and elegant setting for family meals and gatherings. The durable construction and high-quality materials ensure long-lasting use, while the modern design adds a touch of sophistication to your dining area. Available in various finishes and styles, this dining table set is perfect for both casual and formal dining settings.",
          "price": 699.99,
          "stock": 20,
           "image_url": "https://images.durian.in/Durian/durian/product/800x800/456921693548701.jpg?tr=w-938,pr-true"
        },
        {
          "id": 31,
          "name": "Outdoor Grill",
          "description": "Host the perfect outdoor barbecue with our high-performance grill. Designed for ease of use and durability, it features multiple burners and a large cooking surface to accommodate all your grilling needs. The stainless steel construction ensures long-lasting performance and easy cleaning, while the integrated thermometer allows for precise temperature control. Whether you're grilling steaks, burgers, or vegetables, this outdoor grill provides the heat and versatility required for delicious and evenly cooked meals.",
          "price": 349.99,
          "stock": 25,
           "image_url": "https://m.media-amazon.com/images/I/41oHjmHdZwL._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 32,
          "name": "Patio Furniture Set",
          "description": "Enhance your outdoor living space with our comfortable patio furniture set. Featuring plush cushions and a durable frame, it provides a relaxing seating area for enjoying the outdoors. The weather-resistant fabric and sturdy construction ensure that the furniture withstands various weather conditions, making it ideal for year-round use. The set includes a sectional sofa, coffee table, and accent pillows, offering a complete solution for your patio or balcony.",
          "price": 799.99,
          "stock": 15,
          "image_url": "https://dreamlineoutdoorfurniture.com/cdn/shop/products/ezgif-2-33682e1df60d.jpg?v=1630827309&width=1800"
        },
        {
          "id": 33,
          "name": "Travel Backpack",
          "description": "Travel in style and comfort with our versatile travel backpack. Designed for durability and convenience, it features multiple compartments and pockets for organizing your belongings. The padded straps and ergonomic design ensure a comfortable fit, while the water-resistant material protects your gear from the elements. Ideal for business trips, vacations, or daily commutes, this backpack offers ample storage space and easy access to your essentials.",
          "price": 89.99,
          "stock": 110,
         "image_url": "https://m.media-amazon.com/images/I/41hqeb4tcmL._SY300_SX300_.jpg"
        },
        {
          "id": 34,
          "name": "Camping Tent",
          "description": "Enjoy the great outdoors with our spacious camping tent. Designed for comfort and durability, it features a weather-resistant canopy and a sturdy frame to withstand various weather conditions. The tent includes multiple windows and ventilation openings to ensure proper airflow and reduce condensation. With its easy setup and compact design, it is perfect for camping trips, hiking adventures, or outdoor festivals. The included carry bag makes transportation and storage convenient.",
          "price": 159.99,
          "stock": 40,
           "image_url": "https://m.media-amazon.com/images/I/51ITjW1PwDL._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 35,
          "name": "Electric Grill",
          "description": "Cook your favorite grilled dishes indoors with our electric grill. Featuring a non-stick cooking surface and adjustable temperature control, it allows for precise grilling of meats, vegetables, and more. The compact design makes it ideal for small kitchens or apartments, while the removable drip tray ensures easy cleaning. With its rapid heating technology, this electric grill provides a convenient and mess-free alternative to traditional outdoor grilling.",
          "price": 89.99,
          "stock": 95,
          "image_url": "https://m.media-amazon.com/images/I/51RdG4bGxQL._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 36,
          "name": "Instant Pot",
          "description": "Prepare delicious meals quickly with our versatile Instant Pot. This multi-function cooker combines the capabilities of a pressure cooker, slow cooker, rice cooker, and more in one compact appliance. The user-friendly interface and programmable settings make it easy to cook a variety of dishes, from soups and stews to grains and yogurt. With its energy-efficient design and fast cooking times, the Instant Pot is perfect for busy families and home cooks looking for convenience and versatility.",
          "price": 99.99,
          "stock": 55,
          "image_url": "https://m.media-amazon.com/images/I/41LNYLNU28L._SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
          "id": 37,
          "name": "Smart Light Bulbs",
          "description": "Illuminate your home with our smart light bulbs, designed for energy efficiency and convenience. Compatible with popular smart home systems, these bulbs allow you to control your lighting remotely using a smartphone app or voice commands. The adjustable color temperature and dimming options provide customizable lighting to suit any mood or activity. With easy installation and long-lasting performance, these smart light bulbs enhance both the functionality and ambiance of your living spaces.",
          "price": 29.99,
          "stock": 250,
           "image_url": "https://images-eu.ssl-images-amazon.com/images/I/41CVeqmeJpL._AC_UL232_SR232,232_.jpg"
        },
        {
          "id": 38,
          "name": "Digital Picture Frame",
          "description": "Display your favorite photos in a beautiful and dynamic way with our digital picture frame. Featuring a high-resolution display, it showcases your images with vibrant colors and sharp detail. The frame supports various formats and can be updated remotely via Wi-Fi, allowing you to add and change photos effortlessly. With its sleek design and intuitive interface, it makes a thoughtful gift for family and friends, or a stylish addition to your own home decor.",
          "price": 119.99,
          "stock": 60,
           "image_url": "https://m.media-amazon.com/images/I/71LtqG1fIvL._SX425_.jpg"
        },
        {
          "id": 39,
          "name": "Professional Blender",
          "description": "Achieve culinary perfection with our professional-grade blender. Designed for both home cooks and chefs, it features a powerful motor and durable blades for blending, chopping, and pureeing a wide range of ingredients. The variable speed settings and pre-programmed functions offer precision and versatility, making it ideal for creating smoothies, soups, sauces, and more. The easy-to-clean pitcher and sleek design add convenience and style to your kitchen countertop.",
          "price": 159.99,
          "stock": 75,
          "image_url": "https://m.media-amazon.com/images/I/41dvv3rtqlL._SX300_SY300_QL70_FMwebp_.jpg"
        }
  ]
        

    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)');

        products.forEach(product => {
            stmt.run(product.name, product.description, product.price, product.stock, product.image_url);
        });

        stmt.finalize(() => {
            console.log('Dummy data seeded into products table.');
            db.close();
        });
    });
};
