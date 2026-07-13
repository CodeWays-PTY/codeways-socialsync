// Custom Web Components for Social Sync marketing site

class SharedNav extends HTMLElement {
  connectedCallback() {
    const isAuth = !!localStorage.getItem('socialsync_session_token');

    this.innerHTML = `
      <header class="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div class="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" class="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2 font-display">
            <img src="https://blobs.codeways.co/cdn-cgi/image/width=600,fit=scale-down,format=auto,metadata=keep,sharpen=0.5/social-sync-logo-mark.png" alt="Social Sync Logo" class="w-12 h-12 object-contain -my-1">
            Social Sync
          </a>
          
          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="/#why-us" class="hover:text-slate-900 transition-colors">Why Choose Us</a>
            <a href="/#compare" class="hover:text-slate-900 transition-colors">Performance</a>
            <a href="/#pricing" class="hover:text-slate-900 transition-colors">Pricing & Plans</a>
            <a href="/#faq" class="hover:text-slate-900 transition-colors">FAQ</a>
            <a href="/blog" class="hover:text-slate-900 transition-colors">Blog</a>
          </nav>

          <!-- CTA -->
          <div class="hidden md:flex items-center gap-3">
            ${isAuth
              ? `<a href="/dashboard.html" class="bg-gradient-to-r from-[#00A3E0] to-indigo-500 hover:opacity-90 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition shadow-lg shadow-indigo-500/10 font-display">Dashboard</a>`
              : `
                <a href="/dashboard-login.html" class="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-sm font-display">Login</a>
                <a href="/#pricing" class="bg-gradient-to-r from-[#00A3E0] to-indigo-500 hover:opacity-90 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition shadow-lg shadow-indigo-500/10 font-display">Get Started</a>
              `
            }
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
                <a href="/blog" onclick="toggleMobileMenu(false)" class="text-slate-800 hover:text-[#00A3E0] flex items-center justify-between font-bold">
                  Blog
                  <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                </a>
              </nav>
            </div>
            <div class="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
              ${isAuth
                ? `<a href="/dashboard.html" onclick="toggleMobileMenu(false)" class="block text-center bg-gradient-to-r from-[#00A3E0] to-indigo-500 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-indigo-500/10 font-display">Dashboard</a>`
                : `
                  <a href="/dashboard-login.html" onclick="toggleMobileMenu(false)" class="block text-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl text-sm transition shadow-sm font-display">Login</a>
                  <a href="/#pricing" onclick="toggleMobileMenu(false)" class="block text-center bg-gradient-to-r from-[#00A3E0] to-indigo-500 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-indigo-500/10 font-display">Get Started</a>
                `
              }
              <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Support</span>
                <span class="text-slate-600 font-semibold">support@codeways.co</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('shared-nav', SharedNav);

class SharedFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="border-t border-slate-200/80 bg-white pt-16 pb-12 text-sm text-slate-500">
        <div class="max-w-[1200px] mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200/60">
            
            <!-- Brand Info Column -->
            <div class="md:col-span-4 space-y-4">
              <a href="/" class="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5 font-display">
                <img src="https://blobs.codeways.co/cdn-cgi/image/width=600,fit=scale-down,format=auto,metadata=keep,sharpen=0.5/social-sync-logo-mark.png" alt="Social Sync Logo" class="w-14 h-14 object-contain">
                Social Sync
              </a>
              <p class="text-slate-500 leading-relaxed font-medium max-w-sm text-xs sm:text-sm">
                High-performance social media widgets powered by Cloudflare edge networking. Load feeds under 50ms with 0ms PageSpeed blocking time.
              </p>
              <div class="flex items-center gap-4 pt-2">
                <a href="#" class="text-slate-400 hover:text-[#00A3E0] transition" aria-label="Twitter">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" class="text-slate-400 hover:text-[#00A3E0] transition" aria-label="LinkedIn">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM19 19h-3v-4.75c0-1.1-.9-2-2-2s-2 .9-2 2V19h-3v-9h3v1.25c.5-.8 1.5-1.25 2.5-1.25 2.2 0 4 1.8 4 4z"/></svg>
                </a>
                <a href="#" class="text-slate-400 hover:text-[#00A3E0] transition" aria-label="GitHub">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
              </div>
            </div>

            <!-- Links Columns -->
            <div class="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              
              <!-- Product -->
              <div class="space-y-3">
                <h4 class="text-xs font-bold text-slate-900 uppercase tracking-widest font-display">Product</h4>
                <ul class="space-y-2 text-xs sm:text-sm font-medium">
                  <li><a href="/#why-us" class="hover:text-slate-900 transition">Why Us</a></li>
                  <li><a href="/#compare" class="hover:text-slate-900 transition">Performance</a></li>
                  <li><a href="/#pricing" class="hover:text-slate-900 transition">Pricing Plans</a></li>
                  <li><a href="/#faq" class="hover:text-slate-900 transition">AEO FAQ</a></li>
                </ul>
              </div>

              <!-- Security -->
              <div class="space-y-3">
                <h4 class="text-xs font-bold text-slate-900 uppercase tracking-widest font-display">Security</h4>
                <ul class="space-y-2 text-xs sm:text-sm font-medium">
                  <li><span class="hover:text-slate-900 cursor-pointer transition">Domain Origin Lock</span></li>
                  <li><span class="hover:text-slate-900 cursor-pointer transition">Edge Firewall</span></li>
                  <li><span class="hover:text-slate-900 cursor-pointer transition">Encrypted Tokens</span></li>
                  <li><span class="hover:text-slate-900 cursor-pointer transition">Access Guard</span></li>
                </ul>
              </div>

              <!-- Resources -->
              <div class="space-y-3">
                <h4 class="text-xs font-bold text-slate-900 uppercase tracking-widest font-display">Resources</h4>
                <ul class="space-y-2 text-xs sm:text-sm font-medium">
                  <li><a href="https://codeways.co" target="_blank" class="hover:text-slate-900 transition">CodeWays Website</a></li>
                  <li><span class="hover:text-slate-900 cursor-pointer transition">Documentation</span></li>
                  <li><span class="hover:text-slate-900 cursor-pointer transition">PageSpeed Tool</span></li>
                  <li><span class="hover:text-slate-900 cursor-pointer transition">Status Page</span></li>
                </ul>
              </div>

              <!-- Legal -->
              <div class="space-y-3">
                <h4 class="text-xs font-bold text-slate-900 uppercase tracking-widest font-display">Legal</h4>
                <ul class="space-y-2 text-xs sm:text-sm font-medium">
                  <li><span class="hover:text-slate-900 cursor-pointer transition">Privacy Policy</span></li>
                  <li><span class="hover:text-slate-900 cursor-pointer transition">Terms of Service</span></li>
                  <li><span class="hover:text-slate-900 cursor-pointer transition">Cookie Policy</span></li>
                  <li><span class="hover:text-slate-900 cursor-pointer transition">GDPR Compliance</span></li>
                </ul>
              </div>

            </div>

          </div>

          <!-- Bottom Footer Bar -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-medium text-slate-400">
            <p>&copy; 2026 CodeWays Social Sync. All rights reserved.</p>
            <p>
              Powered by <a href="https://codeways.co" target="_blank" class="text-[#00A3E0] hover:underline font-semibold transition">CodeWays Agency</a>.
            </p>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define('shared-footer', SharedFooter);

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
