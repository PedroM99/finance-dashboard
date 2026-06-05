import { useEffect, useState } from "react";
import QuickActionCard from "../components/QuickActionCard";
import SavingsGoalsCard from "../components/SavingsGoalsCard";
import QuickActionForm from "../components/QuickActionForm";

type Transaction = {
  id: number;
  type: "income" | "expense";
  name: string;
  amount: string;
  date: string;
  created_at: string;
};

type Goal = {
  id: number;
  title: string;
  target_amount: string;
  current_amount: string;
  created_at: string;
};





export default function Dashboard () {

        const [transactions, setTransactions] = useState<Transaction[]>([]);
        const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
        const [transactionsError, setTransactionsError] = useState("");

        const [goals, setGoals] = useState<Goal[]>([]);
        const [isLoadingGoals, setIsLoadingGoals] = useState(true);
        const [goalsError, setGoalsError] = useState("");

        const [openActions, setOpenActions] = useState({
        income: false,
        expense: false,
        goal: false,
        });

        async function fetchTransactions() {
        try {
            setIsLoadingTransactions(true);
            setTransactionsError("");

            const response = await fetch("http://localhost:3000/api/transactions");

            if (!response.ok) {
            throw new Error("Failed to fetch transactions.");
            }

            const data: Transaction[] = await response.json();

            setTransactions(data);
        } catch (error) {
            console.error(error);
            setTransactionsError("Could not load transactions.");
        } finally {
            setIsLoadingTransactions(false);
        }
        }

        async function fetchGoals() {
        try {
            setIsLoadingGoals(true);
            setGoalsError("");

            const response = await fetch("http://localhost:3000/api/goals");

            if (!response.ok) {
            throw new Error("Failed to fetch goals.");
            }

            const data: Goal[] = await response.json();

            setGoals(data);
        } catch (error) {
            console.error(error);
            setGoalsError("Could not load goals.");
        } finally {
            setIsLoadingGoals(false);
        }
        };


        useEffect(() => {
        fetchTransactions();
        fetchGoals();
        }, []);


        const latestIncome = transactions.find(
        (transaction) => transaction.type === "income"
        );

        const latestExpense = transactions.find(
        (transaction) => transaction.type === "expense"
        );


        function formatCurrency(value: string | undefined) {
        if (!value) return "€0.00";

        return new Intl.NumberFormat("en-IE", {
            style: "currency",
            currency: "EUR",
        }).format(Number(value));
        }

        const toggleAction = (action: "income" | "expense" | "goal") => {
        setOpenActions((prev) => ({
            ...prev,
            [action]: !prev[action],
        }));
        };


    return(
        <main className="min-h-screen bg-[#f7f3eb] text-zinc-800">
            <div className="mx-auto flex min-h-screen w-full max-w-[80vw] flex-col px-6 py-8">
                <header className="mb-8">
                    <p className="text-sm font-medium tracking-wide text-[#76638F]">
                        MyFinance
                    </p>
                </header>

                <section className="grid grid-cols-12 gap-5">
                    <div className="col-span-9 space-y-5">

                        <div className="rounded-4xl border border-[#ebe4f3] bg-[#fcfaf6] px-7 py-6 shadow-[0_1px_2px_rgba(24,24,27,0.03)]">
                        <div className="grid grid-cols-[1.4fr_auto_0.9fr] items-center gap-6">
                            <div>
                            <p className="text-sm font-medium text-[#76638F]">Current Balance</p>
                            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-zinc-800">
                                €10,304.57
                            </h2>
                            </div>

                            <div className="h-full w-px self-stretch bg-[#ebe4f3]" />

                            <div>
                            <p className="text-sm font-medium text-[#76638F]">Savings After Goals</p>
                            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-emerald-600">
                                +€450
                            </h2>
                            <p className="mt-2 text-sm font-medium text-emerald-500">+29% this month</p>
                            </div>
                        </div>
                        </div>

                        <div className="grid grid-cols-3 gap-5">

                            <article className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-0.5 cursor-pointer">
                            <p className="text-sm font-medium text-[#76638F]">Latest Income</p>

                            <h2 className="mt-4 text-3xl font-semibold text-emerald-600">
                                {isLoadingTransactions
                                ? "Loading..."
                                : latestIncome
                                    ? `+${formatCurrency(latestIncome.amount)}`
                                    : "€0.00"}
                            </h2>

                            <p className="mt-2 text-sm text-zinc-800">
                                {transactionsError
                                ? transactionsError
                                : latestIncome
                                    ? latestIncome.name
                                    : "No income yet"}
                            </p>
                            </article>

                            <article className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-0.5 cursor-pointer">
                            <p className="text-sm font-medium text-[#76638F]">Latest Expense</p>

                            <h2 className="mt-4 text-3xl font-semibold text-red-600">
                                {isLoadingTransactions
                                ? "Loading..."
                                : latestExpense
                                    ? `-${formatCurrency(latestExpense.amount)}`
                                    : "€0.00"}
                            </h2>

                            <p className="mt-2 text-sm text-zinc-800">
                                {transactionsError
                                ? transactionsError
                                : latestExpense
                                    ? latestExpense.name
                                    : "No expenses yet"}
                            </p>
                            </article>

                            <article className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-0.5 cursor-pointer">
                            <p className="text-sm font-medium text-[#76638F]">Portfolio Value</p>
                            <h2 className="mt-4 text-3xl font-semibold text-zinc-800">€3,147</h2>
                            <p className="mt-1 text-sm text-emerald-400">+7%</p>
                            </article>

                        </div>

                        <div className="grid grid-cols-1 gap-5">

                            <article className="cursor-pointer rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-[#76638F]">Market Movers</p>
                                <p className="text-xs text-zinc-400">24h</p>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-8">
                                <div className="flex items-center  gap-2">
                                <div className="min-w-35">
                                    <p className="text-sm font-medium text-[#76638F]">Top Gainer</p>
                                    <h3 className="mt-3 text-3xl font-semibold text-zinc-800">BTC</h3>
                                    <p className="mt-1 text-lg font-medium text-emerald-600">+18.00%</p>
                                </div>

                                <div className="flex h-24 w-full max-w-70 items-center justify-center rounded-2xl border border-dashed border-zinc-300">
                                    <span className="text-sm text-zinc-400">Chart placeholder</span>
                                </div>
                                </div>

                                <div className="flex items-center gap-2">
                                <div className="min-w-35">
                                    <p className="text-sm font-medium text-[#76638F]">Top Loser</p>
                                    <h3 className="mt-3 text-3xl font-semibold text-zinc-800">SOL</h3>
                                    <p className="mt-1 text-lg font-medium text-red-600">-8.14%</p>
                                </div>

                                <div className="flex h-24 w-full max-w-70 items-center justify-center rounded-2xl border border-dashed border-zinc-300">
                                    <span className="text-sm text-zinc-400">Chart placeholder</span>
                                </div>
                                </div>
                            </div>
                            </article>

                            
                             <SavingsGoalsCard 
                                goals={goals}
                                isLoading={isLoadingGoals}
                                error={goalsError}
                            /> 

                        </div>
                    </div>

                    <aside className="col-span-3 flex flex-col gap-4">
                        <QuickActionCard
                            title="Add Income"
                            isOpen={openActions.income}
                            onToggle={() => toggleAction("income")}
                        >
                            <QuickActionForm type="income" onSuccess={fetchTransactions} />
                        </QuickActionCard>

                    <QuickActionCard
                            title="Add Expense"
                            isOpen={openActions.expense}
                            onToggle={() => toggleAction("expense")}
                        >
                            <QuickActionForm type="expense" onSuccess={fetchTransactions} />
                        </QuickActionCard>

                    <QuickActionCard
                            title="Add Goal"
                            isOpen={openActions.goal}
                            onToggle={() => toggleAction("goal")}
                        >
                            <QuickActionForm type="goal" onSuccess={fetchGoals} />
                        </QuickActionCard>
                    </aside>
                </section>
            </div>
        </main>
    );
}
