// Shared UI components for Social Sync marketing site

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderFooter();
});

function renderNavbar() {
  const container = document.getElementById("shared-nav");
  if (!container) return;

  container.innerHTML = `
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
      <div class="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" class="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2 font-display">
          <span class="w-8 h-8 rounded bg-gradient-to-tr from-[#00A3E0] to-indigo-500 flex items-center justify-center text-sm font-semibold text-white">S</span>
          Social Sync
        </a>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="/#why-us" class="hover:text-slate-900 transition-colors">Why Choose Us</a>
          <a href="/#compare" class="hover:text-slate-900 transition-colors">Performance</a>
          <a href="/#pricing" class="hover:text-slate-900 transition-colors">Pricing & Plans</a>
          <a href="/#faq" class="hover:text-slate-900 transition-colors">FAQ</a>
        </nav>

        <!-- CTA -->
        <div class="hidden md:flex items-center gap-4">
          <a href="/#pricing" class="bg-gradient-to-r from-[#00A3E0] to-indigo-500 hover:opacity-90 text-white font-semibold px-5 py-2 rounded-xl text-sm transition shadow-lg shadow-indigo-500/10">
            Get Started
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button onclick="toggleMobileMenu(true)" class="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors" aria-label="Toggle Navigation menu">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Mobile Drawer -->
    <div id="mobile-drawer" class="hidden fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onclick="toggleMobileMenu(false)"></div>
      <div class="fixed inset-y-0 right-0 max-w-full flex">
        <div class="w-screen max-w-md bg-white border-l border-slate-100 text-slate-800 flex flex-col justify-between">
          <div>
            <div class="h-16 px-6 flex items-center justify-between border-b border-slate-100">
              <span class="font-bold text-slate-900 font-display">Navigation</span>
              <button onclick="toggleMobileMenu(false)" class="p-2 text-slate-500 hover:text-slate-900" aria-label="Close menu">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav class="px-6 py-8 flex flex-col gap-6 text-lg font-medium">
              <a href="/#why-us" onclick="toggleMobileMenu(false)" class="text-slate-800 hover:text-[#00A3E0] flex items-center justify-between">
                Why Choose Us
                <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a href="/#compare" onclick="toggleMobileMenu(false)" class="text-slate-800 hover:text-[#00A3E0] flex items-center justify-between">
                Performance Comparison
                <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a href="/#pricing" onclick="toggleMobileMenu(false)" class="text-slate-800 hover:text-[#00A3E0] flex items-center justify-between">
                Pricing & Plans
                <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a href="/#faq" onclick="toggleMobileMenu(false)" class="text-slate-800 hover:text-[#00A3E0] flex items-center justify-between">
                FAQ
                <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </a>
            </nav>
          </div>
          <div class="p-6 border-t border-slate-100 bg-slate-50">
            <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Support</h3>
            <p class="text-sm text-slate-600">support@codeways.co</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFooter() {
  const container = document.getElementById("shared-footer");
  if (!container) return;

  container.innerHTML = `
    <footer class="border-t border-slate-200 bg-white py-12 text-center text-xs text-slate-400">
      <div class="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="font-display font-bold text-slate-800 text-sm">
          Social Sync
        </div>
        <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <span>CodeWays Social Sync &copy; 2026. All rights reserved.</span>
          <span class="hidden md:inline text-slate-300">|</span>
          <span class="font-semibold text-slate-500">Powered by <a href="https://codeways.co" target="_blank" class="text-[#00A3E0] hover:underline transition">CodeWays</a></span>
        </div>
      </div>
    </footer>
  `;
}

// Global mobile menu toggle
window.toggleMobileMenu = function(show) {
  const drawer = document.getElementById("mobile-drawer");
  if (!drawer) return;
  if (show) {
    drawer.classList.remove("hidden");
  } else {
    drawer.classList.add("hidden");
  }
};
