export default function Dashboard () {
    return(
        <main className="min-h-screen bg-[#f7f3eb] text-zinc-800">
            <div className="mx-auto flex min-h-screen w-full max-w-[80vw] flex-col px-6 py-8">
                <header className="mb-8">
                    <p className="text-sm font-medium tracking-wide text-zinc-500">
                        MyFinance
                    </p>
                </header>

                <section className="grid grid-cols-12 gap-5">
                    <div className="col-span-9 space-y-5">

                        <div className="grid grid-cols-3 gap-5">
                            <article className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-0.5 cursor-pointer">
                            <p className="text-sm font-medium text-zinc-500">Current Balance</p>
                            <h2 className="mt-4 text-3xl font-semibold text-zinc-800">€10,304.57</h2>
                            </article>

                            <article className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-0.5 cursor-pointer">
                            <p className="text-sm font-medium text-zinc-500">Monthly Savings</p>
                            <h2 className="mt-4 text-3xl font-semibold text-emerald-600">+€450</h2>
                            <p className="mt-1 text-sm text-emerald-400">+29%</p>
                            </article>

                            <article className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-0.5 cursor-pointer">
                            <p className="text-sm font-medium text-zinc-500">Portfolio Value</p>
                            <h2 className="mt-4 text-3xl font-semibold text-zinc-800">€3,147</h2>
                            </article>

                        </div>

                        <div className="grid grid-cols-2 gap-5">

                            <article className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-0.5 cursor-pointer"> 
                            <p className="text-sm font-medium text-zinc-500">Latest Income</p>
                            <h2 className="mt-4 text-3xl font-semibold text-emerald-600">+€2,950.00</h2>
                            <p className="mt-2 text-sm text-zinc-800">Salary + freelance</p>
                            </article>

                            <article className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-0.5 cursor-pointer"> 
                            <p className="text-sm font-medium text-zinc-500">Latest Expense</p>
                            <h2 className="mt-4 text-3xl font-semibold text-red-600">-€28.20</h2>
                            <p className="mt-2 text-sm text-zinc-800">Uber Eats</p>
                            </article>

                        </div>

                        <div className="grid grid-cols-1 gap-5">

                            <article className="cursor-pointer rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-zinc-500">Market Movers</p>
                                <p className="text-xs text-zinc-400">24h</p>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-8">
                                <div className="flex items-center  gap-2">
                                <div className="min-w-35">
                                    <p className="text-sm font-medium text-zinc-500">Top Gainer</p>
                                    <h3 className="mt-3 text-3xl font-semibold text-zinc-800">BTC</h3>
                                    <p className="mt-1 text-lg font-medium text-emerald-600">+18.00%</p>
                                </div>

                                <div className="flex h-24 w-full max-w-70 items-center justify-center rounded-2xl border border-dashed border-zinc-300">
                                    <span className="text-sm text-zinc-400">Chart placeholder</span>
                                </div>
                                </div>

                                <div className="flex items-center gap-2">
                                <div className="min-w-35">
                                    <p className="text-sm font-medium text-zinc-500">Top Loser</p>
                                    <h3 className="mt-3 text-3xl font-semibold text-zinc-800">SOL</h3>
                                    <p className="mt-1 text-lg font-medium text-red-600">-8.14%</p>
                                </div>

                                <div className="flex h-24 w-full max-w-70 items-center justify-center rounded-2xl border border-dashed border-zinc-300">
                                    <span className="text-sm text-zinc-400">Chart placeholder</span>
                                </div>
                                </div>
                            </div>
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
