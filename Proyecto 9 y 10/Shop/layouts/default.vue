<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title
        plain
        :to="localePath('/')"
        router
        exact
        v-text="title"
        class="title"
      />
      <v-btn plain :to="localePath('/')" router exact>
        {{ $t('home') }}
      </v-btn>
      <v-btn plain :to="localePath('/products')" router exact>
        {{ $t('products') }}
      </v-btn>
      <v-btn plain :to="localePath('/about')" router exact>
        {{ $t('about') }}
      </v-btn>
      <v-spacer />
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(language, i) in languages"
            :key="i"
            :to="switchLocalePath(language.code)"
            router
            exact
          >
            <v-list-item-action>
              {{ language.emoji }}
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="language.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="slider">
        <v-carousel
          cycle
          interval="3000"
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(item, i) in carouselItems"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-container>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'JarriShop',
    }
  },
  computed: {
    languages() {
      return this.$i18n.locales
    },
    carouselItems() {
      return [
        {
          src: 'https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/5937e90a5bafe882f5bc09e6/gatitos-cesta_0.jpg',
        },
        {
          src: 'https://es.himgs.com/imagenes/estar-bien/20180925130054/consejos-para-cuidar-a-un-gatito-recien-nacido-cs/0-601-526/cuidardgatito-t.jpg',
        },
        {
          src: 'https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/59a669fc5bafe88febb3d6cc/gatito-cesped_0.jpg',
        },
        {
          src: 'https://cf.ltkcdn.net/gatos/images/std/236641-800x515r1-etapas-desarrollo-gatitos.jpg',
        },
        {
          src: 'https://static.eldiario.es/clip/619daede-4610-479e-9710-d2a9c372bfbb_16-9-aspect-ratio_default_0.jpg',
        },
        {
          src: 'https://estaticos.muyinteresante.es/uploads/images/article/600033325bafe872e9c3bf12/gatitoredes.jpg',
        },
      ]
    },
  },
}
</script>

<style scoped>
  .title {
    margin-right: 10px;
  }
  .slider {
    margin-bottom: 30px;
  }
</style>
