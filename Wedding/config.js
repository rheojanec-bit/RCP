/**
 * config.js
 * ---------------------------------------------------------------------------
 * Single source of truth for the Glenn & Randy wedding invitation website.
 * Edit the values below — index.html / script.js read everything from here.
 * ---------------------------------------------------------------------------
 */

window.WEDDING_CONFIG = {

  couple: {
    brideFirstName: "Glenn",
    groomFirstName: "Randy",
    coupleMonogram: "G & R",
    heroTagline: "Together with our families, we joyfully invite you to celebrate our wedding.",
    heroImage: "assets/images/couple-hero.svg", // Replace with your own photo, e.g. assets/images/couple-hero.jpg
  },

  wedding: {
    displayDate: "August 25, 2026",
    // ISO date used by the countdown + calendar logic — keep in sync with displayDate above.
    countdownDate: "2026-08-25T15:00:00+08:00",
    bibleVerseTop: "“Isaiah 60:22 — When the time is right, I, the Lord, will make it happen.”",
  },

  venue: {
    ceremony: {
      name: "Grand Palmera Hotel",
      time: "3:00 PM",
      address: "Grand Palmera Hotel, Address Line 1, City, Province", // EDIT ME
      mapsLink: "https://maps.google.com/?q=Grand+Palmera+Hotel", // EDIT ME
      mapsEmbedUrl: "https://maps.google.com/maps?q=Grand%20Palmera%20Hotel&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
    reception: {
      name: "Grand Palmera Hotel",
      time: "5:00 PM",
      address: "Grand Palmera Hotel, Address Line 1, City, Province", // EDIT ME
      mapsLink: "https://maps.google.com/?q=Grand+Palmera+Hotel", // EDIT ME
      mapsEmbedUrl: "https://maps.google.com/maps?q=Grand%20Palmera%20Hotel&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
  },

  entourage: {
    parents: {
      brideParents: ["Mr. Roberto Santos", "Mrs. Ligaya Santos"],
      groomParents: ["Mr. Ramon Villareal", "Mrs. Corazon Villareal"],
    },
    principalSponsors: [
      { male: "Mr. Antonio Reyes", female: "Mrs. Elena Reyes" },
      { male: "Mr. Francisco Cruz", female: "Mrs. Amelia Cruz" },
      { male: "Mr. Miguel Torres", female: "Mrs. Isabel Torres" },
      { male: "Mr. Daniel Ramos", female: "Mrs. Beatriz Ramos" },
      { male: "Mr. Gabriel Ortiz", female: "Mrs. Camila Ortiz" },
    ],
    ninong: ["Mr. Victor Aquino", "Mr. Rafael Mendoza"],
    ninang: ["Mrs. Teresa Aquino", "Mrs. Patricia Mendoza"],
    bestMan: "Marco Villareal",
    maidOfHonor: "Sofia Santos",
    bridesmaids: ["Andrea Lopez", "Bianca Fernandez", "Claire Navarro", "Diana Salazar"],
    groomsmen: ["Ethan Bautista", "Felipe Domingo", "Gerard Castillo", "Harold Espino"],
    ringBearer: "Lucas Villareal",
    bibleBearer: "Noah Santos",
    coinBearer: "Mateo Reyes",
    flowerGirls: ["Mia Cruz", "Zoe Torres"],
  },

  programFlow: [
    { time: "2:30 PM", title: "Guest Arrival", icon: "arrival" },
    { time: "2:50 PM", title: "Processional", icon: "processional" },
    { time: "3:00 PM", title: "Wedding Ceremony", icon: "rings" },
    { time: "4:00 PM", title: "Photo Session", icon: "camera" },
    { time: "4:30 PM", title: "Cocktail Hour", icon: "cocktail" },
    { time: "5:00 PM", title: "Grand Entrance", icon: "entrance" },
    { time: "5:15 PM", title: "Couple's First Dance", icon: "dance" },
    { time: "5:30 PM", title: "Welcome Remarks", icon: "mic" },
    { time: "5:45 PM", title: "Dinner", icon: "dinner" },
    { time: "6:15 PM", title: "Toasts", icon: "toast" },
    { time: "6:30 PM", title: "Cake Cutting", icon: "cake" },
    { time: "6:45 PM", title: "Games", icon: "games" },
    { time: "7:00 PM", title: "Bouquet Toss", icon: "bouquet" },
    { time: "7:15 PM", title: "Closing Message", icon: "message" },
    { time: "7:30 PM", title: "Send-off", icon: "sendoff" },
  ],

  dressCode: {
    subtitle: "We kindly request our guests to wear formal attire in shades of blue.",
    ladies: ["Mismatched Blue Gowns", "Cocktail Dress", "Soft Chiffon Dress"],
    gentlemen: ["Navy Suit", "Barong Tagalog", "Dusty Blue Tie"],
  },

  motif: [
    { name: "Navy", hex: "#2C3B5C" },
    { name: "Dusty Blue", hex: "#7FA7C6" },
    { name: "Powder Blue", hex: "#B7C6E0" },
    { name: "Ivory White", hex: "#F8F6F2" },
  ],

  bibleVerse: {
    text: "And now these three remain: faith, hope and love. But the greatest of these is love.",
    reference: "1 Corinthians 13:13",
  },

  // width/height mirror each image's real intrinsic size so the browser can
  // reserve the correct box before it loads (prevents layout shift in the masonry grid).
  gallery: [
    { src: "assets/gallery/gallery-1.svg", alt: "Glenn & Randy — moment one", width: 400, height: 420 },
    { src: "assets/gallery/gallery-2.svg", alt: "Glenn & Randy — moment two", width: 400, height: 560 },
    { src: "assets/gallery/gallery-3.svg", alt: "Glenn & Randy — moment three", width: 400, height: 480 },
    { src: "assets/gallery/gallery-4.svg", alt: "Glenn & Randy — moment four", width: 400, height: 620 },
    { src: "assets/gallery/gallery-5.svg", alt: "Glenn & Randy — moment five", width: 400, height: 500 },
    { src: "assets/gallery/gallery-6.svg", alt: "Glenn & Randy — moment six", width: 400, height: 440 },
  ],

  rsvp: {
    deadline: "August 1, 2026",
    contactNumber: "+63 900 000 0000", // EDIT ME
    contactEmail: "glennandrandy2026@example.com", // EDIT ME
    mealOptions: ["Chicken", "Beef", "Fish", "Vegetarian"],
    // Netlify Forms picks this up automatically once deployed (form name="rsvp" in index.html).
    // If you prefer a third-party endpoint (Formspree, Getform, etc.) set it here and script.js will POST to it instead.
    formEndpoint: "",
  },

  gift: {
    title: "Your Presence Is the Greatest Gift",
    message: "Your love, prayers, and presence are the greatest gifts we could ask for. Should you wish to bless us further, a monetary gift would be sincerely appreciated.",
    gcashName: "Glenn D.", // EDIT ME
    gcashNumber: "0900 000 0000", // EDIT ME
    gcashQr: "assets/images/gcash-qr-placeholder.svg", // EDIT ME — replace with your real QR
    bankName: "Bank Name", // EDIT ME
    bankAccountName: "Glenn / Randy", // EDIT ME
    bankAccountNumber: "0000 0000 0000", // EDIT ME
  },

  music: {
    src: "assets/music/wedding-theme.mp3",
    title: "Our Wedding Theme",
  },

  location: {
    mapsEmbedUrl: "https://maps.google.com/maps?q=Grand%20Palmera%20Hotel&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapsLink: "https://maps.google.com/?q=Grand+Palmera+Hotel",
  },

};
