import './style.css'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Splitting from 'splitting'
import Swiper from 'swiper'
import { Autoplay, FreeMode, Manipulation } from 'swiper/modules'
import 'swiper/css'

import { business, hours, menu, reviews, gallery } from './data.js'

gsap.registerPlugin(ScrollTrigger)

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const $ = (sel, ctx = document) => ctx.querySelector(sel)
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)]
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const starRow = (n) => '★'.repeat(n) + '☆'.repeat(5 - n)

/* ── Smooth scroll (Lenis synced to GSAP ticker) ─────────────────────────── */
if (!reduceMotion) {
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  // in-page anchors go through Lenis so they ease instead of jumping
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -72 })
      closeNav()
    })
  })
}

/* ── Nav: shadow on scroll + mobile toggle ───────────────────────────────── */
const nav = $('.nav')
const navToggle = $('.nav__toggle')
function closeNav() { nav.classList.remove('is-open'); navToggle?.setAttribute('aria-expanded', 'false') }
navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open')
  navToggle.setAttribute('aria-expanded', String(open))
})
const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 8)
onScroll()
window.addEventListener('scroll', onScroll, { passive: true })

/* ── Hero headline split-reveal (Splitting + GSAP) ───────────────────────── */
const heroTitle = $('[data-splitting]')
if (heroTitle) {
  Splitting({ target: heroTitle, by: 'words' })
  if (!reduceMotion) {
    gsap.from(heroTitle.querySelectorAll('.word'), {
      yPercent: 110, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06, delay: 0.1,
    })
  }
}

/* ── Menu: category tabs ─────────────────────────────────────────────────── */
const tabsEl = $('.menu__tabs')
const panelEl = $('#menu-panel')

function renderMenu(activeId) {
  tabsEl.innerHTML = menu.map((cat) => `
    <button class="menu__tab" role="tab" id="tab-${cat.id}"
      aria-controls="menu-panel" aria-selected="${cat.id === activeId}">${esc(cat.label)}</button>
  `).join('')

  const cat = menu.find((c) => c.id === activeId)
  panelEl.innerHTML = `
    <p class="menu__blurb">${esc(cat.blurb)}</p>
    <div class="menu__list">
      ${cat.items.map((it) => `
        <div class="menu__item">
          <span class="menu__item-name">${esc(it.name)}</span>
          <span class="menu__item-price">${esc(it.price)}</span>
          <span class="menu__item-desc">${esc(it.desc)}</span>
        </div>
      `).join('')}
    </div>
  `

  $$('.menu__tab', tabsEl).forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.getAttribute('aria-selected') === 'true') return
      renderMenu(btn.id.replace('tab-', ''))
      if (!reduceMotion) {
        gsap.fromTo(panelEl, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
      }
    })
  })
}
renderMenu(menu[0].id)

/* ── Gallery ─────────────────────────────────────────────────────────────
   These render from data.js. To make this auto-update from the cafe's
   Instagram/Facebook feed, replace the `gallery` array with live data:
     • Easiest: a feed widget such as Behold (behold.so) or EmbedSocial,
       which gives a script + container and handles the Instagram Graph API.
     • Custom: server-side fetch the Instagram Graph API (long-lived token)
       and write the latest posts into the gallery array shape used here.
   The layout below works for any number of images.
------------------------------------------------------------------------- */
$('#gallery-grid').innerHTML = gallery.map((g) => `
  <figure class="gallery__item">
    <img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" width="900" height="900" />
  </figure>
`).join('')

/* ── Reviews carousel (Swiper, always moving) ────────────────────────────── */
const track = $('#reviews-track')
function reviewSlide(r, isNew = false) {
  return `
    <div class="swiper-slide">
      <article class="review-card${isNew ? ' is-new' : ''}">
        <div class="review-card__stars" aria-label="${r.stars} out of 5">${starRow(r.stars)}</div>
        <p class="review-card__text">${esc(r.text)}</p>
        <p class="review-card__name">${esc(r.name)}</p>
      </article>
    </div>`
}
track.innerHTML = reviews.map((r) => reviewSlide(r)).join('')

const reviewSwiper = new Swiper('.reviews__swiper', {
  modules: [Autoplay, FreeMode, Manipulation],
  slidesPerView: 1.1,
  spaceBetween: 16,
  rewind: true, // loops back to the start without the loop-mode slide cloning
  grabCursor: true,
  freeMode: { enabled: true, momentum: true },
  autoplay: reduceMotion ? false : { delay: 2600, disableOnInteraction: false, pauseOnMouseEnter: true },
  breakpoints: {
    640: { slidesPerView: 2.1 },
    1024: { slidesPerView: 3 },
  },
})

/* ── Leave a review (adds to the carousel live) ──────────────────────────
   This posts the review into the moving carousel for the current visit so
   the customer sees it appear straight away. To store reviews permanently,
   point the form at a backend (Formspree, a Google Form, or your own API)
   in the marked spot below. We also link out to Facebook/Google as a path
   to a verified public review.
------------------------------------------------------------------------- */
const form = $('#review-form')
const msg = $('#review-msg')
const starsInput = $('#rf-stars')
let chosenStars = 0

starsInput.innerHTML = [1, 2, 3, 4, 5].map((n) =>
  `<button type="button" role="radio" aria-label="${n} star${n > 1 ? 's' : ''}" data-star="${n}" aria-checked="false">★</button>`
).join('')

function paintStars(val) {
  $$('button', starsInput).forEach((b) => {
    const on = Number(b.dataset.star) <= val
    b.classList.toggle('is-on', on)
    b.setAttribute('aria-checked', String(Number(b.dataset.star) === val))
  })
}
starsInput.addEventListener('click', (e) => {
  const btn = e.target.closest('button')
  if (!btn) return
  chosenStars = Number(btn.dataset.star)
  paintStars(chosenStars)
  clearError('stars')
})

function setError(field, text) {
  const f = $(`#rf-${field}`)?.closest('.field') || starsInput.closest('.field')
  f?.classList.add('is-invalid')
  const span = $(`[data-error-for="${field}"]`)
  if (span) span.textContent = text
}
function clearError(field) {
  const f = $(`#rf-${field}`)?.closest('.field') || starsInput.closest('.field')
  f?.classList.remove('is-invalid')
  const span = $(`[data-error-for="${field}"]`)
  if (span) span.textContent = ''
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const name = $('#rf-name').value.trim()
  const text = $('#rf-text').value.trim()
  let ok = true

  if (!name) { setError('name', 'Please add your name.'); ok = false } else clearError('name')
  if (!chosenStars) { setError('stars', 'Pick a star rating.'); ok = false } else clearError('stars')
  if (text.length < 4) { setError('text', 'A few more words please.'); ok = false } else clearError('text')
  if (!ok) return

  // ── HOOK FOR PERSISTENCE ──────────────────────────────────────────────
  // To keep reviews permanently, send them here, e.g.:
  //   await fetch('https://formspree.io/f/YOUR_ID', { method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name, stars: chosenStars, text }) })
  // ──────────────────────────────────────────────────────────────────────

  const slideHtml = reviewSlide({ name, stars: chosenStars, text }, true)
  reviewSwiper.prependSlide(slideHtml)
  reviewSwiper.update()
  reviewSwiper.slideTo(0, 600)

  form.reset()
  chosenStars = 0
  paintStars(0)
  msg.textContent = 'Thank you. Your review is now up there in the carousel.'
  setTimeout(() => { msg.textContent = '' }, 6000)
})

/* ── Opening hours (today highlighted) ───────────────────────────────────── */
const todayIdx = (new Date().getDay() + 6) % 7 // Mon=0 … Sun=6
$('#hours').innerHTML = hours.map((h, i) => `
  <div class="hours__row${i === todayIdx ? ' is-today' : ''}">
    <span class="day">${esc(h.day)}</span>
    <span>${esc(h.time)}</span>
  </div>
`).join('')

/* ── Scroll reveals (IntersectionObserver, reduced-motion safe) ──────────── */
const revealEls = [
  ...$$('.section-head'),
  ...$$('.ribbon__item'),
  ...$$('.gallery__item'),
  ...$$('.visit__card'),
  $('.menu__tabs'),
  $('.reviews__swiper'),
  $('.reviews__cta'),
].filter(Boolean)

if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add('reveal', 'is-in'))
} else {
  revealEls.forEach((el) => el.classList.add('reveal'))
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${Math.min(entry.target.dataset.i || 0, 4) * 60}ms`
        entry.target.classList.add('is-in')
        io.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
  // small stagger inside grids
  $$('.gallery__item').forEach((el, i) => (el.dataset.i = i % 4))
  $$('.ribbon__item').forEach((el, i) => (el.dataset.i = i))
  revealEls.forEach((el) => io.observe(el))
}

/* ── Footer year ─────────────────────────────────────────────────────────── */
$('#year').textContent = new Date().getFullYear()

// quiet unused-import note: business is available for future templating
void business
