Then open **http://localhost:3000** in your browser (it will automatically redirect to `/listings`).

---

## 🧭 Usage

1. **Sign up** for a new account, or **log in** if you already have one.
2. Browse listings on the homepage, or filter by category (Rooms, Beach, Mountains, etc.).
3. Click a listing to view details, leave a review, or rate it.
4. Once logged in, click **"Create Listing"** to add your own property (title, description, price, location, and image).
5. Owners can edit or delete their own listings and reviews.

---

## 🚀 Deployment

This project is server-rendered (EJS, not a separate React frontend), so both the backend and the "frontend" run from the same Express server — no separate frontend build/start step is needed.

### Deployed on Render

This project is deployed on [Render](https://render.com) as a persistent Node.js web service — no code restructuring was required (unlike serverless platforms like Vercel).

🔗 **Live Link:** [https://airbnb-clone-1-p70v.onrender.com/listings](https://airbnb-clone-1-p70v.onrender.com/listings)

**Render deployment settings used:**

| Setting        | Value               |
| -------------- | ------------------- |
| Root Directory | _(blank / not set)_ |
| Build Command  | `npm install`       |
| Start Command  | `node app.js`       |

**Environment Variables set on Render** (Dashboard → your service → Environment):

| Key           | Value                                |
| ------------- | ------------------------------------ |
| `ATLASDB_URL` | Your MongoDB Atlas connection string |
| `SECRET`      | Random session secret string         |
| `CLOUD_NAME`  | Your Cloudinary cloud name           |
| `API_KEY`     | Your Cloudinary API key              |
| `API_SECRET`  | Your Cloudinary API secret           |
| `NODE_ENV`    | `production`                         |

> ⚠️ Note: Render's free tier spins down after periods of inactivity — the first request after idle time may take 30–50 seconds to respond while the server wakes up.

---

## 🧠 Learnings & Challenges

- Implementing session-based authentication with Passport.js and understanding how signed cookies + server-side sessions work together
- Structuring a growing Express app cleanly using the MVC pattern, custom middleware, and modular routers
- Uploading files directly to Cloudinary (instead of local disk) to keep the app deployment-friendly
- Using Mongoose middleware hooks to maintain data integrity (e.g., cascading review deletion)
- Debugging real-world deployment issues — IP whitelisting on MongoDB Atlas, environment variable configuration, and Node version mismatches on hosting platforms
- Using a MongoDB-backed session store (`connect-mongo`) instead of in-memory sessions for production reliability

---

## 📄 License

This project was built for educational/portfolio purposes.

---

## 👤 Author

**Yug Lakhani**
GitHub: [@Unusualyug](https://github.com/Unusualyug)
