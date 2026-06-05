import { useState, useRef,  type SyntheticEvent  } from "react";
import { Calendar, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type QuickActionType = "income" | "expense" | "goal";

type QuickActionFormProps = {
  type: QuickActionType;
};

const formContent = {
  income: {
    firstFieldLabel: "Source",
    firstFieldPlaceholder: "Salary, freelance, bonus...",
    amountLabel: "Amount",
    buttonText: "Save Income",
    successText: "Income saved",
  },
  expense: {
    firstFieldLabel: "Category",
    firstFieldPlaceholder: "Food, transport, rent...",
    amountLabel: "Amount",
    buttonText: "Save Expense",
    successText: "Expense saved",
  },
  goal: {
    firstFieldLabel: "Goal Name",
    firstFieldPlaceholder: "Emergency fund, car, travel...",
    amountLabel: "Target Amount",
    buttonText: "Create Goal",
    successText: "Goal created",
  },
};

export default function QuickActionForm({ type }: QuickActionFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dateInputRef = useRef<HTMLInputElement>(null);

  const content = formContent[type];
  const isGoal = type === "goal";

  function handleAmountChange(value: string) {
    const cleanedValue = value.replace(",", ".");

    if (/^\d*\.?\d{0,2}$/.test(cleanedValue)) {
      setAmount(cleanedValue);
    }
  }

  function openDatePicker() {
    if (dateInputRef.current?.showPicker) {
        dateInputRef.current.showPicker();
    } else {
        dateInputRef.current?.focus();
    }
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setError(
        isGoal
          ? "Please enter a goal name."
          : "Please enter a source or category."
      );
      setIsSuccess(false);
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      setIsSuccess(false);
      return;
    }

    setError("");
    setIsSubmitting(true);

    const formData = {
      type,
      name: name.trim(),
      amount: Number(amount),
      date: isGoal ? null : date,
    };

    try {
      if (isGoal) {
        console.log("Goal submitted:", formData);
      } else {
        const response = await fetch("http://localhost:3000/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to save transaction.");
        }

        const savedTransaction = await response.json();

        console.log("Transaction saved:", savedTransaction);
      }

      setIsSuccess(true);

      setName("");
      setAmount("");
      setDate(new Date().toISOString().slice(0, 10));

      window.setTimeout(() => {
        setIsSuccess(false);
      }, 1800);
    } catch (error) {
      console.error(error);

      setError(
        isGoal
          ? "Something went wrong while creating the goal."
          : "Something went wrong while saving the transaction."
      );

      setIsSuccess(false);
    }
    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-[#76638F]">
          {content.firstFieldLabel}
        </label>

        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={content.firstFieldPlaceholder}
          className="w-full rounded-xl border border-[#ebe4f3] bg-[#fcfaf6] px-3 py-2.5 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#cbbadf] focus:bg-white"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[#76638F]">
          {content.amountLabel}
        </label>

        <div className="flex items-center rounded-xl border border-[#ebe4f3] bg-[#fcfaf6] px-3 transition focus-within:border-[#cbbadf] focus-within:bg-white">
          <span className="mr-2 text-sm font-medium text-[#76638F]">€</span>

          <input
            value={amount}
            onChange={(event) => handleAmountChange(event.target.value)}
            inputMode="decimal"
            className="w-full bg-transparent py-2.5 text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
          />
        </div>
      </div>

      {!isGoal && (
        <div>
            <label className="mb-1.5 block text-xs font-medium text-[#76638F]">
            Date
            </label>

            <button
            type="button"
            onClick={openDatePicker}
            className="relative flex w-full cursor-pointer items-center justify-between rounded-xl border border-[#ebe4f3] bg-[#fcfaf6] px-3 py-2.5 text-left text-sm text-zinc-800 outline-none transition hover:bg-white focus:border-[#cbbadf] focus:bg-white"
            >
            <span>{date}</span>

            <Calendar size={16} className="text-zinc-500" />

            <input
                ref={dateInputRef}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                type="date"
                tabIndex={-1}
                className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
            />
            </button>
        </div>
      )}

        {error && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
            {error}
        </p>
        )}

        <motion.button
        type="submit"
        disabled={isSubmitting}
        animate={{
            backgroundColor: isSuccess ? "#ecfdf5" : "#f7f3eb",
            borderColor: isSuccess ? "#a7f3d0" : "#ebe4f3",
            color: isSuccess ? "#059669" : "#76638F",
            opacity: isSubmitting ? 0.7 : 1,
        }}
        transition={{ duration: 0.25 }}
        className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-sm font-semibold outline-none transition hover:bg-[#fcfaf6] hover:text-zinc-800 disabled:cursor-not-allowed"
        >
        <AnimatePresence mode="wait" initial={false}>
            {isSuccess ? (
            <motion.span
                key="success"
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
            >
                <Check size={16} strokeWidth={2.5} />
                {content.successText}
            </motion.span>

            ) : isSubmitting ? (
              <motion.span
                key="submitting"
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.2 }}
            >
                Saving...
            </motion.span>
            ) : (
            <motion.span
                key="default"
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.2 }}
            >
                {content.buttonText}
            </motion.span>
            )}
        </AnimatePresence>
        </motion.button>
    </form>
  );
}