'use client';

import Grid from './Grid';
import ProductGridItem from './ProductGridItem';

export default function ProductGrid({collectionProducts}) {
  return (
    <>
      <Grid>
        {collectionProducts?.map((product) => {
          return <ProductGridItem key={product.id} product={product} />;
        })}
      </Grid>
    </>
  );
}
