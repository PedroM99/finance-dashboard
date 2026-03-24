export default function Dashboard () {
    return(
        <main className="min-h-screen bg-[#f7f3eb] text-zinc-800">
            <div className="mx-auto flex min-h-screen w-full max-w-[80vw] flex-col px-6 py-8">
                <header className="mb-8">
                    <p className="text-sm font-medium tracking-wide text-zinc-500">
                        MyFinance
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold">Dashboard</h1>
                </header>

                <section className="grid grid-cols-12 gap-5">
                    <div className="col-span-9">
                        <div className="grid grid-cols-2 gap-5">
                            <article className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-0.5 cursor-pointer">
                            <p className="text-sm font-medium text-zinc-500">Current Balance</p>
                            <h2 className="mt-4 text-3xl font-semibold text-zinc-800">€10,000.57</h2>
                            <p className="mt-2 text-sm text-emerald-600">+2.4% this month</p>
                            </article>

                            <article className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-0.5 cursor-pointer">
                            <p className="text-sm font-medium text-zinc-500">Latest Expenses</p>
                            <h2 className="mt-4 text-3xl font-semibold text-zinc-800">€1,284.90</h2>
                            <p className="mt-2 text-sm text-emerald-600">12 transactions</p>
                            </article>

                            <article className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-0.5 cursor-pointer"> 
                            <p className="text-sm font-medium text-zinc-500">Latest Income</p>
                            <h2 className="mt-4 text-3xl font-semibold text-zinc-800">€2,950.00</h2>
                            <p className="mt-2 text-sm text-emerald-600">Salary + freelance</p>
                            </article>

                            <article className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-0.5 cursor-pointer">
                            <p className="text-sm font-medium text-zinc-500">Top Gainer</p>
                            <h2 className="mt-4 text-3xl font-semibold text-zinc-800">NVDA</h2>
                            <p className="mt-2 text-sm text-emerald-600">+5.82% in 24h</p>
                            </article>
                        </div>
                    </div>

                    <aside className="col-span-3 flex flex-col gap-4">
                        <button className="rounded-2xl bg-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 cursor-pointer">
                            <p className="text-sm font-medium text-zinc-800">Add Income</p>
                        </button>

                        <button className="rounded-2xl bg-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 cursor-pointer">
                            <p className="text-sm font-medium text-zinc-800">Add Expense</p>
                        </button>
                    </aside>
                </section>
            </div>
        </main>
    );
}
