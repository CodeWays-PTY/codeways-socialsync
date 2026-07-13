export async function onRequestGet(context) {
    const { env, request } = context;

    try {
        if (!env.DB) {
            throw new Error('D1 database binding "DB" is missing.');
        }

        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") || "1", 10) || 1;
        const category = url.searchParams.get("category") || "all";

        const categoryMap = {
            instagram: { name: "Instagram", icon: "📸" },
            linkedin: { name: "LinkedIn", icon: "💼" },
            widgets: { name: "Widgets & Code", icon: "⚙️" },
            general: { name: "Insights", icon: "💡" }
        };

        const limit = 6;
        let totalArticles = 0;
        let articles = [];
        let totalPages = 1;
        let activePage = page;

        try {
            // Count matching articles
            if (category !== "all") {
                const countRes = await env.DB.prepare(
                    "SELECT COUNT(*) as total FROM seo_articles WHERE category = ?"
                ).bind(category).first();
                totalArticles = countRes ? parseInt(countRes.total, 10) : 0;
            } else {
                const countRes = await env.DB.prepare(
                    "SELECT COUNT(*) as total FROM seo_articles"
                ).first();
                totalArticles = countRes ? parseInt(countRes.total, 10) : 0;
            }

            totalPages = Math.ceil(totalArticles / limit) || 1;
            activePage = Math.max(1, Math.min(page, totalPages));
            const offset = (activePage - 1) * limit;

            // Fetch list
            if (category !== "all") {
                const { results } = await env.DB.prepare(
                    "SELECT id, keyword, slug, title, meta_description, category, created_at FROM seo_articles WHERE category = ? ORDER BY created_at DESC LIMIT ? OFFSET ?"
                ).bind(category, limit, offset).all();
                if (results) articles = results;
            } else {
                const { results } = await env.DB.prepare(
                    "SELECT id, keyword, slug, title, meta_description, category, created_at FROM seo_articles ORDER BY created_at DESC LIMIT ? OFFSET ?"
                ).bind(limit, offset).all();
                if (results) articles = results;
            }
        } catch (dbErr) {
            console.error("D1 database query failed in blog index:", dbErr);
        }

        const serializedArticles = articles.map(art => {
            const catInfo = categoryMap[art.category] || { name: "Guide", icon: "📖" };
            let dateStr = "Recently";
            if (art.created_at) {
                try {
                    dateStr = new Date(art.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                } catch(e) {}
            }
            return {
                id: art.id,
                slug: art.slug,
                title: art.title,
                description: art.meta_description,
                category: art.category || "general",
                catName: catInfo.name,
                icon: catInfo.icon,
                date: dateStr
            };
        });

        // Server-side active styling helper for filter buttons
        const getFilterClass = (cat) => {
            return category === cat 
                ? 'bg-[#00A3E0] text-white border-[#00A3E0]' 
                : 'bg-white text-slate-650 border-slate-200 hover:border-[#00A3E0]/40';
        };

        const filtersHtml = `
            <a href="/blog?category=all" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${getFilterClass('all')}">
                All Guides
            </a>
            <a href="/blog?category=instagram" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-1.5 ${getFilterClass('instagram')}">
                <span>📸</span> Instagram
            </a>
            <a href="/blog?category=linkedin" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-1.5 ${getFilterClass('linkedin')}">
                <span>💼</span> LinkedIn
            </a>
            <a href="/blog?category=widgets" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-1.5 ${getFilterClass('widgets')}">
                <span>⚙️</span> Widgets & Code
            </a>
            <a href="/blog?category=general" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-1.5 ${getFilterClass('general')}">
                <span>💡</span> Insights
            </a>
        `;

        const articlesListHtml = serializedArticles.length > 0 
            ? serializedArticles.map(art => `
                <a href="/blog/${art.slug}" class="group flex flex-col justify-between bg-white border border-slate-200 hover:border-[#00A3E0]/30 hover:shadow-lg hover:scale-[1.01] transition duration-300 rounded-3xl p-6 sm:p-8">
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#00A3E0]/8 text-[#00A3E0]">
                                <span>${art.icon}</span> ${art.catName}
                            </span>
                            <span class="text-xs text-slate-400 font-semibold">${art.date}</span>
                        </div>
                        <h2 class="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#00A3E0] transition duration-200">
                            ${art.title}
                        </h2>
                        <p class="text-xs text-slate-500 leading-relaxed font-medium">${art.description}</p>
                    </div>
                    <span class="text-[11px] font-bold text-[#00A3E0] pt-6 inline-flex items-center gap-1">
                        Read Guide
                        <span class="transform group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                    </span>
                </a>
            `).join("")
            : `
                <div class="col-span-full py-16 text-center space-y-3 bg-white border border-slate-200 border-dashed rounded-3xl">
                    <span class="text-4xl">📖</span>
                    <h3 class="text-lg font-bold text-slate-900">No articles published yet</h3>
                    <p class="text-xs text-slate-500 max-w-xs mx-auto">We are automatically generating guides based on GSC keyword analysis twice a week.</p>
                </div>
            `;

        let paginationHtml = "";
        if (totalPages > 1) {
            let prevLink = activePage > 1 ? `<a href="/blog?category=${category}&page=${activePage - 1}" class="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">&larr; Previous</a>` : `<span class="px-4 py-2 rounded-lg border border-slate-100 text-slate-300 font-semibold cursor-not-allowed">&larr; Previous</span>`;
            let nextLink = activePage < totalPages ? `<a href="/blog?category=${category}&page=${activePage + 1}" class="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">Next &rarr;</a>` : `<span class="px-4 py-2 rounded-lg border border-slate-100 text-slate-300 font-semibold cursor-not-allowed">Next &rarr;</span>`;
            
            paginationHtml = `
                <div class="flex items-center justify-between border-t border-slate-200 pt-6 mt-8 w-full">
                    ${prevLink}
                    <span class="text-xs font-bold text-slate-500">Page ${activePage} of ${totalPages}</span>
                    ${nextLink}
                </div>
            `;
        }

        // Fetch index.html static template
        const templateUrl = `${url.origin}/blog`;
        const response = await env.ASSETS.fetch(new Request(templateUrl));

        if (!response.ok) {
            throw new Error(`Template fetch failed for ${templateUrl}`);
        }

        const templateResponse = new Response(response.body, response);

        // Rewrite layout
        return new HTMLRewriter()
            .on('[data-field="category-filters"]', {
                element(e) { e.setInnerContent(filtersHtml, { html: true }); }
            })
            .on('[data-field="blog-grid"]', {
                element(e) { e.setInnerContent(articlesListHtml, { html: true }); }
            })
            .on('[data-field="pagination"]', {
                element(e) { e.setInnerContent(paginationHtml, { html: true }); }
            })
            .transform(templateResponse);

    } catch (err) {
        console.error("Pages Blog render crash:", err.message);
        return new Response(`Error rendering blog: ${err.message}`, { status: 500 });
    }
}
