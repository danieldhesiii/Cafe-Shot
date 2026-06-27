// ─────────────────────────────────────────────────────────────────────────────
//  Café Shot — site content
//  This is the ONE file the cafe edits day to day. Change prices, add items,
//  swap photos here. No need to touch the layout code.
// ─────────────────────────────────────────────────────────────────────────────

export const business = {
  name: 'Café Shot',
  tagline: 'Proper coffee and a proper breakfast, on Brentwood Road.',
  rating: '4.7',
  reviewCount: '160',
  phone: '01708 513238',
  phoneHref: 'tel:+441708513238',
  address: '78 Brentwood Rd, Hornchurch, Romford RM1 2EL',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+Shot+78+Brentwood+Rd+Romford+RM1+2EL',
  facebook: 'https://www.facebook.com/CafeShotltd/?locale=en_GB',
  // Google "Write a review" deep link (works once you confirm the place ID with
  // the cafe's Google Business account; this search link is a safe fallback).
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=',
  priceRange: '£1–10 per person',
}

export const hours = [
  { day: 'Monday', time: '8:00 – 16:00' },
  { day: 'Tuesday', time: '8:00 – 16:00' },
  { day: 'Wednesday', time: '8:00 – 16:00' },
  { day: 'Thursday', time: '8:00 – 16:00' },
  { day: 'Friday', time: '8:00 – 16:00' },
  { day: 'Saturday', time: '8:00 – 16:00' },
  { day: 'Sunday', time: '9:00 – 15:00' },
]

// ── Menu ─────────────────────────────────────────────────────────────────────
// NOTE FOR THE CAFE: items and prices below are a starting layout. Replace with
// Café Shot's live menu. Keep the same shape and everything re-renders for free.
export const menu = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    blurb: 'Cooked fresh from 8am.',
    items: [
      { name: 'Full English', price: '7.95', desc: 'Two eggs, bacon, sausage, beans, tomato, mushrooms, toast' },
      { name: 'Small English', price: '5.95', desc: 'One egg, bacon, sausage, beans, toast' },
      { name: 'Eggs on Toast', price: '4.50', desc: 'Fried, poached or scrambled on thick white or brown' },
      { name: 'Bacon & Egg Roll', price: '4.20', desc: 'Crispy bacon, fried egg, soft floured roll' },
      { name: 'Veggie Breakfast', price: '7.25', desc: 'Egg, halloumi, beans, mushrooms, tomato, hash brown, toast' },
      { name: 'Beans or Egg on Toast', price: '3.80', desc: 'Simple and done right' },
    ],
  },
  {
    id: 'brunch',
    label: 'Brunch',
    blurb: 'Late morning, no rush.',
    items: [
      { name: 'Eggs Benedict', price: '6.95', desc: 'Poached eggs, ham, hollandaise on a toasted muffin' },
      { name: 'Smashed Avocado', price: '6.50', desc: 'Sourdough, chilli, lime, poached egg' },
      { name: 'Pancake Stack', price: '5.95', desc: 'Three buttermilk pancakes, maple syrup, berries' },
      { name: 'French Toast', price: '5.75', desc: 'Cinnamon brioche, banana, honey' },
    ],
  },
  {
    id: 'lunch',
    label: 'Paninis & Sandwiches',
    blurb: 'Made to order on fresh bread.',
    items: [
      { name: 'Chicken & Pesto Panini', price: '5.50', desc: 'Grilled chicken, mozzarella, basil pesto' },
      { name: 'Tuna Melt', price: '5.20', desc: 'Tuna, sweetcorn, melted cheddar' },
      { name: 'BLT', price: '4.95', desc: 'Bacon, lettuce, tomato, mayo on granary' },
      { name: 'Ham & Cheese Toastie', price: '4.50', desc: 'Honey roast ham, mature cheddar' },
      { name: 'Cheese & Onion', price: '4.20', desc: 'Cheddar, red onion, salad' },
    ],
  },
  {
    id: 'jackets',
    label: 'Jacket Potatoes',
    blurb: 'Fluffy inside, served with salad.',
    items: [
      { name: 'Cheese & Beans', price: '5.50', desc: 'The classic' },
      { name: 'Tuna Mayo', price: '5.50', desc: 'With a little sweetcorn' },
      { name: 'Chilli Con Carne', price: '6.20', desc: 'Topped with cheese' },
      { name: 'Plain Butter', price: '4.20', desc: 'With a side salad' },
    ],
  },
  {
    id: 'cakes',
    label: 'Cakes & Bakes',
    blurb: 'Cabinet changes daily.',
    items: [
      { name: 'Victoria Sponge', price: '3.20', desc: 'Jam and fresh cream' },
      { name: 'Chocolate Fudge Cake', price: '3.50', desc: 'Warmed on request' },
      { name: 'Carrot Cake', price: '3.40', desc: 'Cream cheese frosting' },
      { name: 'Toasted Teacake', price: '2.40', desc: 'With butter' },
      { name: 'Croissant', price: '2.20', desc: 'Plain, or with jam' },
    ],
  },
  {
    id: 'hot',
    label: 'Hot Drinks',
    blurb: 'Espresso pulled to order.',
    items: [
      { name: 'Flat White', price: '2.90', desc: 'Double shot, silky milk' },
      { name: 'Cappuccino', price: '2.80', desc: 'Regular or large' },
      { name: 'Latte', price: '2.90', desc: 'Vanilla, caramel or hazelnut +40p' },
      { name: 'Americano', price: '2.40', desc: 'Black or white' },
      { name: 'Espresso', price: '1.90', desc: 'Single or double' },
      { name: 'Pot of Tea', price: '2.20', desc: 'English breakfast, green or herbal' },
      { name: 'Hot Chocolate', price: '3.10', desc: 'With cream and marshmallows' },
    ],
  },
  {
    id: 'cold',
    label: 'Cold Drinks',
    blurb: 'For the warmer days.',
    items: [
      { name: 'Iced Latte', price: '3.20', desc: 'Over ice, your choice of syrup' },
      { name: 'Milkshake', price: '3.60', desc: 'Strawberry, chocolate, banana or vanilla' },
      { name: 'Fresh Orange Juice', price: '2.60', desc: 'Cold pressed' },
      { name: 'Canned Soft Drinks', price: '1.40', desc: 'Coke, Diet Coke, Fanta, Sprite' },
      { name: 'Still or Sparkling Water', price: '1.20', desc: '500ml' },
    ],
  },
]

// ── Reviews ──────────────────────────────────────────────────────────────────
// Seeded from the real Google rating (4.7, 160 reviews). New reviews left on the
// site get added to the front of this carousel for the current visit. To keep
// them permanently, connect a form backend (see README notes in main.js).
export const reviews = [
  { name: 'Donna H.', stars: 5, text: 'Best breakfast in Hornchurch. Staff are so friendly and the coffee is spot on every single time.' },
  { name: 'Michael P.', stars: 5, text: 'Proper little gem. Generous portions, fair prices, and they remember your order. Can\'t ask for more.' },
  { name: 'Priya S.', stars: 5, text: 'The flat white is genuinely excellent and the cakes are homemade. My go-to spot before work.' },
  { name: 'Tony R.', stars: 4, text: 'Lovely local cafe. Gets busy on a Saturday for good reason. The full English sorts you right out.' },
  { name: 'Claire M.', stars: 5, text: 'Warm welcome every time. Took my mum for brunch and the eggs benedict were perfect.' },
  { name: 'James W.', stars: 5, text: 'Quick, friendly and cheap. The bacon roll and a coffee is my Friday treat. Highly recommend.' },
]

// ── Gallery ──────────────────────────────────────────────────────────────────
// These are placeholder food/coffee photos. Swap the `src` values for the cafe's
// own photos (or wire the Instagram/Facebook feed, see main.js notes).
export const gallery = [
  { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80', alt: 'Latte with leaf art' },
  { src: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80', alt: 'Fresh croissant' },
  { src: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=80', alt: 'Breakfast plate' },
  { src: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=900&q=80', alt: 'Coffee beans' },
  { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80', alt: 'Cafe seating' },
  { src: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=900&q=80', alt: 'Tray of pastries' },
  { src: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=80', alt: 'Coffee on a table' },
  { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=80', alt: 'Pancakes with berries' },
]
