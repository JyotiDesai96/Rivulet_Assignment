<template>
  <q-layout view="lHh Lpr lFf" class="bg-color">
    <notifications group="foo" position="top center" style="z-index: 10001"/>
    <loading :active.sync="isLoading"
      color="#fa8005"
      background-color="#000"
      :is-full-page="fullPage"
      >
    </loading>
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </q-layout>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { mapState, mapGetters } from "vuex";

export default {
  name: 'LayoutDefault',
  computed: {
    ...mapState({
      isLoading: "isLoading",
    }),
  },
  components: {
    Loading
  },

  data () {
    return {
      fullPage: true
    }
  }
}
</script>

<style>

@media all and (max-width: 500px) and (min-width: 100px) {

	.bg-color{
		background-color: #f5f4f4  !important;
	}
}
html {
  scroll-behavior: smooth;
}

.slide-enter-active{
  animation: slide-in 300ms ease-out forwards;
}
.slide-leave-active{
  animation: slide-out 300ms ease-out forwards;
}
@keyframes slide-in{
  from{
    transform: translateY(-30px);
    opacity: 0;
  }
  to{
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-out{
  from{
    transform: translateY(0);
    opacity: 1;
  }
  to{
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
