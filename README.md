# Lorem — Verification Landing Page

<div align="center">

  <!-- Tech stack badges -->
  ![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white&labelColor=0f172a)
  ![App Router](https://img.shields.io/badge/App_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

</div>


<img width="1350" height="605" alt="Image" src="https://github.com/user-attachments/assets/a691d445-c275-4917-8e25-69b1e83ed67e" />

---

A production-build assessment project: a Next.js landing page recreated from a Figma design, focused on scroll-driven animation, responsive layout, and accessibility.

> **Note on the name:** the source design uses the literal placeholder word "Lorem" throughout (headline copy, footer domain "Lorem.app", etc.) instead of a real brand name. This README and the code both preserve that as-is, pending a real brand name if one is ever supplied.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js (App Router)**, JavaScript |
| Styling | **Tailwind CSS** |
| Scroll / section animation | **GSAP + ScrollTrigger** |
| Small UI interactions | **Motion** (the `motion` package, imported via `motion/react`) |
| Native browser APIs | `IntersectionObserver` (scroll-spy, lazy-loading the footer video) |
| Fonts | **Outfit** (primary sans) and **PT Serif** (italic accent), loaded via `next/font/google` |
| Images | `next/image` throughout, for automatic optimization and layout-shift prevention |

No other third-party libraries are used.

---

### 📥 Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/sivasankar-webdev/Lorem-App.git

# Or clone via SSH
git clone git@github.com:sivasankar-webdev/Lorem-App.git

# Navigate into the project folder
cd project_name
```

---

### 📦 Install Dependencies

```bash
# Using npm (recommended)
npm install

# Or using yarn
yarn install
```

---

```bash
npm install
npm run dev      # local development, http://localhost:3000
npm run build    # production build (verified passing)
npm run start    # run the production build locally
```

No environment variables are required — this project makes no external API calls.

---

<div align="center">
  <p>Built with ❤️ using Next + Javascript + Tailwind CSS</p>
</div>
