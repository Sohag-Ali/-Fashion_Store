import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts, getReviewsForProduct } from "@/lib/dummyData";
import { ProductDetailsView } from "@/components/product/ProductDetailsView";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);
  const reviews = getReviewsForProduct(product.id);

  return <ProductDetailsView product={product} relatedProducts={relatedProducts} reviews={reviews} />;
}
