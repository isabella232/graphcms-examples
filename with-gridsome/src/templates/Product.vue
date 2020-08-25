<template>
  <Layout>
    <div>
      <h1 v-html="$page.gcms.graphcms.product.name" />
      <p v-html="$page.gcms.graphcms.product.description" />
      <p>
        {{
          new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }).format($page.gcms.graphcms.product.price / 100)
        }}
      </p>
    </div>
  </Layout>
</template>

<page-query>
query GetProduct($slug: String) {
    gcms {
        graphcms {
            product(where: {slug: $slug}) {
                name
                description
                price
            }
        }
    }
}
</page-query>
