<template>
  <div style="display: none;"></div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
let observer = null

const getCurrentScope = () => {
  const path = route.path
  if (path.startsWith('/itty-router/')) return 'itty-router'
  if (path.startsWith('/itty-fetcher/')) return 'itty-fetcher' 
  if (path.startsWith('/itty-chroma/')) return 'itty-chroma'
  if (path.startsWith('/itty-durable/')) return 'itty-durable'
  if (path.startsWith('/itty-time/')) return 'itty-time'
  return null // Show all results for root/docs pages
}

const addSearchScopeNotice = (scope, searchContainer) => {
  // Add a notice that search is scoped
  const existing = searchContainer.querySelector('.search-scope-notice')
  if (existing) return
  
  const scopeText = scope.replace('-', ' ')
  const notice = document.createElement('div')
  notice.className = 'search-scope-notice'
  notice.style.cssText = `
    font-size: 12px;
    color: var(--vp-c-text-2);
    padding: 8px 12px;
    border-bottom: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-soft);
  `
  notice.textContent = `🔍 Searching within ${scopeText} documentation`
  
  const searchInput = searchContainer.querySelector('input')
  if (searchInput && searchInput.parentNode) {
    searchInput.parentNode.insertBefore(notice, searchInput.nextSibling)
  }
}

const filterSearchResults = (scope) => {
  if (!scope) return // Don't filter on root pages
  
  const searchContainer = document.querySelector('.VPLocalSearchBox')
  if (!searchContainer) return
  
  // Add scope notice
  addSearchScopeNotice(scope, searchContainer)
  
  const results = searchContainer.querySelectorAll('.result')
  if (results.length === 0) return
  
  let visibleCount = 0
  results.forEach(result => {
    const link = result.querySelector('a')
    if (link && link.href) {
      const url = new URL(link.href)
      if (!url.pathname.startsWith(`/${scope}/`)) {
        result.style.display = 'none'
      } else {
        result.style.display = ''
        visibleCount++
      }
    }
  })
  
  // Update the "no results" message if no results are visible
  if (visibleCount === 0) {
    const noResults = searchContainer.querySelector('.no-results')
    if (noResults) {
      const scopeText = scope.replace('-', ' ')
      noResults.textContent = `No results in ${scopeText} documentation. Try searching from the home page for global results.`
    }
  }
}

const setupScopedSearch = () => {
  const scope = getCurrentScope()
  if (!scope) return // No scoping needed on root pages
  
  // Clean up previous observer
  if (observer) {
    observer.disconnect()
  }
  
  // Watch for search modal to appear
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // Check if search modal was added
        const searchModal = document.querySelector('.VPLocalSearchBox')
        if (searchModal && mutation.addedNodes.length > 0) {
          // Watch for search results to appear
          const resultsObserver = new MutationObserver(() => {
            setTimeout(() => filterSearchResults(scope), 10)
          })
          
          resultsObserver.observe(searchModal, {
            childList: true,
            subtree: true
          })
          
          // Also filter results when input changes
          const searchInput = searchModal.querySelector('input[type="search"]')
          if (searchInput) {
            searchInput.addEventListener('input', () => {
              setTimeout(() => filterSearchResults(scope), 50)
            })
          }
        }
      }
    })
  })
  
  // Start observing document body for search modal
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

onMounted(() => {
  nextTick(() => {
    setupScopedSearch()
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

// Re-setup when route changes
watch(() => route.path, () => {
  nextTick(() => {
    setupScopedSearch()
  })
})
</script>