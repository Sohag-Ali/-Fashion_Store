import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { getReviewsForProduct } from "@/lib/reviews";
import { ProductDetailsView } from "@/components/product/ProductDetailsView";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} — ${product.brand}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);
  const reviews = getReviewsForProduct(product.id);

  return <ProductDetailsView product={product} relatedProducts={relatedProducts} reviews={reviews} />;
}
