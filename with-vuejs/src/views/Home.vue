<template>
  <div class="home" id="products">
    <img alt="Vue logo" src="../assets/logo.png" />
    <router-link
      v-for="product in products"
      :to="{ name: 'Product', params: { slug: product.slug } }"
      :key="product.slug"
    >
      <article>
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>
      </article>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      products: [],
      loading: true,
      errors: [],
    };
  },
  async created() {
    const response = await fetch(
      'https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6',
      {
        method: 'POST',
        body: JSON.stringify({
          query: `{ graphcms { products { name slug } } }`,
        }),
      }
    );

    const { data } = await response.json();

    this.errors = data.errors;
    this.loading = false;
    this.products = data.graphcms.products;
  },
};
</script>
