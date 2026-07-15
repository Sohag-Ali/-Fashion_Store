import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex-1 w-full bg-background min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-6">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Error 404</span>
      <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-serif tracking-tighter mb-6">Piece Not Found</h1>
      <p className="text-sm text-muted-foreground max-w-md mb-10">
        The item you are looking for may have sold out or is no longer part of the collection.
      </p>
      <Link
        href="/products"
        className="px-8 py-3 border border-foreground text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300"
      >
        Back to Collection
      </Link>
    </main>
  );
}
