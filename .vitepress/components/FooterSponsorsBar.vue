<template>
  <div class="footer-sponsors">
    <div class="container">
      <a href="https://driv.ly" target="_blank" rel="noopener" class="sponsor">
        <img
          src="/sponsors/drivly.svg"
          alt="Drivly Logo"
          class="sponsor-logo"
        />
        <span class="sponsor-text">Proudly sponsored by Drivly</span>
        <a href="https://twitter.com/drivinglately" target="_blank" rel="noopener" class="twitter-link">
          <svg viewBox="0 0 24 24" class="social-icon">
            <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
      </a>
    </div>
  </div>
</template>

<style scoped>
.footer-sponsors {
  padding: 1rem 24px;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: auto;
  background: var(--vp-c-bg);
}

.container {
  display: flex;
  justify-content: center;
}

.sponsor {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.sponsor:hover {
  background: var(--vp-c-bg-soft);
}

.sponsor-logo {
  height: 24px;
  width: auto;
}

.sponsor-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.social-icon {
  width: 14px;
  height: 14px;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
}

.twitter-link:hover .social-icon {
  color: #1DA1F2;
}

@media (min-width: 960px) {
  .footer-sponsors {
    display: none;
  }
}
</style>