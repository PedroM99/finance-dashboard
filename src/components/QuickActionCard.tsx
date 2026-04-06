type QuickActionCardProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export default function QuickActionCard({
  title,
  isOpen,
  onToggle,
  children,
}: QuickActionCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition">
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between px-4 py-4 text-left"
      >
        <p className="text-sm font-medium text-zinc-800">{title}</p>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-zinc-100 px-4 py-4">{children}</div>
        </div>
      </div>
    </article>
  );
}