<template>
  <div class="card">
    <header v-if="title" class="card-header">
      <div class="card-header-title level">
        <p class="level-left">
          <b-icon v-if="icon" :icon="icon" custom-size="default"/>
          {{ title }}
        </p>
        <div v-if="this.vers!=null" class="level-right">
          <router-link :to="{ name: vers, params: { sel: this.selected }}" class="button level-item">
            {{ versTitle }}
          </router-link>
        </div>
        <div v-if="this.todo!=null" class="level-right">
          <b-button v-on:click="done" class="level-item">{{ versTitle }}</b-button>
        </div>
      </div>
      <a v-if="headerIcon" href="#" class="card-header-icon" aria-label="more options" @click.prevent="headerIconClick">
        <b-icon :icon="headerIcon" custom-size="default"/>
      </a>
    </header>
    <div class="card-content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    headerIcon: {
      type: String,
      default: null
    },
    selected: {
      type: Object,
      default: null
    },
    vers: {
      type: String,
      default: null
    },
    versTitle: {
      type: String,
      default: null
    },
    todo: {
      type: String,
      default: null
    }
  },
  methods: {
    done () {
      console.log('nik mok rahi tkhdm')
      this.$emit('doit')
    },
    headerIconClick () {
      this.$emit('header-icon-click')
    }
  }
}
</script>
