# 🏡 WanderLust — Airbnb Clone

A full-stack property listing and review platform inspired by Airbnb, built with **Node.js, Express, MongoDB, and EJS**. Users can sign up, browse listings, create their own property listings with images, and leave ratings and reviews.

> 🔗 **Repository:** [github.com/Unusualyug/Airbnb_clone](https://github.com/Unusualyug/Airbnb_clone)

---

## 📸 Screenshots

| Homepage                            | Create Listing             |
| ----------------------------------- | -------------------------- |
| Listings grid with category filters | Form to add a new property |

| Sign Up               | Log In               |
| --------------------- | -------------------- |
| New user registration | Returning user login |

_(Add your screenshots to a `/screenshots` folder and update the image links below once uploaded to GitHub)_

```md
![Homepage](./screenshots/home.png)
![Create Listing](./screenshots/create-listing.png)
```

---

## ✨ Features

- 🔐 **User Authentication** — secure signup/login using Passport.js (Local Strategy), passwords are hashed and never stored in plain text
- 🏠 **Full CRUD for Listings** — create, view, edit, and delete property listings
- ☁️ **Cloud Image Uploads** — listing images are uploaded via Multer and stored on Cloudinary (not local disk)
- ⭐ **Reviews & Ratings** — users can leave a star rating (1–5) and a comment on any listing
- 🗑️ **Cascading Deletes** — deleting a listing automatically removes its associated reviews
- 🛡️ **Authorization Checks** — only the listing/review owner can edit or delete their own content
- 💰 **Dynamic Price Toggle** — homepage toggle recalculates listing prices with 18% GST applied
- 💬 **Flash Messages** — real-time success/error feedback after actions like login, signup, or listing creation
- ⚠️ **Centralized Error Handling** — custom `ExpressError` class + error-handling middleware for clean error pages

---

## 🛠️ Tech Stack

| Layer          | Technology                                                |
| -------------- | --------------------------------------------------------- |
| Runtime        | Node.js                                                   |
| Framework      | Express.js                                                |
| Templating     | EJS + EJS-Mate (layouts)                                  |
| Database       | MongoDB Atlas + Mongoose                                  |
| Auth           | Passport.js (`passport-local`, `passport-local-mongoose`) |
| Sessions       | `express-session` (signed cookies)                        |
| File Uploads   | Multer + Cloudinary                                       |
| Validation     | Joi                                                       |
| Flash Messages | connect-flash                                             |
| Styling        | Custom CSS                                                |

---

## 📂 Project Structure
