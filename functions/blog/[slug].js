export async function onRequestGet(context) {
    const { env, params, request } = context;
    const slug = params.slug;

    try {
        if (!env.DB) {
            throw new Error('D1 database binding "DB" is missing.');
        }

        let article;
        const url = new URL(request.url);

        // Preview setup for local validation
        if (slug === "template") {
            article = {
                title: "Social Sync pSEO Landing Page Preview Template",
                meta_description: "This is a design preview for the Social Sync automated SEO landing pages.",
                created_at: new Date().toISOString(),
                category: "instagram",
                content: `
                    <h2>Why Site Speed Matters for Social Embedding</h2>
                    <p class="leading-relaxed text-slate-650 mb-4">
                        Standard social media integration widgets force users to download massive client-side scripts, tracking pixels, and blocking stylesheets. This delays your Cumulative Layout Shift (CLS) and First Contentful Paint (FCP).
                    </p>
                    <h2>The Solution: Edge Caching & Prerendering</h2>
                    <p class="leading-relaxed text-slate-650 mb-4">
                        Social Sync pre-caches and flattens Instagram and LinkedIn feed JSON files, delivering them to global edge nodes near your visitors in under 50ms with 0ms load penalty.
                    </p>
                    <h3>Core Technical Highlights</h3>
                    <ul class="list-disc pl-5 space-y-2 mb-6">
                        <li><strong>Domain Whitelisting:</strong> Cryptographic origin validation prevent resource stealing.</li>
                        <li><strong>Token Refresher:</strong> Automates the weekly refresh of 60-day Meta keys in background crons.</li>
                        <li><strong>SEO Compliance:</strong> Dynamic HTML structure readable by Googlebot and LLM search agents.</li>
                    </ul>
                `
            };
        } else {
            article = await env.DB.prepare("SELECT * FROM seo_articles WHERE slug = ?").bind(slug).first();
            if (!article) {
                return new Response("Guide or article not found", { status: 404 });
            }
        }

        const escapeHtml = (str) => {
            if (!str) return "";
            return str.replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")
                      .replace(/"/g, "&quot;")
                      .replace(/'/g, "&#039;");
        };

        const todayStr = new Date(article.created_at || Date.now()).toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        const categoryMap = {
            instagram: { 
                name: "Instagram", 
                icon: "📸",
                ctaTitle: "Sync Your Instagram Feed in Under 2 Minutes",
                ctaDesc: "Embed edge-cached Instagram grids with zero scripting overhead. Get a lightweight, GDPR-compliant Instagram feed widget.",
                ctaButton: "Start Setup Now",
                ctaUrl: "/#pricing"
            },
            linkedin: { 
                name: "LinkedIn", 
                icon: "💼",
                ctaTitle: "Display Dynamic LinkedIn Company Updates",
                ctaDesc: "Showcase business highlights, articles, and updates on your website without clunky iframes. Fully edge-cached LinkedIn updates.",
                ctaButton: "Get Started",
                ctaUrl: "/#pricing"
            },
            widgets: { 
                name: "Widgets & Code", 
                icon: "⚙️",
                ctaTitle: "Integrate Multi-Platform Social Feeds",
                ctaDesc: "Perfect for developers and agencies. Connect social timelines cleanly using simple HTML tags or edge-cached JSON APIs.",
                ctaButton: "Compare Plans",
                ctaUrl: "/#pricing"
            },
            general: { 
                name: "Insights", 
                icon: "💡",
                ctaTitle: "Optimize Your Site's PageSpeed Score",
                ctaDesc: "Ditch heavy tracking scripts. Swap bloated plugins for ultra-lightweight, 50ms edge-delivered social feeds.",
                ctaButton: "Try Social Sync",
                ctaUrl: "/#pricing"
            }
        };

        const catInfo = categoryMap[article.category] || categoryMap.general;

        const ctaCardHtml = `
            <div class="mt-12 bg-gradient-to-r from-[#00A3E0] to-indigo-600 rounded-3xl p-8 md:p-10 shadow-xl text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
                <div class="space-y-3 max-w-lg">
                    <span class="inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-white/20 text-white tracking-wider">
                        Boost Conversions
                    </span>
                    <h3 class="text-xl md:text-2xl font-extrabold font-display leading-tight">${catInfo.ctaTitle}</h3>
                    <p class="text-xs text-white/80 leading-relaxed font-medium">${catInfo.ctaDesc}</p>
                </div>
                <a href="${catInfo.ctaUrl}" class="px-6 py-3 bg-white text-slate-900 font-extrabold text-xs rounded-xl shadow-md hover:bg-slate-50 transition-colors shrink-0 font-display">
                    ${catInfo.ctaButton} &rarr;
                </a>
            </div>
        `;

        const baseDomain = "https://socialsync.co.za";
        const articleUrl = `${baseDomain}/blog/${article.slug}`;
        const defaultLogo = "https://blobs.codeways.co/cdn-cgi/image/width=600,fit=scale-down,format=auto,metadata=keep,sharpen=0.5/social-sync-logo.png";

        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": articleUrl
            },
            "headline": article.title || '',
            "description": article.meta_description || article.title || '',
            "image": [defaultLogo],
            "datePublished": article.created_at ? new Date(article.created_at).toISOString() : new Date().toISOString(),
            "author": {
                "@type": "Organization",
                "name": "SocialSync Editorial",
                "url": baseDomain
            },
            "publisher": {
                "@type": "Organization",
                "name": "SocialSync",
                "logo": {
                    "@type": "ImageObject",
                    "url": defaultLogo
                }
            }
        };

        // Fetch static blog-template.html asset
        const templateUrl = `${url.origin}/blog-template`;
        const response = await env.ASSETS.fetch(new Request(templateUrl));

        if (!response.ok) {
            throw new Error(`Template fetch failed for ${templateUrl}`);
        }

        const templateResponse = new Response(response.body, response);

        // Rewrite dynamic values
        const html = await new HTMLRewriter()
            .on('title', {
                element(e) { e.setInnerContent(`${article.title || 'Guides'} | Social Sync`); }
            })
            .on('meta[name="description"]', {
                element(e) { e.setAttribute('content', article.meta_description || article.title || ''); }
            })
            .on('meta[property="og:title"]', {
                element(e) { e.setAttribute('content', article.title || ''); }
            })
            .on('meta[property="og:description"]', {
                element(e) { e.setAttribute('content', article.meta_description || article.title || ''); }
            })
            .on('meta[property="og:url"]', {
                element(e) { e.setAttribute('content', articleUrl); }
            })
            .on('meta[name="twitter:title"]', {
                element(e) { e.setAttribute('content', article.title || ''); }
            })
            .on('meta[name="twitter:description"]', {
                element(e) { e.setAttribute('content', article.meta_description || article.title || ''); }
            })
            .on('[data-field="breadcrumb-title"]', {
                element(e) { e.setInnerContent(article.title || 'Guide'); }
            })
            .on('[data-field="category-badge"]', {
                element(e) { e.setAttribute('class', `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-[#00A3E0]/8 text-[#00A3E0]`); }
            })
            .on('[data-field="category-icon"]', {
                element(e) { e.setInnerContent(catInfo.icon); }
            })
            .on('[data-field="category-name"]', {
                element(e) { e.setInnerContent(catInfo.name); }
            })
            .on('[data-field="date"]', {
                element(e) { e.setInnerContent(todayStr); }
            })
            .on('[data-field="title"]', {
                element(e) { e.setInnerContent(article.title || 'Guide'); }
            })
            .on('[data-field="content"]', {
                element(e) { e.setInnerContent(article.content || '<p>Content unavailable.</p>', { html: true }); }
            })
            .on('[data-field="cta-card"]', {
                element(e) { e.setInnerContent(ctaCardHtml, { html: true }); }
            })
            .on('head', {
                element(e) {
                    e.append(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`, { html: true });
                    e.append(`<link rel="canonical" href="${articleUrl}">`, { html: true });
                }
            })
            .transform(templateResponse)
            .text();

        // Respond with HTML and preloaded Link headers for 103 Early Hints
        return new Response(html, {
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
                "Link": "</index.css>; rel=preload; as=style"
            }
        });

    } catch (err) {
        console.error("Pages Blog Detail render crash:", err.message);
        return new Response(`Error rendering article: ${err.message}`, { status: 500 });
    }
}
