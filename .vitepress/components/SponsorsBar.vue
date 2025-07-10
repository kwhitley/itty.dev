<template>
  <div class="sponsors-bar">
    <div class="container">
      <div class="sponsor-label">Special Thanks to Our Sponsors</div>
      <div class="sponsors">
        <a href="https://driv.ly" target="_blank" rel="noopener" class="sponsor">
          <img
            src="/sponsors/drivly.svg"
            alt="Drivly Logo"
            class="sponsor-logo"
          />
          <div class="sponsor-info">
            <div class="sponsor-name">Drivly</div>
            <div class="sponsor-description">
              Long-time supporter of the itty ecosystem
            </div>
            <div class="sponsor-social">
              <a href="https://twitter.com/drivinglately" target="_blank" rel="noopener" class="twitter-link">
                <svg viewBox="0 0 24 24" class="social-icon">
                  <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sponsors-bar {
  padding: 1rem 0;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.sponsor-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.sponsors {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.sponsor {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.sponsor:hover {
  background: var(--vp-c-bg);
}

.sponsor-logo {
  height: 32px;
  width: auto;
}

.sponsor-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sponsor-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.sponsor-description {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.sponsor-social {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.social-icon {
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
}

.twitter-link:hover .social-icon {
  color: #1DA1F2;
}
</style>